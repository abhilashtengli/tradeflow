import React from "react";
import BookingManagement from "./BookingManagement/page";
import axios from "axios";
import { baseUrl } from "@/app/config";

const Booking = async () => {
  let acceptedBookings = [];
  let dispatchedBookings = [];
  let deliveredBookings = [];
  try {
    const response = await axios.get(`${baseUrl}/transportation/getDetails`);
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
