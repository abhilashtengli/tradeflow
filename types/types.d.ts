// types/types.d.ts
import "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    email: string;
    userRole: string; // Custom property
  }

  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      userRole: string; // Custom property
    };
  }

  interface JWT {
    id: string;
    userRole: string; // Custom property
  }
}
