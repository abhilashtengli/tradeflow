"use client";

import React from "react";
import ClientComponent from "../ClientComponent/page";
import { SessionProvider } from "next-auth/react";

interface Data {
  name: string;
  password: string;
  role: string;
  email: string;
  country: string;
}

const page = ({ data }: { data: Data }) => {
  return (
    <SessionProvider>
      <div>
        <ClientComponent data={data} />
      </div>
    </SessionProvider>
  );
};

export default page;
