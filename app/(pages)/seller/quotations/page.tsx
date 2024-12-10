"use client";

import React from "react";
import QuotationSection from "./Quote/page";
import { SessionProvider } from "next-auth/react";

const page = () => {
  return (
    <SessionProvider>
      <div>
        <QuotationSection />
      </div>
    </SessionProvider>
  );
};

export default page;
