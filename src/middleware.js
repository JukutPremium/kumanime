import { auth } from "@/auth"; // Gunakan auth() dari next-auth
import { NextResponse } from "next/server";

export default async function middleware(req) {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/sign-out") ||
    pathname.startsWith("/sign-in")
  ) {
    // Ambil session
    const session = await auth();
    const userEmail = session?.user?.email || null;
    const isLoggedIn = !!session;

    // Ambil daftar email dari environment variable
    const allowedEmails = process.env.ALLOWED_EMAILS?.split(",") || [];

    // Blok akses ke /dashboard untuk email tertentu
    if (
      pathname.startsWith("/dashboard") &&
      !allowedEmails.includes(userEmail)
    ) {
      return NextResponse.redirect(new URL("/", req.nextUrl.origin));
    }

    // Jika sudah login, larang akses ke /sign-in
    if (pathname === "/sign-in" && isLoggedIn) {
      return NextResponse.redirect(new URL("/", req.nextUrl.origin));
    }

    // Jika belum login, larang akses ke /sign-out
    if (pathname === "/sign-out" && !isLoggedIn) {
      return NextResponse.redirect(new URL("/sign-in", req.nextUrl.origin));
    }
  }
  return NextResponse.next();
}
