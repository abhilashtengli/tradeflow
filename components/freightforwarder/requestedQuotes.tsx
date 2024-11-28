"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { baseUrl } from "@/app/config";
import axios from "axios";

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

export function RequestedQuotes({
  requestedQuotes
}: {
  requestedQuotes: Quote[];
}) {
  const [quotes, setQuotes] = useState<Quote[]>(requestedQuotes);
  const [price, setPrice] = useState<number | undefined>();
  const [currency, setCurrency] = useState<string | undefined>();

  const handleSendQuote = async (quote: Quote) => {
    const data = {
      freightQuoteId: quote.id,
      currency: currency,
      price: price
    };
    console.log(data);

    try {
      const response = await axios.patch(
        `${baseUrl}/freight/freightQuote`,
        data
      );
      console.log(response.data);

      if (response.status === 200) {
        // Remove the quote from the list after sending
        setQuotes(quotes.filter(q => q.id !== quote.id));
      }
    } catch (error) {
      console.error("Error sending quote:", error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {quotes.map(quote =>
        <Card key={quote.id}>
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
              Container Type:{" "}
              {quote.freightBooking.containerType === "Type_20"
                ? "20 ft"
                : quote.freightBooking.containerType === "Type_40"
                  ? "40 ft"
                  : "Unknown"}
            </p>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Input
              type="number"
              placeholder="Set Price"
              onChange={e => setPrice(parseInt(e.target.value))}
            />
            <Select onValueChange={value => setCurrency(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Currency" />
              </SelectTrigger>
              <SelectContent>
                {["USD", "EURO", "GBP", "INR", "RUB", "CNY"].map(curr =>
                  <SelectItem key={curr} value={curr}>
                    {curr}
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
            <Button onClick={() => handleSendQuote(quote)}>Send Quote</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
