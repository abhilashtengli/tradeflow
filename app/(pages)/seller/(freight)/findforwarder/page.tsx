import React from "react";
import axios from "axios";
import { baseUrl } from "@/app/config";
import { FindForwarder } from "@/components/seller/FindForwarder";

const page = async () => {
  let data = [];
  let bookingDetails = [];
  try {
    const response = await axios.get(
      `${baseUrl}/freight/freightForwarder/getAll`
    );
    data = response.data.data;

    const bookings = await axios.get(
      `${baseUrl}/freight/freightBooking/getBookings/userBookings?`
    );
    bookingDetails = bookings.data.data;
  } catch (err) {
    console.log("could not fetch Users", err);
  }
  console.log(bookingDetails);

  return (
    <div>
      <FindForwarder users={data} bookings={bookingDetails} />
    </div>
  );
};

export default page;
