import { baseUrl } from "@/app/config";
import axios from "axios";
import React from "react";
import BookingsPage from "./BookingsPage/BookingsPage";
import ClientB from "./ClientBookingPage/ClientB";
import { createAuthorizedAxios } from "@/lib/authHelper";

const page = async () => {
  let data = [];
  try {
    const api = await createAuthorizedAxios();
    const response = await api.get(
      `${baseUrl}/transportation/userInput/getBookings`
    );
    data = response.data.data;

    console.log(data);
  } catch (err) {
    console.log("Could not fetch data from server", err);
  }
  return (
    <div className="px-5">
      <ClientB data={data} />
    </div>
  );
};

export default page;
