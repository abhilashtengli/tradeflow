import { baseUrl } from "@/app/config";
import axios from "axios";
import React from "react";
import Bookings from "./Bookings/page";

const page = async () => {
  try {
    const responseDelivery = await axios.get(
      `${baseUrl}/product/productBooking/getBookings/isDelivered`
    );
    const responseDispatch = await axios.get(
      `${baseUrl}/product/productBooking/getBookings/isDispatched`
    );
    const responseBuyerconfirm = await axios.get(
      `${baseUrl}/product/productBooking/getBookings/buyerConfirm`
    );
    const responseBookingconfirm = await axios.get(
      `${baseUrl}/product/productBooking/getBookings/bookingConfirm`
    );
    // console.log("Delivered :", responseDelivery.data);
    // console.log("dispatched : ", responseDispatch.data);
    // console.log(
    //   "Buyer confirm bu booking pending: ",
    //   responseBuyerconfirm.data
    // );
    // console.log("Booking confirm : ", responseBookingconfirm.data);
  } catch (err) {
    console.log(err);
  }
  return (
    <div>
      <Bookings />
    </div>
  );
};

export default page;
