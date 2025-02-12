import { prisma } from "@/prisma";
import { authenticate } from "@/auth";
import { NextResponse } from "next/server";

// DELETE route: Mark a series as deleted by slug
export async function DELETE(request, { params }) {
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

    // Check if the data exists before trying to update
    const existingData = await prisma.series.findUnique({
      where: { slug, deleted: false },
    });

    // If data doesn't exist or already deleted
    if (!existingData || existingData.deleted) {
      return NextResponse.json({ error: "Data not found." }, { status: 404 });
    }

    // Perform to delete the series
    const dataDeleted = await prisma.series.update({
      where: { slug },
      data: { deleted: true },
    });

    // Return successful deletion response
    return NextResponse.json({
      data: {
        title: dataDeleted?.title,
        slug: dataDeleted?.slug,
        deletedOn: dataDeleted?.updatedOn,
      },
      status: "Data has been deleted successfully.",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}

// GET route: Retrieve specific series by slug
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

    // Retrieve specific data series by slug, ensuring it's not deleted
    const dataSeries = await prisma.series.findUnique({
      where: { slug, deleted: false },
      include: {
        episodes: {
          where: { deleted: false }, // Only include non-deleted episodes
          orderBy: { order: "asc" }, // Optional: Order episodes by 'order'
        },
      },
    });

    // If no data is found
    if (!dataSeries) {
      return NextResponse.json({ error: "Data not found." }, { status: 404 });
    }

    // Return the data
    return NextResponse.json({
      data: dataSeries,
      status: "Data successfully retrieved.",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}

// PATCH route: Update a series by slug
export async function PATCH(request, props) {
  const params = await props.params;
  try {
    // Check Authorization
    if (!authenticate(request)) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    // Get slug from URL params
    const { slug } = params;
    if (!slug) {
      return NextResponse.json(
        { error: "Slug not provided." },
        { status: 400 },
      );
    }

    // Check if the series exists and is not deleted
    const existingSeries = await prisma.series.findUnique({
      where: { slug, deleted: false },
    });
    if (!existingSeries) {
      return NextResponse.json({ error: "Data not found." }, { status: 404 });
    }

    // Parse request body
    const dataBody = await request.json();
    const updatableFields = [
      "title",
      "banner",
      "synopsis",
      "status",
      "studio",
      "season",
      "type",
      "preview",
      "genre",
      "censor",
    ];

    const updateData = {};
    for (const field of updatableFields) {
      if (dataBody[field] !== undefined) {
        updateData[field] = dataBody[field];
      }
    }

    // Validate genre (Convert from string if needed)
    if (updateData.genre) {
      if (typeof updateData.genre === "string") {
        updateData.genre = updateData.genre.split(",").map((g) => g.trim());
      }
      if (
        !Array.isArray(updateData.genre) ||
        updateData.genre.some((g) => typeof g !== "string")
      ) {
        return NextResponse.json(
          { error: "Invalid genre format." },
          { status: 400 },
        );
      }
    }

    // Validate synopsis length if updated
    if (updateData.synopsis && updateData.synopsis.length < 10) {
      return NextResponse.json(
        { error: "Synopsis must be at least 10 characters." },
        { status: 400 },
      );
    }

    // Update the series data
    const updatedSeries = await prisma.series.update({
      where: { slug },
      data: updateData,
    });

    return NextResponse.json({
      data: updatedSeries,
      status: "Series successfully updated.",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
