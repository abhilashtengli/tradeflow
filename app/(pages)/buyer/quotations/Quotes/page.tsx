/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useState } from "react";
import { DollarSign, Anchor, CalendarIcon, Package } from "lucide-react";
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
  Seller?: { name: string; country: string } | undefined;
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

interface QuoteProps {
  sent: Quote[];
  received: Quote[];
}

export default function QuotationSection({ sent, received }: QuoteProps) {
//   console.log(sent);
  //   console.log(received);
  const [requestedQuote, setRequestedQuote] = useState(sent);
  const [receivedQuote, setReceivedQuote] = useState(received);

  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [currentQuote, setCurrentQuote] = React.useState<Quote | null>();
  const [buyProduct, setBuyProduct] = React.useState({
    quantity: "",
    shippingAddress: "",
    productId: "",
    buyerConfirm: false,
    productQuoteId : ""
  });
  //   const [requestedQuotes, setRequestedQuotes] = useState<Quote[]>([]);
  //   const [sentQuotes, setSentQuotes] = useState<Quote[]>([]);

  //   useEffect(() => {
  //     const fetchRequestedQuotes = async () => {
  //       try {
  //         const response = await axios.get<{ data: Quote[] }>(
  //           `${baseUrl}/product/productQuote/sellerQuote`
  //         );
  //         // console.log(response.data.data);

  //         setRequestedQuotes(response.data.data || []);
  //       } catch (error) {
  //         console.log("Error fetching requested quotes:", error);
  //       }
  //     };
  //     const fetchSentquotes = async () => {
  //       try {
  //         const response = await axios.get(
  //           `${baseUrl}/product/productQuote/sellerQuote/getSentQuotes`
  //         );
  //         // console.log(response.data.data);

  //         setSentQuotes(response.data.data || []);
  //       } catch (error) {
  //         console.log("Error fetching requested quotes:", error);
  //       }
  //     };
  //     fetchRequestedQuotes();
  //     fetchSentquotes();
  //   }, []);

  const handleBuyProduct = (quote: Quote) => {
    // console.log(quote);
    setCurrentQuote(quote);
    setIsDialogOpen(true);
  };

  const handleConfirmBooking = async (
    e: { preventDefault: () => void },
    { id }: { id: string | "" }, {quoteId} : { quoteId: string | ""}
  ) => {
    e.preventDefault();
    try {
      console.log(id);

      if (!id) {
        console.error("No ID provided");
        return;
      }
      setIsDialogOpen(false);
      const updatedBooking = {
          ...buyProduct,
          quantity : Number(buyProduct.quantity),
        productId: id, // Add the ID directly here
        buyerConfirm: true,
        productQuoteId : quoteId
      };
      console.log(updatedBooking);

     const response = await axios.post(
        `${baseUrl}/product/productBooking/buyerBookinginput`,
        updatedBooking
        );
        console.log(response.data);
        
        
      setBuyProduct({
        quantity: "",
        shippingAddress: "",
        productId: "",
        buyerConfirm: false,
        productQuoteId: ""
      });
    } catch (e) {
      console.log(e);
    }
   
  };

  return (
    <div className="container mx-auto p-6">
      <Tabs defaultValue="requested" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="requested">Requested Quotations</TabsTrigger>
          <TabsTrigger value="sent">Received Quotations</TabsTrigger>
        </TabsList>
        <TabsContent value="requested">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 ">
            {requestedQuote.map((quote) => (
              <Card
                className="flex flex-col justify-between"
                key={quote.product?.id}
              >
                <CardHeader className="">
                  <div className="">
                    <CardTitle>{quote.product?.name}</CardTitle>{" "}
                    {/* Accessing the product name */}
                    <CardDescription className="mt-2">
                      Request sent to{" "}
                      {quote.Seller?.name?.toUpperCase() || "Unknown Seller"}
                    </CardDescription>{" "}
                    {/* Using buyerId or default */}
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Ensure valid fields */}
                  <p>Category: {quote.product?.category || "N/A"}</p>
                  <p>Country: {quote.product?.country || "N/A"}</p>
                  <p>
                    Status:{" "}
                    {quote.pendingQuotes === true ? (
                      <span className="text-green-500">Pending..</span>
                    ) : (
                      quote.pendingQuotes || "N/A"
                    )}
                  </p>

                  <p>
                    Price:{" "}
                    {quote.product?.price
                      ? `${quote.product.price} ${quote.product.currency} / ${quote.product.unit}`
                      : "N/A"}
                  </p>
                </CardContent>
                <CardFooter className=" flex justify-end ">
                  <div className="text-[12px]">
                    {new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric"
                    }).format(new Date(quote.createdAt))}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="sent">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {receivedQuote.map((quote) => (
              <Card key={quote.id}>
                <CardHeader className="grid grid-cols-2 ">
                  <div>
                    <CardTitle>{quote.product?.name}</CardTitle>
                    <CardDescription className="mt-2">
                      Received from {quote.Seller?.name}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="text-zinc-800 text-md font-medium">
                  <p>
                    Price quotated : {quote.price} {quote.currency} / {quote.product.unit}
                  </p>
                  <p>Category : {quote.product?.category}</p>
                  {quote.portOfOrigin && (
                    <p>Port of Origin : {quote.portOfOrigin}</p>
                  )}
                  {quote.noOfDaystoDeliver && (
                    <p>No of Days to deliver : {quote.noOfDaystoDeliver} </p>
                  )}
                  <p>Country : {quote.Seller?.country}</p>
                  <p>Payment Terms : {quote.paymentTerms}</p>
                </CardContent>
                <CardFooter className=" flex justify-between items-end ">
                  <Button
                    className="bg-green-600 hover:bg-green-500 hover:text-zinc-800"
                    onClick={() => handleBuyProduct(quote)}
                  >
                    Buy Product
                  </Button>
                  <div className="text-[12px]  text-end">
                    {new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric"
                    }).format(new Date(quote.createdAt))}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Book the product</DialogTitle>
            <DialogDescription>
              Fill in the details to buy{" "}
              <span className="font-semibold">
                {currentQuote?.product?.name || "Unknown product"}.
              </span>
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={(e) =>
              handleConfirmBooking(e, { id: currentQuote?.productId || "" }, {quoteId : currentQuote?.id || ""})
            }
          >
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="quantity" className="">
                  Quantity
                </Label>
                <div className="col-span-3 relative">
                  <Package
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    size={16}
                  />
                  <Input
                    id="quantity"
                    type="number"
                    value={buyProduct.quantity}
                    onChange={(e) =>
                      setBuyProduct({ ...buyProduct, quantity: e.target.value })
                    }
                    className="pl-10"
                    placeholder="Enter quantity"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="shippingAddress" className=" ">
                  Shipping address
                </Label>
                <div className="col-span-3 relative">
                  <Anchor
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={16}
                  />
                  <Input
                    id="shippingAddress"
                    value={buyProduct.shippingAddress}
                    onChange={(e) =>
                      setBuyProduct({ ...buyProduct, shippingAddress: e.target.value })
                    }
                    className="pl-10"
                    placeholder="Enter shipping address"
                    required
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Confirm Booking</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
