import { baseUrl } from "@/app/config";
import Bookings from "./Bookings/page";
import { createAuthorizedAxios } from "@/lib/authHelper";

const ProductBookingsPage = async () => {
  try {
    const api = await createAuthorizedAxios();
    const [
      responseDelivered,
      responseDispatched,
      responseBuyerConfirm,
      responseBookingConfirm
    ] = await Promise.all([
      api.get(`${baseUrl}/product/productBooking/getBookings/isDelivered`),
      api.get(`${baseUrl}/product/productBooking/getBookings/isDispatched`),
      api.get(`${baseUrl}/product/productBooking/getBookings/buyerConfirm`),
      api.get(`${baseUrl}/product/productBooking/getBookings/bookingConfirm`)
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
