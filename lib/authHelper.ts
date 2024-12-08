import { cookies } from "next/headers";
import axios, { AxiosInstance } from "axios";

export async function getAuthToken(): Promise<string> {
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get("authjs.session-token")?.value;

  if (!tokenCookie) {
    console.log("Authentication token not found.");
    throw new Error("Authentication token not found.");
  }

  return tokenCookie;
}

export async function createAuthorizedAxios(): Promise<AxiosInstance> {
  const token = await getAuthToken();
  return axios.create({
    baseURL: "https://your-base-url.com/api", // Replace with your base URL
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
