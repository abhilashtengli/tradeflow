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
  }

  interface JWT {
    id: string;
    sub: string;
    userRole: string;
  }
}
