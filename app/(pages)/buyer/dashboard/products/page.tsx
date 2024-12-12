/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { SessionProvider } from "next-auth/react";
import ProductsPage from "./ProductPage";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  currency: string;
  productOrigin: string;
}

interface ProductsPageProps {
  initialProducts: Product[];
  error?: string;
}

export default function Products({
  initialProducts,
  error
}: ProductsPageProps) {
  return (
    <SessionProvider>
      <div>
        <ProductsPage initialProducts={initialProducts} error={error} />
      </div>
    </SessionProvider>
  );
}
