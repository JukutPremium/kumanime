import { prisma } from "@/prisma";
import { authenticate } from "@/auth";
import { NextResponse } from "next/server";

export async function DELETE(request) {
  try {
    if (!authenticate(request)) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const dataSeries = await prisma.series.findMany({
      where: { deleted: false },
      orderBy: { updatedOn: "desc" }, // Mengurutkan berdasarkan waktu update terbaru
    });

    // console.log(dataSeries);

    return NextResponse.json({ data: dataSeries, helo: "jhkasd" });
  } catch {
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
