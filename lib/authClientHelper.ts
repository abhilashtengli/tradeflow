/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useSession } from "next-auth/react";

export function getAuthTokenFromCookie() {
  const { data: session } = useSession();

  // console.log("Session", session);
  return session;
}
