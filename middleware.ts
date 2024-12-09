import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const publicFrontendPaths = ["/signin", "/signup"];
  const publicBackendPaths = ["/api/auth/"];
  const path = request.nextUrl.pathname;

  // Allow public paths
  if (
    publicFrontendPaths.some(frontendPath => path.startsWith(frontendPath)) ||
    publicBackendPaths.some(backendPath => path.startsWith(backendPath))
  ) {
    // console.log("Public path accessed, skipping middleware:", path);
    return NextResponse.next();
  }

  // Extract token
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
    cookieName: "next-auth.session-token" // Or whatever your cookie name is
  });

  // console.log("Token from middleware:", token);

  if (!token) {
    // Redirect to signin if no valid token is present
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // Check token payload for necessary claims
  const userRole = token.userRole;
  const userId = token.id;

  if (!userRole || !userId) {
    const redirectUrl = new URL("/signin", request.url);
    redirectUrl.searchParams.set("error", "missingTokenData");
    return NextResponse.redirect(redirectUrl);
  }

  // Add token data to headers for downstream processing
  const response = NextResponse.next();
  // response.headers.set("x-user-id", userId as string);
  // response.headers.set("x-user-role", userRole as string);

  return response;
}

export const config = {
  matcher: [
    "/((?!(?:api|_next|favicon.ico|static|public)).*)" // Excludes `api`, `_next`, `favicon.ico`, `static`, and `public` directories
  ]
};
