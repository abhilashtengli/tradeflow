"use client";
import React from "react";
import ProductBookingDashboard from "./ClientPage/page";
import { SessionProvider } from "next-auth/react";

const page = () => {
  return (
    <SessionProvider>
      <div>
        <ProductBookingDashboard />
      </div>
    </SessionProvider>
  );
};

export default page;
