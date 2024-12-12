import { baseUrl } from "@/app/config";
import React from "react";
import BookingPage from "./Booking";
import { createAuthorizedAxios } from "@/lib/authHelper";

const page = async () => {
  let Bookings = [];

  try {
    const api = await createAuthorizedAxios();
    const responsePending = await api.get(
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
