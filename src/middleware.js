import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value || "";

  // Public routes where token is not required
  const publicRoutes = ["/Home", "/Search"];

  // Protected routes that require a token
  const protectedRoutes = ["/MyProfile", "/Win"];

  // Redirect to login if trying to access protected routes without a token
  if (!token) {
    if (protectedRoutes.includes(path)) {
      return NextResponse.redirect(new URL("/MyProfile/login", request.url));
    }
  } else {
    // If token exists, prevent access to login and register routes
    if (path === "/MyProfile/Register" || path === "/MyProfile/login") {
      return NextResponse.redirect(new URL("/MyProfile", request.url));
    }
  }

  return NextResponse.next(); // Allow the user to proceed to the requested route
}

export const config = {
  matcher: [
    "/Win/:path*", // Matches any sub-path under /Win
    "/MyProfile", // Matches /MyProfile
    "/MyProfile/Register", // Matches /MyProfile/Register
    "/MyProfile/login", // Matches /MyProfile/login
  ],
};
