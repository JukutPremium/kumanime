import { prisma } from "@/prisma";
import { authenticate } from "@/auth";
import { NextResponse } from "next/server";

// DELETE route: Mark an episode as deleted by slug
export async function DELETE(request, { params }) {
  try {
    // Check Authorization
    if (!authenticate(request)) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    // Get episode slug from URL params
    const { slug } = await params;

    if (!slug) {
      return NextResponse.json(
        { error: "Episode slug not provided." },
        { status: 400 },
      );
    }

    // Check if the episode exists before trying to update
    const existingEpisode = await prisma.episode.findUnique({
      where: { slug, deleted: false },
    });

    // If episode doesn't exist or already deleted
    if (!existingEpisode || existingEpisode.deleted) {
      return NextResponse.json(
        { error: "Episode not found." },
        { status: 404 },
      );
    }

    // Perform soft delete by updating the deleted flag
    const episodeDeleted = await prisma.episode.update({
      where: { slug },
      data: { deleted: true },
    });

    // Return successful deletion response
    return NextResponse.json({
      data: episodeDeleted,
      status: "Episode has been deleted successfully.",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}

// GET route: Retrieve specific episode by slug
export async function GET(request, { params }) {
  try {
    // Check Authorization
    if (!authenticate(request)) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    // Get slug from URL params
    const { slug } = await params;

    if (!slug) {
      return NextResponse.json(
        { error: "Slug not provided." },
        { status: 400 },
      );
    }

    // Retrieve specific episode by slug, ensuring it's not deleted
    const episode = await prisma.episode.findUnique({
      where: { slug, deleted: false },
      include: {
        series: {
          include: {
            episodes: {
              where: { deleted: false },
              orderBy: { order: "asc" },
              select: { slug: true, order: true },
            },
          },
        },
      },
    });

    // If no episode is found
    if (!episode) {
      return NextResponse.json(
        { error: "Episode not found." },
        { status: 404 },
      );
    }

    // Extract list of all episodes in the same series
    const episodeList = episode.series.episodes;

    // Find index of the current episode
    const currentIndex = episodeList.findIndex((ep) => ep.slug === slug);

    // Determine previous and next episodes
    const previousEpisode =
      currentIndex > 0 ? episodeList[currentIndex - 1] : null;
    const nextEpisode =
      currentIndex < episodeList.length - 1
        ? episodeList[currentIndex + 1]
        : null;

    // Return episode data with navigation links
    return NextResponse.json({
      data: {
        episode,
        previous: previousEpisode,
        next: nextEpisode,
        allEpisodes: episodeList,
      },
      status: "Episode successfully retrieved.",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
