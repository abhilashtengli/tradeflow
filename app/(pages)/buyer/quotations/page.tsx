import React from "react";
import QuotationSection from "./Quotes/page";
import axios from "axios";
import { baseUrl } from "@/app/config";
const page = async () => {
  let requestedQuoteData = [];
  let quoteReceivedData = [];

  try {
    const response = await axios.get(
      `${baseUrl}/product/productQuote/buyerQuote`
    );
    requestedQuoteData = response.data.data;

    const responseData = await axios.get(
      `${baseUrl}/product/productQuote/buyerQuote/getReceivedQuote`
    );
    quoteReceivedData = responseData.data.data;

  } catch (err) {
    console.log("could not fetch data", err);
  }

  return <div>
    <QuotationSection sent={requestedQuoteData}  received= { quoteReceivedData}/>
    </div>;
};

export default page;
