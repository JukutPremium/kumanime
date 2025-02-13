import { prisma } from "@/prisma";
import { authenticate } from "@/auth";
import { NextResponse } from "next/server";

// Handle POST request (Create a new episode)
export async function POST(request) {
  try {
    if (!authenticate(request)) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const dataBody = await request.json();

    // Validate required fields
    const requiredFields = ["order", "seriesId", "videoServer"];
    for (const field of requiredFields) {
      if (dataBody[field] === undefined || dataBody[field] === null) {
        return NextResponse.json(
          { error: `Invalid ${field}.` },
          { status: 400 },
        );
      }
    }

    // Ensure series exists
    const series = await prisma.series.findUnique({
      where: { id: dataBody.seriesId, deleted: false },
    });
    if (!series) {
      return NextResponse.json({ error: "Series not found." }, { status: 404 });
    }

    // Validate order (must be positive integer)
    if (!Number.isInteger(dataBody.order) || dataBody.order <= 0) {
      return NextResponse.json(
        { error: "Order must be a positive integer." },
        { status: 400 },
      );
    }

    // Validate videoServer (Convert from string if needed)
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

    // Create new episode entry
    const newEpisode = await prisma.episode.create({
      data: {
        order: dataBody.order,
        videoServer: dataBody.videoServer,
        seriesId: dataBody.seriesId,
      },
    });

    return NextResponse.json({
      data: newEpisode,
      status: "Episode successfully created.",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
