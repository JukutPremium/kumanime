import { prisma } from "@/prisma";
import { authenticate } from "@/auth";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  try {
    // Check Authorized
    if (!authenticate(request)) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    // Get slug
    const { slug } = params;
    // console.log(slug);

    // Check if the data exists before trying to update
    const existingData = await prisma.series.findUnique({
      where: { slug },
    });

    if (!existingData || existingData.deleted) {
      return NextResponse.json({ error: "Data not found." }, { status: 404 });
    }

    // Perform to delete series
    const dataDeleted = await prisma.series.update({
      where: { slug },
      data: { deleted: true },
    });
    // console.log(dataDeleted)

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
