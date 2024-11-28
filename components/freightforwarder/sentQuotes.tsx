"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

type SentQuote = {
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
  price: number;
  currency: string;
  user: {
    name: string;
    country: string;
    email: string;
  };
};

export function SentQuotes({ sentQuotes }: { sentQuotes: SentQuote[] }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sentQuote, setSentQuote] = useState<SentQuote[]>(sentQuotes);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {sentQuote.map(quote =>
        <Card key={quote.bookingId}>
          <CardContent className="p-4">
            <h2 className="text-lg text-zinc-700 font-semibold mb-2">
              Quote ID: {quote.id}
            </h2>
            <p>
              Origin: {quote.freightBooking.origin}
            </p>
            <p>
              Destination: {quote.freightBooking.destination}
            </p>
            <p>
              Product: {quote.freightBooking.product}
            </p>
            <p>
              Product Unit: {quote.freightBooking.productUnit}
            </p>
            <p>
              Departure Date:{" "}
              {new Date(
                quote.freightBooking.departureDate
              ).toLocaleDateString()}
            </p>
            <p>
              Load: {quote.freightBooking.load}
            </p>
            <p>
              No. of Containers: {quote.freightBooking.noOfContainers}
            </p>
            <p>
              Container Type: {quote.freightBooking.containerType}
            </p>
            <p>
              Price: {quote.price} {quote.currency}
            </p>
            <h3 className="text-md font-semibold mt-4 mb-2">User Details:</h3>
            <p>
              Name: {quote.user.name}
            </p>
            <p>
              Country: {quote.user.country}
            </p>
            <p>
              Email: {quote.user.email}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
