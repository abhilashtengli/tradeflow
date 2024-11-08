// export { auth as middleware } from "./lib/auth";

import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Define public paths
  const isPublicPath = path === "/signin" || path === "/signup";

  // Fetch token using next-auth's getToken helper
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET
  });

  // Redirect logged-in users away from /signin or /signup to /dashboard
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Redirect to /signin if trying to access protected route without a token
  if (!isPublicPath && !token) {
    if (path !== "/signin") {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/admin/:path*"]
};
