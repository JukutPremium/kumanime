import { prisma } from "@/prisma";
import { authenticate } from "@/auth";

export async function GET(request) {
  try {
    if (!authenticate(request)) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const data = await prisma.series.findMany({
      where: { deleted: false },
    });

    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
