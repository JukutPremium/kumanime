import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Ambil session
  const session = await auth();
  const userEmail = session?.user?.email || null;
  const isLoggedIn = !!session; // True jika session ada

  // Ambil daftar email dari environment variable
  const allowedEmails = process.env.ALLOWED_EMAILS?.split(",") || [];

  // 1. Blok akses ke /dashboard untuk email tertentu
  if (pathname.startsWith("/dashboard") && !allowedEmails.includes(userEmail)) {
    return NextResponse.redirect(new URL("/", req.nextUrl.origin));
  }

  // 2. Jika sudah login, larang akses ke /sign-in
  if (pathname === "/sign-in" && isLoggedIn) {
    return NextResponse.redirect(new URL("/", req.nextUrl.origin));
  }

  // 3. Jika belum login, larang akses ke /sign-out
  if (pathname === "/sign-out" && !isLoggedIn) {
    return NextResponse.redirect(new URL("/sign-in", req.nextUrl.origin));
  }

  // Lanjutkan ke route berikutnya
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)", // Semua route kecuali static
  ],
};
