import { prisma } from "@/prisma";
import { authenticate } from "@/auth";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    // Check Authorized
    if (!authenticate(request)) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    // Get all series
    const dataSeries = await prisma.series.findMany({
      where: { deleted: false },
      orderBy: { updatedOn: "desc" }, // Mengurutkan berdasarkan waktu update terbaru
    });
    // console.log(dataSeries);

    return NextResponse.json({
      data: dataSeries,
      status: "Data series successfully retrieved",
    });
  } catch {
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    // Check Authorization
    if (!authenticate(request)) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const dataBody = await request.json();

    // Check if slug already exists
    const existingData = await prisma.series.findUnique({
      where: { slug: dataBody.slug },
    });

    if (existingData) {
      return NextResponse.json(
        { error: "Slug already in use" },
        { status: 409 },
      );
    }

    // Create new series entry
    const newSeries = await prisma.series.create({
      data: {
        title: dataBody.title,
        banner: dataBody.banner,
        slug: dataBody.slug,
        synopsis: dataBody.synopsis,
        status: dataBody.status,
        releadted: dataBody.releadted,
        rating: dataBody.rating,
        studio: dataBody.studio,
        season: dataBody.season,
        preview: dataBody.preview,
        postedBy: dataBody.postedBy,
        type: dataBody.type,
        genre: dataBody.genre,
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
