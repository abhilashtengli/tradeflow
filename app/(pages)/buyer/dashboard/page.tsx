import { baseUrl } from "@/app/config";
import React from "react";
import { createAuthorizedAxios } from "@/lib/authHelper";
import Products from "./products/page";

const page = async () => {
  let data = [];
  let error = undefined;

  try {
    const api = await createAuthorizedAxios();
    const response = await api.get(`${baseUrl}/product`);
    data = response.data.data;
    console.log(response.data);
  } catch (err) {
    console.error("Error fetching products:", err);
    error = "Failed to fetch products. Please try again.";
  }

  return (
    <div>
      <Products initialProducts={data} error={error} />
    </div>
  );
};

export default page;
