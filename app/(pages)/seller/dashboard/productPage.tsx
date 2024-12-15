"use client";

import { ProductsList } from "./productList";
import { Product } from "@/app/types/sellerTypes";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "next-auth/react";

// Dummy API functions - replace these with your actual API calls


// async function deleteProduct(productId: string): Promise<void> {
//   // Simulate API call
//   await new Promise((resolve) => setTimeout(resolve, 1000));
//   console.log("Delete product:", productId);
// }

export default function ProductsPage({ products }: { products: Product[] }) {
  // Your products data will be passed as a prop here
  //   const products: Product[] = [];

  return (
    <>
      <SessionProvider>
        <ProductsList
          products={products}
        />
        <Toaster />
      </SessionProvider>
    </>
  );
}
