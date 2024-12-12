import { baseUrl } from "@/app/config";
import { BookingManagement } from "@/components/seller/Bookings/booking-management";
import { createAuthorizedAxios } from "@/lib/authHelper";
import React from "react";

const page = async () => {
  let freightBookingData = [];

  try {
    const api = await createAuthorizedAxios();
    const response = await api.get(
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
