import { baseUrl } from "@/app/config";
import axios from "axios";
import { error } from "console";
import React from "react";
import BookingPage from "./Booking";

const page = async () => {
  let Bookings = [];

  try {
    const responsePending = await axios.get(
      `${baseUrl}/freight/freightBooking/getBookings`
    );
    Bookings = responsePending.data.data;

    console.log(Bookings);
  } catch (err) {
    console.log({ message: "Could not fetch data", error: err });
  }
  return (
    <div>
      <BookingPage bookings={Bookings} />
    </div>
  );
};

export default page;
