import React from "react";
import { baseUrl } from "@/app/config";
import { FindForwarder } from "@/components/seller/FindForwarder";
import axios from "axios";
// import { createAuthorizedAxios } from "@/lib/authHelper";

const page = async () => {
  let data = [];
  let bookingDetails = [];
  try {
    // const api = await createAuthorizedAxios();
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
  // console.log("BookingDetails", data);

  return (
    <div>
      <FindForwarder users={data} bookings={bookingDetails} />
    </div>
  );
};

export default page;
