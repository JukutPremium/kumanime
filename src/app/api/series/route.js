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

    // Validasi title
    if (
      !dataBody.title ||
      typeof dataBody.title !== "string" ||
      dataBody.title.length < 3
    ) {
      return NextResponse.json({ error: "Invalid title." }, { status: 400 });
    }

    // Validasi banner (harus string dan bukan kosong)
    if (!dataBody.banner || typeof dataBody.banner !== "string") {
      return NextResponse.json(
        { error: "Invalid banner URL." },
        { status: 400 },
      );
    }

    // Validasi slug (minimal 3 karakter dan string)
    if (
      !dataBody.slug ||
      typeof dataBody.slug !== "string" ||
      dataBody.slug.length < 3
    ) {
      return NextResponse.json({ error: "Invalid slug." }, { status: 400 });
    }

    // Validasi synopsis (minimal 10 karakter)
    if (
      !dataBody.synopsis ||
      typeof dataBody.synopsis !== "string" ||
      dataBody.synopsis.length < 10
    ) {
      return NextResponse.json({ error: "Invalid synopsis." }, { status: 400 });
    }

    if (!dataBody.status || typeof dataBody.status !== "string") {
      return NextResponse.json({ error: "Invalid status." }, { status: 400 });
    }

    // Validasi studio (minimal 2 karakter)
    if (
      !dataBody.studio ||
      typeof dataBody.studio !== "string" ||
      dataBody.studio.length < 2
    ) {
      return NextResponse.json({ error: "Invalid studio." }, { status: 400 });
    }

    // Validasi season (harus string)
    if (!dataBody.season || typeof dataBody.season !== "string") {
      return NextResponse.json({ error: "Invalid season." }, { status: 400 });
    }

    // Validasi type (harus string)
    if (!dataBody.type || typeof dataBody.type !== "string") {
      return NextResponse.json({ error: "Invalid type." }, { status: 400 });
    }

    // Validasi preview (bisa kosong atau string)
    if (dataBody.preview && typeof dataBody.preview !== "string") {
      return NextResponse.json({ error: "Invalid preview." }, { status: 400 });
    }

    // Validasi genre (harus array dan semua elemennya string)
    if (typeof dataBody.genre === "string") {
      dataBody.genre = dataBody.genre.split(",").map((g) => g.trim());
    }

    if (
      !Array.isArray(dataBody.genre) ||
      dataBody.genre.some((g) => typeof g !== "string")
    ) {
      return NextResponse.json(
        { error: "Invalid genre format." },
        { status: 400 },
      );
    }

    // Validasi censor (harus boolean)
    if (typeof dataBody.censor !== "boolean") {
      return NextResponse.json(
        { error: "Invalid censor value." },
        { status: 400 },
      );
    }

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
        preview: dataBody.preview || null, // Jika `preview` bisa kosong
        genre: dataBody.genre, // Pastikan ini selalu array
        censor: dataBody.censor ?? false, // Default false jika tidak dikirim
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
