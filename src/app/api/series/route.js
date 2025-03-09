import { prisma } from "@/prisma";
import { authenticate } from "@/auth";
import { NextResponse } from "next/server";

// Handle GET request (Retrieve all series)
export async function GET(request) {
  try {
    if (!authenticate(request)) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const statusFilter = searchParams.get("status");
    const pageType = searchParams.get("page");
    const searchQuery = searchParams.get("search")?.trim().toLowerCase();
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;

    let whereClause = { deleted: false };
    if (statusFilter === "completed") {
      whereClause.status = "completed";
    } else if (statusFilter === "ongoing") {
      whereClause.status = "ongoing";
    }

    if (searchQuery) {
      whereClause.title = { contains: searchQuery, mode: "insensitive" };
    }

    const totalSeries = await prisma.series.count({ where: whereClause });
    const dataSeries = await prisma.series.findMany({
      where: whereClause,
      orderBy: { updatedOn: "desc" },
      skip,
      take: limit,
    });

    if (pageType === "animelist") {
      const groupedData = {};
      dataSeries.forEach((series) => {
        const firstChar = series.title.charAt(0).toLowerCase();
        const key = /[a-z]/.test(firstChar) ? firstChar : "0-9 or #";
        if (!groupedData[key]) groupedData[key] = [];
        groupedData[key].push(series);
      });

      const sortedKeys = [
        "0-9 or #",
        ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i)),
      ];
      const result = sortedKeys.map((key) => ({
        name: key,
        data: groupedData[key] || [],
      }));

      return NextResponse.json({
        data: result,
        status: "Data series successfully retrieved",
        total: totalSeries,
      });
    }

    if (pageType === "schedule") {
      const daysOfWeek = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ];
      const groupedByDay = {};

      dataSeries
        .filter((series) => series.status === "ongoing")
        .forEach((series) => {
          const day = series.scheduleDay || "Unknown";
          if (!groupedByDay[day]) groupedByDay[day] = [];
          groupedByDay[day].push(series);
        });

      const result = daysOfWeek.map((day) => ({
        day,
        data: groupedByDay[day] || [],
      }));

      return NextResponse.json({
        data: result,
        status: "Data series successfully retrieved",
        total: totalSeries,
      });
    }

    return NextResponse.json({
      data: dataSeries,
      status: "Data series successfully retrieved",
      total: totalSeries,
      page,
      limit,
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

    // Validate required fields
    const requiredFields = [
      "title",
      "banner",
      "slug",
      "synopsis",
      "status",
      "studio",
      "season",
      "type",
      "scheduleDay",
    ];
    for (const field of requiredFields) {
      if (
        !dataBody[field] ||
        typeof dataBody[field] !== "string" ||
        dataBody[field].trim() === ""
      ) {
        return NextResponse.json(
          { error: `Invalid ${field}.` },
          { status: 400 },
        );
      }
    }

    // Validate genre (Convert from string if needed)
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

    // Validate optional fields
    const preview = dataBody.preview || null;
    const censor = dataBody.censor ?? false;

    // Check for duplicate slug
    if (
      await prisma.series.findUnique({
        where: { slug: dataBody.slug, deleted: false },
      })
    ) {
      return NextResponse.json(
        { error: "Slug already in use" },
        { status: 409 },
      );
    }
    // Validate synopsis length
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
