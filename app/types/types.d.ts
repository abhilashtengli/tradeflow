// type.d.ts or a similar file where you declare module augmentations
import "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    email: string;
    userRole: string;
  }

  interface Session {
    user: User;
    accessToken: JWT;
  }

  interface JWT {
    id: string;
    sub?: string; // Optional: Matches the standard JWT `sub` property
    userRole: string;
    email?: string; // Optional: Include if email is part of the token
    iat?: number; // Issued at timestamp
    exp?: number;
  }
}
