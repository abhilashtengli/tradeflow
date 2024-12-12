/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React from "react";

import QuotationSectionPage from "./QuotationSectionPage";
import { SessionProvider } from "next-auth/react";

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
  return (
    <SessionProvider>
      <div>
        <QuotationSectionPage sent={sent} received={received} />
      </div>
    </SessionProvider>
  );
}
