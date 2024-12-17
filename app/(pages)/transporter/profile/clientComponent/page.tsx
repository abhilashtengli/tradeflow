"use client";

import { SessionProvider } from "next-auth/react";
import ClientComponentPage from "./clientComponentPage";

interface Data {
  name: string;
  password: string;
  role: string;
  email: string;
  country: string;
  companyName: string;
  companyAddress: string;
}

export default function ClientComponent({ data }: { data: Data }) {
  return (
    <SessionProvider>
      <div>
        <ClientComponentPage data={data} />
      </div>
    </SessionProvider>
  );
}
