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
        return { id: user.id, name: user.name, email: user.email };
      }
    })
  ],
  callbacks: {
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub ?? token.id as string;
      }
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
  secret: process.env.AUTH_SECRET,
});
