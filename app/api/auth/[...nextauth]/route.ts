import NextAuth from "next-auth";
import authOptions from "../../../../lib/auth"; // Assuming you export authOptions from your auth.ts file

export const handler = NextAuth(authOptions); // Correct way to initialize NextAuth handler
export { handler as GET, handler as POST };
