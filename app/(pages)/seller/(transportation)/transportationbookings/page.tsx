import { baseUrl } from "@/app/config";
import axios from "axios";
import React from "react";
import BookingsPage from "./BookingsPage/BookingsPage";

const page = async () => {
  let data = [];
  try {
    const response = await axios.get(
      `${baseUrl}/transportation/userInput/getBookings`
    );
    data = response.data.data;

    console.log(data);
  } catch (err) {
    console.log("Could not fetch data from server", err);
  }
  return (
    <div className="px-5">
      <BookingsPage data={data} />
    </div>
  );
};

export default page;
