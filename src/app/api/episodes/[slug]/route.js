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
