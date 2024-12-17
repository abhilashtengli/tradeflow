"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AcceptedBookings } from "@components/transporter/acceptedBookings";
import { DispatchedBookings } from "@components/transporter/dispatchedBookings";
import { DeliveredBookings } from "@components/transporter/deliveredBookings";
import { baseUrl } from "@/app/config";
import axios from "axios";
import { useSession } from "next-auth/react";

interface Booking {
  id: string;
  type: string;
  loadUnit: string;
  load: number;
  dispatched: boolean;
  delivered: boolean;
  origin: string;
  destination: string;
  paymentStatus: "PENDING" | "PAID" | "PARTIALLY_PAID" | "CANCELLED";
  // Add other relevant fields
}
interface BookingManagementProps {
  accepted: Booking[]; // Correctly type these as arrays of bookings
  dispatched: Booking[];
  delivered: Booking[];
}

export default function BookingManagementPage({
  accepted,
  dispatched,
  delivered
}: BookingManagementProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [acceptedBookings, setAcceptedBookings] = useState<Booking[]>(accepted);
  const [dispatchedBookings, setDispatchedBookings] =
    useState<Booking[]>(dispatched);
  const [deliveredBookings, setDeliveredBookings] =
    useState<Booking[]>(delivered);

  const { data: session } = useSession();
  const token = session?.accessToken;

  const handleBookingUpdate = async (updatedBooking: Booking) => {
    try {
      const data = {
        transportationId: updatedBooking.id,
        dispatched: updatedBooking.dispatched,
        paymentStatus: updatedBooking.paymentStatus,
        load: updatedBooking.load,
        type: updatedBooking.type
      };
      console.log(data);

      const response = await axios.patch(
        `${baseUrl}/transportation/tsInput`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log(response.data.data);

      setAcceptedBookings(
        acceptedBookings.filter((booking) => booking.id !== updatedBooking.id)
      );
      setDispatchedBookings([...dispatchedBookings, response.data.data]);
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  };

  const handleDeliveryUpdate = async (updatedBooking: Booking) => {
    try {
      const data = {
        transportationId: updatedBooking.id,
        delivered: updatedBooking.delivered
      };
      const response = await axios.patch(
        `${baseUrl}/transportation/tsInput`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log(response.data.data);

      setDispatchedBookings(
        dispatchedBookings.filter((booking) => booking.id !== updatedBooking.id)
      );
      setDeliveredBookings([...deliveredBookings, response.data.data]);
    } catch (error) {
      console.error("Error updating delivery:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Booking Management</h1>
      <Tabs defaultValue="accepted">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="accepted">
            Accepted Bookings ({acceptedBookings.length})
          </TabsTrigger>
          <TabsTrigger value="dispatched">
            Dispatched Bookings ({dispatchedBookings.length})
          </TabsTrigger>
          <TabsTrigger value="delivered">
            Delivered Bookings ({deliveredBookings.length})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="accepted">
          <AcceptedBookings
            bookings={acceptedBookings}
            onUpdate={handleBookingUpdate}
          />
        </TabsContent>
        <TabsContent value="dispatched">
          <DispatchedBookings
            bookings={dispatchedBookings}
            onUpdate={handleDeliveryUpdate}
          />
        </TabsContent>
        <TabsContent value="delivered">
          <DeliveredBookings bookings={deliveredBookings} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
