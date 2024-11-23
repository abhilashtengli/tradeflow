/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, Package, Tag } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { baseUrl } from "@/app/config";
import { useSearchParams } from "next/navigation";
import { ProductQuoteConfirmation } from "@/components/product-quote-confirmation/page";

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

export default function ProductsPage({
  initialProducts,
  error
}: ProductsPageProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [fetchError, setFetchError] = useState(error);
  const { toast } = useToast();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(
    initialProducts
  );
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query") || "";
  const [quoteConfirmation, setQuoteConfirmation] = useState<{
    isOpen: boolean;
    productId: string;
    productName: string;
  }>({
    isOpen: false,
    productId: "",
    productName: ""
  });

  useEffect(
    () => {
      if (searchQuery) {
        const filtered = products.filter(
          product =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            product.category.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredProducts(filtered);
      } else {
        setFilteredProducts(products);
      }
    },
    [searchQuery, products]
  );

  const handleRequestQuote = async (productId: string) => {
    try {
      await axios.post(`${baseUrl}/product/productQuote/buyerQuote`, {
        productId
      });

      toast({
        title: "Success",
        description: "Quote request sent successfully!"
      });
    } catch (error) {
      console.error("Error requesting quote:", error);
      toast({
        title: "Error",
        description: "Failed to request quote. Please try again.",
        variant: "destructive"
      });
    }
  };

  const openQuoteConfirmation = (productId: string, productName: string) => {
    setQuoteConfirmation({
      isOpen: true,
      productId,
      productName
    });
  };

  const closeQuoteConfirmation = () => {
    setQuoteConfirmation({
      isOpen: false,
      productId: "",
      productName: ""
    });
  };

  const confirmQuoteRequest = async () => {
    try {
      await handleRequestQuote(quoteConfirmation.productId);
      toast({
        title: "Success",
        description: `Quote request for "${quoteConfirmation.productName}" sent successfully!`,
        variant: "default"
      });
    } catch (error) {
      console.error("Error confirming quote request:", error);
      toast({
        title: "Error",
        description: "Failed to confirm quote request. Please try again.",
        variant: "destructive"
      });
    } finally {
      closeQuoteConfirmation();
    }
  };

  if (fetchError) {
    return (
      <div className="flex justify-center items-center h-screen">
        {fetchError}
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-5">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>
      {filteredProducts.length === 0
        ? <p className="text-center text-gray-500">
            No products found for {searchQuery}.
          </p>
        : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product =>
              <Card key={product.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    {product.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-gray-600 mb-4">
                    {product.description}
                  </p>
                  <div className="flex items-center gap-2 mb-2">
                    <Tag className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">
                      {product.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <Globe className="h-4 w-4 text-gray-500" />
                    <span className="text-sm mt-0.5">
                      {product.productOrigin}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-semibold">
                      {product.currency} {product.price.toFixed(2)}
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="gap-x-5 ">
                  <Button
                    className="w-full"
                    onClick={() =>
                      openQuoteConfirmation(product.id, product.name)}
                  >
                    Request Quote
                  </Button>
                  <Button className="w-full hover:bg-green-500 bg-green-600">
                    Buy
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>}
      <ProductQuoteConfirmation
        isOpen={quoteConfirmation.isOpen}
        onClose={closeQuoteConfirmation}
        onConfirm={confirmQuoteRequest}
        productName={quoteConfirmation.productName}
      />
    </div>
  );
}
