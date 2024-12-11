"use client";
import React from "react";
import TransportationForm from "../addTransportationPage/page";
import { SessionProvider } from "next-auth/react";

const page = () => {
  return (
    <SessionProvider>
      <div>
        <TransportationForm />
      </div>
    </SessionProvider>
  );
};

export default page;
