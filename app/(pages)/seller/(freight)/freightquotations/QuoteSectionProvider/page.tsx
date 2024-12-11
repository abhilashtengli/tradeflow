"use client";
import React from "react";
import QuotationsSection from "../QuoteSection/page";
import { SessionProvider } from "next-auth/react";

type Quote = {
  id: string;
  bookingId: string;
  freightBooking: {
    product: string;
    origin: string;
    destination: string;
  };
  freightForwarder: {
    companyName: string;
    companyAddress: string;
    country: string;
    name: string;
    email: string;
  };
  price: number | null;
  currency: string | null;
  isAccepted: boolean | null;
  isRejected: boolean | null;
  createdAt: string;
};
const QuoteSectionProvider = ({
  requested,
  received
}: {
  requested: Quote[];
  received: Quote[];
}) => {
  return (
    <SessionProvider>
      <div>
        <QuotationsSection requested={requested} received={received} />
      </div>
    </SessionProvider>
  );
};

export default QuoteSectionProvider;
