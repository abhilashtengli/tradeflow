import { JWT, NextAuthOptions } from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID as string,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    // }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Username", type: "email" },
        password: { label: "Password", type: "password" }
      },
      authorize: async credentials => {
        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error("Invalid credentials");
        }
        const { email, password } = credentials;

        const userTs = await prisma.userTransporter.findUnique({
          where: { email: email as string }
        });
        const user = await prisma.user.findUnique({
          where: { email: email as string }
        });
        const userFf = await prisma.freightForwarder.findUnique({
          where: { email: email as string }
        });

        if (!user && !userTs && !userFf) {
          throw new Error("User is invalid");
        }
        if (user) {
          const isPasswordValid = await bcrypt.compare(
            password as string,
            user.password
          );
          if (!isPasswordValid) throw new Error("Invalid password");
          console.log(user);

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            userRole: "user"
          };
        }

        if (userTs) {
          const isPasswordValid = await bcrypt.compare(
            password as string,
            userTs.password
          );
          if (!isPasswordValid) throw new Error("Invalid password");
          return {
            id: userTs.id,
            name: userTs.name,
            email: userTs.email,
            userRole: "transporter"
          };
        }

        if (userFf) {
          const isPasswordValid = await bcrypt.compare(
            password as string,
            userFf.password
          );
          if (!isPasswordValid) throw new Error("Invalid password");
          return {
            id: userFf.id,
            name: userFf.name,
            email: userFf.email,
            userRole: "freightForwarder"
          };
        }

        return null;
      }
    })
  ],
  session: { strategy: "jwt" },
  jwt: { secret: process.env.NEXTAUTH_SECRET, maxAge: 30 * 24 * 60 * 60 },
  cookies: {
    sessionToken: {
      name: "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production"
      }
    }
  },
  callbacks: {
    async jwt({ token, user }) {
      // This is correct, but needs to be typed correctly // Ensure you have this secret in your environment variables // Set your JWT expiration time (30 days in this case) // Make sure cookies are set securely in production
      if (user) {
        token.id = user.id;
        token.sub = user.id;
        token.userRole = user.userRole;
      }
      return token;
    },
    async session({ session, token }) {
      console.log("Session callback triggered");

      if (token) {
        session.user = {
          id: token.id as string,
          name: session.user.name,
          email: session.user.email,
          userRole: token.userRole as string
        }; // Preserve name if available // Preserve email if available
      }
      session.accessToken = (token as unknown) as JWT;

      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET
};

export default authOptions;
