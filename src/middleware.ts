import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/dashboard"];
const authRoutes = [
  "/login",
  "/signup",
  "/forgot-password",
  "/google-callback",
];

export function middleware(request: NextRequest) {
  const token =
    request.cookies.get("accessToken")?.value ??
    request.cookies.get("token")?.value;

  const { pathname } = request.nextUrl;

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // Not logged in → redirect away from protected pages
  if (!token && isProtected) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Already logged in → redirect away from auth pages
  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/login",
    "/signup",
    "/forgot-password",
    "/google-callback",
  ],
};
