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

    // Manual validation
    if (
      !dataBody.title ||
      typeof dataBody.title !== "string" ||
      dataBody.title.length < 3
    ) {
      return NextResponse.json({ error: "Invalid title." }, { status: 400 });
    }
    if (!dataBody.banner || typeof dataBody.banner !== "string") {
      return NextResponse.json(
        { error: "Invalid banner URL." },
        { status: 400 },
      );
    }
    if (
      !dataBody.slug ||
      typeof dataBody.slug !== "string" ||
      dataBody.slug.length < 3
    ) {
      return NextResponse.json({ error: "Invalid slug." }, { status: 400 });
    }
    if (
      !dataBody.synopsis ||
      typeof dataBody.synopsis !== "string" ||
      dataBody.synopsis.length < 10
    ) {
      return NextResponse.json({ error: "Invalid synopsis." }, { status: 400 });
    }
    if (!["ongoing", "completed"].includes(dataBody.status)) {
      return NextResponse.json({ error: "Invalid status." }, { status: 400 });
    }
    if (
      typeof dataBody.rating !== "number" ||
      dataBody.rating < 0 ||
      dataBody.rating > 10
    ) {
      return NextResponse.json({ error: "Invalid rating." }, { status: 400 });
    }
    if (!dataBody.releasedOn || isNaN(Date.parse(dataBody.releasedOn))) {
      return NextResponse.json(
        { error: "Invalid release date." },
        { status: 400 },
      );
    }
    if (
      !dataBody.studio ||
      typeof dataBody.studio !== "string" ||
      dataBody.studio.length < 2
    ) {
      return NextResponse.json({ error: "Invalid studio." }, { status: 400 });
    }
    if (
      !Array.isArray(dataBody.genre) ||
      dataBody.genre.some((g) => typeof g !== "string")
    ) {
      return NextResponse.json({ error: "Invalid genre." }, { status: 400 });
    }

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
      data: dataBody,
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
