import { auth } from "@/auth";
import { NextResponse } from "next/server";

const ALLOWED_EMAILS = process.env.ALLOWED_EMAILS?.split(",") || [];

export default auth((req) => {
  const isAuthenticated = !!req.auth;
  const userEmail = req.auth?.user?.email;
  const { pathname, origin } = req.nextUrl;

  if (!isAuthenticated && pathname === "/dashboard") {
    // Jika belum login dan mencoba mengakses /dashboard, arahkan ke /sign-in
    return NextResponse.redirect(new URL("/sign-in", origin));
  }

  if (isAuthenticated && pathname === "/sign-in") {
    // Jika sudah login dan mencoba mengakses /sign-in, arahkan ke /dashboard
    return NextResponse.redirect(new URL("/dashboard", origin));
  }

  if (!isAuthenticated && pathname === "/sign-out") {
    // Jika belum login dan mencoba mengakses /sign-out, arahkan ke /sign-in
    return NextResponse.redirect(new URL("/sign-in", origin));
  }

  if (pathname === "/dashboard" && (!userEmail || !ALLOWED_EMAILS.includes(userEmail))) {
    // Jika email tidak termasuk dalam daftar yang diizinkan, arahkan ke /sign-out
    return NextResponse.redirect(new URL("/sign-out", origin));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard", "/sign-in", "/sign-out"],
};
