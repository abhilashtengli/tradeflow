/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useState } from "react";
import { DollarSign, Anchor, CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import axios from "axios";
import { baseUrl } from "@/app/config";
import { useSession } from "next-auth/react";
// import { getAuthTokenFromCookie } from "@/lib/authClientHelper";

type Product = {
  id: string;
  name: string;
  category: string;
  country: string;
  description: string;
  price: number;
  quantity: number;
  unit: string;
  productOrigin: string;
  isAvailable: boolean;
  currency: string;
};

type Quote = {
  id: string;
  name: string;
  Buyer?: { name: string; country: string } | undefined;
  buyerId: string;
  productId: string;
  pendingQuotes: boolean;
  product: Product; // Use the Product type here
  sellerId: string;
  currency: string | null;
  price: number | null;
  noOfDaystoDeliver: number | null;
  paymentTerms: string | null;
  portOfOrigin: string | null;
  createdAt: string;
};

export default  function QuotationSection() {
  // const token = getAuthTokenFromCookie();
  // console.log(token);
  
  // if (!token) {
  //   console.log("Authentication token not found.");
  // }
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [currentQuote, setCurrentQuote] = React.useState<Quote | null>();
  const [newQuote, setNewQuote] = React.useState({
    price: "",
    paymentTerms: "",
    portOfOrigin: "",
    currency: "",
    noOfDaystoDeliver: "",
    productQuoteId: ""
  });
  const [requestedQuotes, setRequestedQuotes] = useState<Quote[]>([]);
  const [sentQuotes, setSentQuotes] = useState<Quote[]>([]);
  const { data: session } = useSession();
  console.log(session);
  
  useEffect(() => {
    const fetchRequestedQuotes = async () => {
      try {
        const response = await axios.get<{ data: Quote[] }>(
          `${baseUrl}/product/productQuote/sellerQuote`,
 
        );
        // console.log(response.data.data);

        setRequestedQuotes(response.data.data || []);
      } catch (error) {
        console.log("Error fetching requested quotes:", error);
      }
    };
    const fetchSentquotes = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/product/productQuote/sellerQuote/getSentQuotes`,
         
        );
        console.log(response.data.data);

        setSentQuotes(response.data.data || []);
      } catch (error) {
        console.log("Error fetching requested quotes:", error);
      }
    };
    fetchRequestedQuotes();
    fetchSentquotes();
  }, []);

  const handleSendQuote = (quote: Quote) => {
    console.log(quote);
    setCurrentQuote(quote);
    setIsDialogOpen(true);
  };

  const handleSubmitQuote = async (
    e: { preventDefault: () => void },
    { id }: { id: string | "" }
  ) => {
    e.preventDefault();
    try {
      console.log(id);

      if (!id) {
        console.error("No ID provided for the quote submission.");
        return;
      }
      setIsDialogOpen(false);
      const updatedQuote = {
        ...newQuote,
        productQuoteId: id, // Add the ID directly here
        price: Number(newQuote.price),
        noOfDaystoDeliver: Number(newQuote.noOfDaystoDeliver)
      };
      console.log(updatedQuote);

      await axios.patch(
        `${baseUrl}/product/productQuote/sellerQuote`,
        updatedQuote
      );
      setNewQuote({
        price: "",
        portOfOrigin: "",
        currency: "",
        noOfDaystoDeliver: "",
        paymentTerms: "",
        productQuoteId: ""
      });
    } catch (e) {
      console.log(e);
    }
    // const submittedQuote = { ...newQuote };
    // sentQuotes.push(submittedQuote);
  };

  return (
    <div className="container mx-auto p-6">
      <Tabs defaultValue="requested" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="requested">Requested Quotes</TabsTrigger>
          <TabsTrigger value="sent">Sent Quotes</TabsTrigger>
        </TabsList>
        <TabsContent value="requested">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {requestedQuotes.map((quote) => (
              <Card key={quote.product?.id}>
                <CardHeader className="grid grid-cols-2">
                  <div>
                    <CardTitle>{quote.product?.name}</CardTitle>{" "}
                    {/* Accessing the product name */}
                    <CardDescription>
                      Requested by{" "}
                      {quote.Buyer?.name?.toUpperCase() || "Unknown Buyer"}
                    </CardDescription>{" "}
                    {/* Using buyerId or default */}
                  </div>
                  <div className="text-[12px]  text-end">
                    {new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric"
                    }).format(new Date(quote.createdAt))}
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Ensure valid fields */}
                  <p>Category: {quote.product?.category || "N/A"}</p>
                  <p>
                    Price:{" "}
                    {quote.product?.price
                      ? `${quote.product.price} ${quote.product.currency}`
                      : "N/A"}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => handleSendQuote(quote)}>
                    Send Quote
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="sent">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sentQuotes.map((quote) => (
              <Card key={quote.id}>
                <CardHeader className="grid grid-cols-2 ">
                  <div>
                    <CardTitle>{quote.product?.name}</CardTitle>
                    <CardDescription>
                      Sent to {quote.Buyer?.name}
                    </CardDescription>
                  </div>
                  <div className="text-[12px]  text-end">
                    {new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric"
                    }).format(new Date(quote.createdAt))}
                  </div>
                </CardHeader>
                <CardContent className="text-zinc-800">
                  <p>
                    Price quotated : {quote.price} {quote.currency}
                  </p>
                  <p>Category : {quote.product?.category}</p>
                  {quote.portOfOrigin && (
                    <p>Port of Origin : {quote.portOfOrigin}</p>
                  )}
                  {quote.noOfDaystoDeliver && (
                    <p>No of Days to deliver : {quote.noOfDaystoDeliver} </p>
                  )}
                  <p>Country : {quote.Buyer?.country}</p>
                  <p>Payment Terms : {quote.paymentTerms}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Send Quote</DialogTitle>
            <DialogDescription>
              Fill in the details to send a quote for{" "}
              {currentQuote?.product?.name || "Unknown product"}.
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={(e) =>
              handleSubmitQuote(e, { id: currentQuote?.id || "" })
            }
          >
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="">
                  Price
                </Label>
                <div className="col-span-3 relative">
                  <DollarSign
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={16}
                  />
                  <Input
                    id="price"
                    type="number"
                    value={newQuote.price}
                    onChange={(e) =>
                      setNewQuote({ ...newQuote, price: e.target.value })
                    }
                    className="pl-10"
                    placeholder="Enter price"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="portOfOrigin" className=" ">
                  Origin
                </Label>
                <div className="col-span-3 relative">
                  <Anchor
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={16}
                  />
                  <Input
                    id="portOfOrigin"
                    value={newQuote.portOfOrigin}
                    onChange={(e) =>
                      setNewQuote({ ...newQuote, portOfOrigin: e.target.value })
                    }
                    className="pl-10"
                    placeholder="Enter port of origin"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="noOfDaystoDeliver" className=" ">
                  Delivery
                </Label>
                <div className="col-span-3 relative">
                  <CalendarIcon className=" h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    id="noOfDaystoDeliver"
                    type="number"
                    value={newQuote.noOfDaystoDeliver}
                    onChange={(e) =>
                      setNewQuote({
                        ...newQuote,
                        noOfDaystoDeliver: e.target.value
                      })
                    }
                    className="pl-10"
                    placeholder="No of Days to deliver"
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="paymentTerms" className=" ">
                  Terms
                </Label>
                <div className="col-span-3 relative">
                  <CalendarIcon className=" h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    id="paymentTerms"
                    type="String"
                    value={newQuote.paymentTerms}
                    onChange={(e) =>
                      setNewQuote({ ...newQuote, paymentTerms: e.target.value })
                    }
                    className="pl-10"
                    placeholder="payment Terms"
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="currencyType" className="">
                  Currency
                </Label>
                <Select
                  onValueChange={(value) =>
                    setNewQuote({ ...newQuote, currency: value })
                  }
                  required
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                    <SelectItem value="INR">INR</SelectItem>
                    <SelectItem value="RUB">RUB</SelectItem>
                    <SelectItem value="CNY">CNY</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Submit Quote</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
