// export { auth as middleware } from "./lib/auth";

import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const protectedRoutes = ["/api/user"];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath = path === "/signin" || path === "/signup";

  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
    cookieName: "authjs.session-token",
  });

  if (!token) {
    if (protectedRoutes.some((route) => path.startsWith(route))) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
  }
  if (token) {
    const userId = token?.userId as string;
    if (
      protectedRoutes.some((route) =>
        request.nextUrl.pathname.startsWith(route)
      )
    ) {
      if (!token && !userId) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }
      const user = await prisma.user.findUnique({
        where: {
          id: userId
        }
      });
      if (!user) {
        return NextResponse.json(
          {
            message: "User not found"
          },
          { status: 404 }
        );
      }
      const response = NextResponse.next();

      // Add user data to response headers (this will be available in the downstream API or page)
      response.headers.set("x-user-id", user.id);
      response.headers.set("x-user-name", user.name);
      response.headers.set("x-user-email", user.email);

      return response;
    }
  }

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
  matcher: ["/dashboard", "/admin/:path*",] //"/api/user/:path*"
};
