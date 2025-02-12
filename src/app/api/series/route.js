import { prisma } from "@/prisma";
import { authenticate } from "@/auth";
import { NextResponse } from "next/server";

// Handle GET request (Retrieve all series)
export async function GET(request) {
  try {
    if (!authenticate(request)) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const dataSeries = await prisma.series.findMany({
      where: { deleted: false },
      orderBy: { updatedOn: "desc" },
    });

    return NextResponse.json({
      data: dataSeries,
      status: "Data series successfully retrieved",
    });
  } catch {
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}

// Handle POST request (Create a new series)
export async function POST(request) {
  try {
    if (!authenticate(request)) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const dataBody = await request.json();

    // Check for duplicate slug
    if (await prisma.series.findUnique({ where: { slug: dataBody.slug } })) {
      return NextResponse.json({ error: "Slug already in use" }, { status: 409 });
    }

    // Validate required fields
    const requiredFields = ["title", "banner", "slug", "synopsis", "status", "studio", "season", "type"];
    for (const field of requiredFields) {
      if (!dataBody[field] || typeof dataBody[field] !== "string" || dataBody[field].trim() === "") {
        return NextResponse.json({ error: `Invalid ${field}.` }, { status: 400 });
      }
    }

    // Validate synopsis length
    if (dataBody.synopsis.length < 10) {
      return NextResponse.json({ error: "Synopsis must be at least 10 characters." }, { status: 400 });
    }

    // Validate genre (Convert from string if needed)
    if (typeof dataBody.genre === "string") {
      dataBody.genre = dataBody.genre.split(",").map((g) => g.trim());
    }

    if (!Array.isArray(dataBody.genre) || dataBody.genre.some((g) => typeof g !== "string")) {
      return NextResponse.json({ error: "Invalid genre format." }, { status: 400 });
    }

    // Validate optional fields
    const preview = dataBody.preview || null;
    const censor = dataBody.censor ?? false;

    // Create new series entry
    const newSeries = await prisma.series.create({
      data: {
        title: dataBody.title,
        banner: dataBody.banner,
        slug: dataBody.slug,
        synopsis: dataBody.synopsis,
        status: dataBody.status,
        studio: dataBody.studio,
        season: dataBody.season,
        type: dataBody.type,
        preview,
        genre: dataBody.genre,
        censor,
      },
    });

    return NextResponse.json({
      data: newSeries,
      status: "Series successfully created.",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
