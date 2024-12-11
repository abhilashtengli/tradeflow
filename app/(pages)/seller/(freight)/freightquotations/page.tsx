import { baseUrl } from "@/app/config";
// import axios from "axios";
import React from "react";
import QuotationsSection from "./QuoteSection/page";
// import axios from "axios";
import { createAuthorizedAxios } from "@/lib/authHelper";
import QuoteSectionProvider from "./QuoteSectionProvider/page";
// import { createAuthorizedAxios } from "@/lib/authHelper";

const page = async () => {
  let requestedQuote = [];
  let receivedQuote = [];
   const api = await createAuthorizedAxios();
  try {
    try {
      const requested = await api.get(
        `${baseUrl}/freight/freightQuote/user/getRequestedQuote`
      );
      requestedQuote = requested.data?.data;
    } catch (err) {
      console.log("Could not fetch requested quote", err);
    }
    try {
      const received = await api.get(
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
     
      <QuoteSectionProvider requested={requestedQuote} received={receivedQuote} />
    </div>
  );
};

export default page;
