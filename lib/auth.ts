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
      authorize: async (credentials) => {
        const { email, password } = credentials;

        const userTs = await prisma.userTransporter.findUnique({
          where: {
            email: email as string
          }
        });
        const user = await prisma.user.findUnique({
          where: {
            email: email as string
          }
        });

        const userFf = await prisma.freightForwarder.findUnique({
          where: {
            email: email as string
          }
        });

        if (!user && !userTs && !userFf) {
          throw new CredentialsSignin("user is in valid");
        }
        if (user) {
          const isPasswordValid = await bcrypt.compare(
            password as string,
            user.password
          );
          if (!isPasswordValid) {
            throw new Error("Invalid password");
          }
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
          if (!isPasswordValid) {
            throw new Error("Invalid password");
          }
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
          if (!isPasswordValid) {
            throw new Error("Invalid password");
          }
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
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.sub = user.id;
        token.userRole = user.userRole;
       
        // token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub ?? (token.id as string);
        session.user.userRole = token.userRole as string;
      }
      return session;
    }
  },
  secret: process.env.AUTH_SECRET
});
