"use client"

import React from "react";
import ProductForm from "./uploadPage/page";
import { SessionProvider } from "next-auth/react";

const page = () => {
  return (
    <SessionProvider>
      <div>
        <ProductForm />
      </div>
    </SessionProvider>
  );
};

export default page;
