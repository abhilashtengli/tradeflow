import { baseUrl } from "@/app/config";
import axios from "axios";
import React from "react";
import QuotationsSection from "./QuoteSection/page";

const page = async () => {
  let requestedQuote = [];
  let receivedQuote = [];
  try {
    try {
      const requested = await axios.get(
        `${baseUrl}/freight/freightQuote/user/getRequestedQuote`
      );
      requestedQuote = requested.data?.data;
    } catch (err) {
      console.log("Could not fetch requested quote", err);
    }
    try {
      const received = await axios.get(
        `${baseUrl}/freight/freightQuote/user/getReceivedQuote`
      );
       receivedQuote = received.data?.data;
    } catch (err) {
      console.log("Could not fetch recived quote", err);
      

     
    }

    console.log(requestedQuote);
    console.log(receivedQuote);
  } catch (err) {
    console.log("Could not fetch data", err);
  }
  return (
    <div>
      <QuotationsSection requested={requestedQuote} received={receivedQuote} />
    </div>
  );
};

export default page;
