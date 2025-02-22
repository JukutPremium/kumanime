import { prisma } from "@/prisma";
import { authenticate } from "@/auth";
import { NextResponse } from "next/server";
import { nanoid } from "nanoid"; // Generate unique slug

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

// PATCH route: Update an episode by slug
export async function PATCH(request, { params }) {
  try {
    if (!authenticate(request)) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const { slug } = await params;
    if (!slug) {
      return NextResponse.json(
        { error: "Slug not provided." },
        { status: 400 },
      );
    }

    const dataBody = await request.json();
    const existingEpisode = await prisma.episode.findUnique({
      where: { slug, deleted: false },
    });
    if (!existingEpisode) {
      return NextResponse.json(
        { error: "Episode not found." },
        { status: 404 },
      );
    }

    if (
      dataBody.order &&
      (!Number.isInteger(dataBody.order) || dataBody.order <= 0)
    ) {
      return NextResponse.json(
        { error: "Order must be a positive integer." },
        { status: 400 },
      );
    }

    if (dataBody.videoServer) {
      if (typeof dataBody.videoServer === "string") {
        dataBody.videoServer = dataBody.videoServer
          .split(",")
          .map((v) => v.trim());
      }
      if (
        !Array.isArray(dataBody.videoServer) ||
        dataBody.videoServer.some((v) => typeof v !== "string")
      ) {
        return NextResponse.json(
          { error: "Invalid videoServer format." },
          { status: 400 },
        );
      }
    }

    let newSlug = existingEpisode.slug;
    if (dataBody.order && dataBody.order !== existingEpisode.order) {
      newSlug = `${existingEpisode.series.slug}-ep-${dataBody.order}-${nanoid(6)}`;
    }

    const updatedEpisode = await prisma.episode.update({
      where: { slug },
      data: {
        slug: newSlug,
        order: dataBody.order ?? existingEpisode.order,
        videoServer: dataBody.videoServer ?? existingEpisode.videoServer,
      },
    });

    return NextResponse.json({
      data: updatedEpisode,
      status: "Episode successfully updated.",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
