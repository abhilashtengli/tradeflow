import React from "react";
import { baseUrl } from "@/app/config";
import { FindForwarder } from "@/components/seller/FindForwarder";
import { createAuthorizedAxios } from "@/lib/authHelper";

const page = async () => {
  let data = [];
  let bookingDetails = [];
  try {
    const api = await createAuthorizedAxios();
    const response = await api.get(
      `${baseUrl}/freight/freightForwarder/getAll`
    );
    data = response.data.data;

    const bookings = await api.get(
      `${baseUrl}/freight/freightBooking/getBookings/userBookings?`
    );
    bookingDetails = bookings.data.data;
  } catch (err) {
    console.log("could not fetch Users", err);
  }
  console.log("BookingDetails", data);

  return (
    <div>
      <FindForwarder users={data} bookings={bookingDetails} />
    </div>
  );
};

export default page;
