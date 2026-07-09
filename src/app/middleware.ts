import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Public routes
  const isPublicPath =
    path === "/login" ||
    path === "/signup" ||
    path === "/verifyemail";

  const token = request.cookies.get("token")?.value || "";

  // User is logged in and tries to access login/signup
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/profile", request.nextUrl));
  }

  // User is not logged in and tries to access protected routes
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

export const config = {
  matcher: [
    "/",
    "/profile",
    "/login",
    "/signup",
    "/verifyemail",
  ],
};