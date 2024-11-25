import { baseUrl } from "@/app/config";
import axios from "axios";
import Bookings from "./Bookings/page";

const ProductBookingsPage = async () => {
  try {
    const [
      responseDelivered,
      responseDispatched,
      responseBuyerConfirm,
      responseBookingConfirm
    ] = await Promise.all([
      axios.get(`${baseUrl}/product/productBooking/getBookings/isDelivered`),
      axios.get(`${baseUrl}/product/productBooking/getBookings/isDispatched`),
      axios.get(`${baseUrl}/product/productBooking/getBookings/buyerConfirm`),
      axios.get(`${baseUrl}/product/productBooking/getBookings/bookingConfirm`)
    ]);

    // Extract the arrays from the responses
    const deliveredBookings = responseDelivered.data.data;
    const dispatchedBookings = responseDispatched.data.data;
    const pendingBookings = responseBuyerConfirm.data.data;
    const confirmedBookings = responseBookingConfirm.data.data;


    return (
      <div className="p-4">
        <Bookings
          deliveredBookings={deliveredBookings}
          dispatchedBookings={dispatchedBookings}
          pendingBookings={pendingBookings}
          confirmedBookings={confirmedBookings}
        />
      </div>
    );
  } catch (err) {
    console.error("Error fetching bookings:", err);
    return <div>Error loading bookings. Please try again later.</div>;
  }
};

export default ProductBookingsPage;
