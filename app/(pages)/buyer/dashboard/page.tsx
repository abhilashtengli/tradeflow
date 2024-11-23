import { baseUrl } from "@/app/config";
import axios from "axios";
import React from "react";
import ProductsPage from "./productsPage/page";

const page = async () => {
  let data = [];
  let error = undefined;

  try {
    const response = await axios.get(`${baseUrl}/product`);
    data = response.data.data;
  } catch (err) {
    console.error("Error fetching products:", err);
    error = "Failed to fetch products. Please try again.";
  }

  return (
    <div>
      <ProductsPage initialProducts={data} error={error} />
    </div>
  );
};

export default page;
