"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { baseUrl } from "@/app/config";
import axios from "axios";

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

export default function QuotationsSection({
  requested,
  received
}: {
  requested: Quote[];
  received: Quote[];
}) {
  const [requestedQuotes, setRequestedQuotes] = useState<Quote[]>(requested);
  const [receivedQuotes, setReceivedQuotes] = useState<Quote[]>(received);

  const fetchQuotes = async () => {
    try {
      try {
        const requested = await axios.get(
          `${baseUrl}/freight/freightQuote/user/getRequestedQuote`
        );
        setRequestedQuotes(requested.data?.data);
      } catch (err) {
        console.log("Could not fetch requested quote", err);
      }
      try {
        const received = await axios.get(
          `${baseUrl}/freight/freightQuote/user/getReceivedQuote`
        );
        setReceivedQuotes(received.data?.data);
      } catch (err) {
        console.log("Could not fetch recived quote", err);
      }
    } catch (err) {
      console.log("Could not fetch data", err);
    }
  };

  const handleAcceptQuote = async (quote: Quote) => {
    const data = {
      bookingId: quote.bookingId,
      freightQuoteId: quote.id,
      userConfirm: "accepted"
    };
    try {
      const response = await axios.patch(
        `${baseUrl}/freight/freightBooking/userInput/confirmBooking`,
        data
      );
      if (response.status === 200) {
          fetchQuotes();
      }
    } catch (error) {
      console.error("Error accepting quote:", error);
    }
  };

  const handleRejectQuote = async (quote: Quote) => {
    const data = {
      bookingId: quote.bookingId,
      freightQuoteId: quote.id,
      userConfirm: "rejected"
    };
    try {
      const response = await axios.patch(
        `${baseUrl}/freight/freightBooking/userInput/confirmBooking`,
        data
      );

      console.log(response.data);

      if (response.status === 200) {
       fetchQuotes()
      }
    } catch (error) {
      console.error("Error rejecting quote:", error);
    }
  };

  const handleDeleteQuote = async (quote: Quote) => {
    const data = { quoteId: quote.id };
    try {
      const response = await axios.delete(
        `${baseUrl}/freight/freightQuote/user/deleteQuote`,
        { data } // Add payload under `data`
      );

      console.log(response.data);

      if (response.status === 200) {
        setReceivedQuotes((quotes) => quotes.filter((q) => q.id !== quote.id)); // Use `q` to avoid shadowing `quote`
      }
    } catch (error) {
      console.error("Error deleting quote:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Tabs defaultValue="received" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="received">Received Quotations</TabsTrigger>
          <TabsTrigger value="requested">Requested Quotations</TabsTrigger>
        </TabsList>
        <TabsContent value="received">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {receivedQuotes.map((quote) => (
              <Card key={quote.id} className="flex flex-col justify-between">
                <CardHeader className="">
                  <CardTitle className=" flex justify-between items-center">
                    <p className="tracking-wider ">
                      {quote.freightBooking.product}
                    </p>
                    <p
                      className={`text-sm font-normal ${
                        quote.isAccepted
                          ? "bg-green-400"
                          : quote.isRejected
                          ? "bg-red-400"
                          : "bg-yellow-400"
                      } px-1 py-0.5 tracking-wider rounded`}
                    >
                      {quote.isAccepted
                        ? "Accepted"
                        : quote.isRejected
                        ? "Rejected"
                        : "Pending"}
                    </p>
                  </CardTitle>

                  <CardDescription>
                    Received from {quote.freightForwarder.companyName}
                  </CardDescription>
                </CardHeader>
                <CardContent className="">
                  <p>Quote ID: {quote.id}</p>
                  <p>Freight Forwarder: {quote.freightForwarder.companyName}</p>
                  <p>Origin: {quote.freightBooking.origin}</p>
                  <p>Destination: {quote.freightBooking.destination}</p>
                  <p>Country: {quote.freightForwarder.country}</p>

                  <p>Email: {quote.freightForwarder.email}</p>
                  {quote.price && quote.currency && (
                    <p>
                      Price: {quote.price} {quote.currency}
                    </p>
                  )}
                </CardContent>
                <CardFooter className="flex justify-end items-center">
                  {!quote.isAccepted && !quote.isRejected && (
                    <div className="space-x-2">
                      <Button onClick={() => handleAcceptQuote(quote)}>
                        Accept
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => handleRejectQuote(quote)}
                      >
                        Reject
                      </Button>
                    </div>
                  )}
                  <div className="mx-2">
                    {quote.isRejected && (
                      <Button
                        variant="outline"
                        onClick={() => handleDeleteQuote(quote)}
                      >
                        Delete
                      </Button>
                    )}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="requested">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {requestedQuotes.map((quote) => (
              <Card key={quote.id} className="flex flex-col justify-between">
                <CardHeader>
                  <CardTitle className="tracking-wider">
                    {quote.freightBooking.product}
                  </CardTitle>
                  <CardDescription>
                    Request sent to {quote.freightForwarder.companyName}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Quote ID: {quote.id}</p>
                  <p>Freight Forwarder: {quote.freightForwarder.companyName}</p>

                  <p>Origin: {quote.freightBooking.origin}</p>
                  <p>Destination: {quote.freightBooking.destination}</p>
                  <p>Country: {quote.freightForwarder.country}</p>
                  <p>Product : {quote.freightBooking.product}</p>
                  <p>Contact: {quote.freightForwarder.name}</p>
                  <p>Email: {quote.freightForwarder.email}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
