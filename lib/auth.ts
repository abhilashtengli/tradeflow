import NextAuth, { CredentialsSignin } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Username",
          type: "email"
        },
        password: {
          label: "Password",
          type: "password"
        }
      },
      authorize: async credentials => {
        const { email, password } = credentials;
        console.log(email, "Signing in...");
        

        const user = await prisma.user.findUnique({
          where: {
            email: email as string
          }
        });
        {
        }
        if (!user) {
          throw new CredentialsSignin("user is in valid");
        }
        const isPasswordValid = await bcrypt.compare(
          password as string,
          user.password
        );
        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }
        return { id: user.id.toString(), name: user.name, email: user.email };
      }
    })
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub ?? "";
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.sub = user.id; 
      }
      return token;
    },
  },
});

// import { NextRequest, NextResponse } from "next/server";

// export function middleware(request: NextRequest) {
//   const path = request.nextUrl.pathname;
//   const token = request.cookies.get("token")?.value || "";

//   // Define public paths
//   const isPublicPath = path === "/signin" || path === "/signup";

//   // Redirect logged-in users away from /signin or /signup to /dashboard
//   if (isPublicPath && token) {
//     return NextResponse.redirect(new URL("/dashboard", request.url));
//   }

//   // Redirect to /signin if trying to access protected route without a token
//   if (!isPublicPath) {
//     // Prevent further redirects if already on /signin
//     if (path !== "/signin") {
//       return NextResponse.redirect(new URL("/signin", request.url));
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/dashboard","/admin/:path*"]
// };