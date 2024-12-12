
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Booking } from "../../../app/(pages)/freightForwarder/bookings/Booking";
import axios from "axios";
import { baseUrl } from "@/app/config";
import { useSession } from "next-auth/react";

type PendingBookingsProps = {
  bookings: Booking[];
  updateBooking: (booking: Booking) => void;
};

export function PendingBookings({
  bookings,
  updateBooking
}: PendingBookingsProps) {
  const { data: session } = useSession();
  const token = session?.accessToken;
  const handleAccept = async (booking: Booking) => {
    try {
      const data = {
        freightIsAccepted: true,
        bookingId: booking.id
      };
      console.log(data);

      const response = await axios.patch(
        `${baseUrl}/freight/freightBooking/userFreightForwarderInput`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log(response.data);

      if (response.status === 200) {
        updateBooking({ ...booking, freightIsAccepted: true });
      }
    } catch (error) {
      console.error("Error accepting booking:", error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {bookings.map((booking) => (
        <Card key={booking.id}>
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-2">
              Booking ID: {booking.id}
            </h2>
            <p>Origin: {booking.origin}</p>
            <p>Destination: {booking.destination}</p>
            <p>Product: {booking.product}</p>
            <p>Product Unit: {booking.productUnit}</p>
            <p>Load: {booking.load}</p>
            <p>No. of Containers: {booking.noOfContainers}</p>
            <p>
              Container Type:{" "}
              {booking.containerType === "Type_20"
                ? "20 ft"
                : booking.containerType === "Type_40"
                ? "40 ft"
                : "Unknown"}
            </p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => handleAccept(booking)}>
              Accept Booking
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
