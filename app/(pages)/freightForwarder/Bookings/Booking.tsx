"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PendingBookings } from "@components/freightforwarder/bookings/PendinBookings";
import { ConfirmedBookings } from "@components/freightforwarder/bookings/ConfirmedBookings";
import { DispatchedBookings } from "@components/freightforwarder/bookings/DispatchedBookings";
import { DeliveredBookings } from "@components/freightforwarder/bookings/DeliveredBookings";

export type Booking = {
  id: string;
  bookingId: string;
  origin: string;
  destination: string;
  product: string;
  productUnit: string;
  departureDate?: Date;
  arrivalDate?: Date;
  load?: number;
  noOfContainers?: number;
  currency?: string;
  price?: number;
  containerType?: "Type_20" | "Type_40";
  freightIsAccepted: boolean;
  dispatched: boolean;
  isDelivered: boolean;
  paymentStatus: string;
};

export default function BookingPage({ bookings }: { bookings: Booking[] }) {
  const [allBookings, setAllBookings] = useState<Booking[]>(bookings);

  const updateBooking = (updatedBooking: Booking) => {
    setAllBookings(prevBookings =>
      prevBookings.map(
        booking => (booking.id === updatedBooking.id ? updatedBooking : booking)
      )
    );
  };
  // console.log(allBookings);

  const pendingBookings = allBookings.filter(
    booking => !booking.freightIsAccepted
  );
  const confirmedBookings = allBookings.filter(
    booking => booking.freightIsAccepted && !booking.dispatched
  );
  const dispatchedBookings = allBookings.filter(
    booking => booking.dispatched && !booking.isDelivered
  );
  const deliveredBookings = allBookings.filter(booking => booking.isDelivered);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Booking Management</h1>
      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="pending">Pending Bookings</TabsTrigger>
          <TabsTrigger value="confirmed">Confirmed Bookings</TabsTrigger>
          <TabsTrigger value="dispatched">Dispatched Bookings</TabsTrigger>
          <TabsTrigger value="delivered">Delivered Bookings</TabsTrigger>
        </TabsList>
        <TabsContent value="pending">
          <PendingBookings
            bookings={pendingBookings}
            updateBooking={updateBooking}
          />
        </TabsContent>
        <TabsContent value="confirmed">
          <ConfirmedBookings
            bookings={confirmedBookings}
            updateBooking={updateBooking}
          />
        </TabsContent>
        <TabsContent value="dispatched">
          <DispatchedBookings
            bookings={dispatchedBookings}
            updateBooking={updateBooking}
          />
        </TabsContent>
        <TabsContent value="delivered">
          <DeliveredBookings bookings={deliveredBookings} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
