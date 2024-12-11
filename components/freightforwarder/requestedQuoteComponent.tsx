"use client";

import { SessionProvider } from "next-auth/react";
import { RequestedQuotes } from "./requestedQuotes";

type Quote = {
  id: string;
  bookingId: string;
  freightBooking: {
    origin: string;
    destination: string;
    product: string;
    productUnit: string;
    departureDate: string;
    load: number;
    noOfContainers: number;
    containerType: string;
  };
};

export function RequestedQuotesComponent({
  requestedQuotes
}: {
  requestedQuotes: Quote[];
}) {
  return (
    <SessionProvider>
      <div>
        <RequestedQuotes requestedQuotes={requestedQuotes} />
      </div>
    </SessionProvider>
  );
}
