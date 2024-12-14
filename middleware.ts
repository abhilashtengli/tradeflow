import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// Define allowed routes for each role
const allowedRoutes = {
  Seller: ["/seller", "/api"],
  Buyer: ["/buyer", "/api"],
  FreightForwarder: ["/freightForwarder", "/api"],
  Transporter: ["/transporter", "/api"]
};

const publicPaths = ["/signin", "/signup", "/api/auth", "/api/getUserRole"];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // console.log(`Middleware processing path: ${path}`);

  // Always allow public paths
  if (publicPaths.some(publicPath => path.startsWith(publicPath))) {
    // console.log(`Public path accessed: ${path}`);
    return NextResponse.next();
  }

  // Extract token
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    cookieName: "next-auth.session-token"
  });

  // console.log(`Token found: ${!!token}`);

  const dashboardPaths = {
    Seller: "/seller/dashboard",
    Buyer: "/buyer/dashboard",
    FreightForwarder: "/freightForwarder/quotation",
    Transporter: "/transporter/tsdashboard"
  };
  type UserRole = keyof typeof dashboardPaths;

  // If no token and not a public path, redirect to signin
  if (!token) {
    // console.log(`No token, redirecting to signin`);
    if (path.startsWith("/api/")) {
      // For API routes, return a 401 Unauthorized response
      return new NextResponse(
        JSON.stringify({ success: false, message: "Authentication required" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // Check token payload for necessary claims
  const userRole = token.userRole as UserRole;
  const userId = token.id;

  // console.log(`User role: ${userRole}, User ID: ${userId}`);

  if (!userRole || !userId) {
    // console.log(`Missing user role or ID, redirecting to signin`);
    if (path.startsWith("/api/")) {
      // For API routes, return a 401 Unauthorized response
      return new NextResponse(
        JSON.stringify({ success: false, message: "Invalid token" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }
    const redirectUrl = new URL("/signin", request.url);
    redirectUrl.searchParams.set("error", "missingTokenData");
    return NextResponse.redirect(redirectUrl);
  }

  // If user is logged in and trying to access signin or signup, redirect to their dashboard
  if (path === "/signin" || path === "/signup") {
    // console.log(
    //   `Logged in user accessing signin/signup, redirecting to dashboard`
    // );
    return NextResponse.redirect(
      new URL(dashboardPaths[userRole], request.url)
    );
  }

  // Check if the current path is allowed for the user's role
  const isAllowedRoute = allowedRoutes[userRole].some(route =>
    path.startsWith(route)
  );
  if (!isAllowedRoute) {
    // console.log(`User accessing unauthorized route, redirecting to dashboard`);
    if (path.startsWith("/api/")) {
      // For API routes, return a 403 Forbidden response
      return new NextResponse(
        JSON.stringify({ success: false, message: "Access denied" }),
        { status: 403, headers: { "Content-Type": "application/json" } }
      );
    }
    return NextResponse.redirect(
      new URL(dashboardPaths[userRole], request.url)
    );
  }

  // console.log(`Access granted to ${path}`);
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|static|public).*)"]
};
