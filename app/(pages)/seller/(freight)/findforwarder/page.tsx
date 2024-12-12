import React from "react";
import { baseUrl } from "@/app/config";
import { createAuthorizedAxios } from "@/lib/authHelper";
import FreightFowrderComponent from "./FfComponent.tsx/page";

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

  return (
    <div>
      <FreightFowrderComponent users={data} bookings={bookingDetails} />
    </div>
  );
};

export default page;
