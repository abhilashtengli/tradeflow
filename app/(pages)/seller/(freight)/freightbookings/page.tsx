import { baseUrl } from "@/app/config";
import { BookingManagement } from "@/components/seller/Bookings/booking-management";
import axios from "axios";
import React from "react";

const page = async () => {
  let freightBookingData = [];

  try {
    const response = await axios.get(
      `${baseUrl}/freight/freightBooking/getBookings/freightAcceptedBooking`
    );
    freightBookingData = response.data?.data;

    console.log(freightBookingData);
  } catch (err) {
    console.log("Could not fetch data", err);
  }
  return (
    <div>
      <BookingManagement bookings={freightBookingData} />
    </div>
  );
};

export default page;
