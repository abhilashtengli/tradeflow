import { cookies } from "next/headers";

export async function getAuthToken(): Promise<string> {
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get("next-auth.session-token")?.value;

  if (!tokenCookie) {
    console.log("Authentication token not found.");
    throw new Error("Authentication token not found.");
  }

  return tokenCookie;
}
