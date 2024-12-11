import React from "react";
import BookingManagement from "./BookingManagement/page";
import { baseUrl } from "@/app/config";
import { createAuthorizedAxios } from "@/lib/authHelper";

const Booking = async () => {
  let acceptedBookings = [];
  let dispatchedBookings = [];
  let deliveredBookings = [];
  try {
    const api = await createAuthorizedAxios();
    const response = await api.get(`${baseUrl}/transportation/getDetails`);
    acceptedBookings = response.data.acceptedData;
    dispatchedBookings = response.data.dispatchedData;
    deliveredBookings = response.data.deliveredData;

    // console.log(acceptedBookings, deliveredBookings, dispatchedBookings);
  } catch (err) {
    console.log("Error fetching bookings", err);
  }
  return (
    <div>
      <BookingManagement
        accepted={acceptedBookings}
        dispatched={dispatchedBookings}
        delivered={deliveredBookings}
      />
    </div>
  );
};

export default Booking;
