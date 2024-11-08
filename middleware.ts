import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value || "";

  
  // Define public paths
  const isPublicPath = path === "/signin" || path === "/signup";

  // Redirect logged-in users away from /signin or /signup to /dashboard
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Redirect to /signin if trying to access protected route without a token
  if (!isPublicPath && !token) {
    // Prevent further redirects if already on /signin
    if (path !== "/signin") {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard", "/signin", "/signup", "/admin/:path*"]
};
