import { cookies } from "next/headers";
import axios, { AxiosInstance } from "axios";
import { baseUrl } from "@/app/config";

export async function createAuthorizedAxios(): Promise<AxiosInstance> {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.get("next-auth.session-token")?.value;

  if (!cookieHeader) {
    throw new Error("Session token not found");
  }

  return axios.create({
    baseURL: baseUrl, 
    headers: {
      Authorization: `Bearer ${cookieHeader}`,
      Cookie: `next-auth.session-token=${cookieHeader}` // Manually add cookie if needed
    },
    withCredentials: true
  });
}
