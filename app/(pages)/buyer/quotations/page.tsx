import React from "react";
import QuotationSection from "./Quotes/page";
import { baseUrl } from "@/app/config";
import { createAuthorizedAxios } from "@/lib/authHelper";
const page = async () => {
  let requestedQuoteData = [];
  let quoteReceivedData = [];

  try {
    const api = await createAuthorizedAxios();

    const response = await api.get(
      `${baseUrl}/product/productQuote/buyerQuote`
    );
    requestedQuoteData = response.data.data;

    const responseData = await api.get(
      `${baseUrl}/product/productQuote/buyerQuote/getReceivedQuote`
    );
    quoteReceivedData = responseData.data.data;
  } catch (err) {
    console.log("could not fetch data", err);
  }

  return (
    <div>
      <QuotationSection
        sent={requestedQuoteData}
        received={quoteReceivedData}
      />
    </div>
  );
};

export default page;
