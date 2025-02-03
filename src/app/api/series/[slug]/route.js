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
    const { slug } = params;

    if (!slug) {
      return NextResponse.json(
        { error: "Slug not provided." },
        { status: 400 },
      );
    }

    // Check if the data exists before trying to update
    const existingData = await prisma.series.findUnique({
      where: { slug },
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
    const { slug } = params;

    if (!slug) {
      return NextResponse.json(
        { error: "Slug not provided." },
        { status: 400 },
      );
    }

    // Retrieve specific data series by slug, ensuring it's not deleted
    const dataSeries = await prisma.series.findUnique({
      where: { slug, deleted: false },
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
