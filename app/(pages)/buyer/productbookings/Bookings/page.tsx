"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookingCard } from "@components/BookingCard";

interface Booking {
  id: string;
  orderDate: string;
  product: { name: string };
  quantity: number;
  totalPrice: number;
  shippingAddress: string;
  expectedArrivalDate?: string;
  deliveredDate?: string;
  currency?: string;
  // Add other relevant fields as needed
}

interface BookingsProps {
  pendingBookings: Booking[];
  confirmedBookings: Booking[];
  dispatchedBookings: Booking[];
  deliveredBookings: Booking[];
}

export default function Bookings({
  pendingBookings = [],
  confirmedBookings = [],
  dispatchedBookings = [],
  deliveredBookings = []
}: BookingsProps) {
  // Default to an empty array if undefined
  //   console.log(pendingBookings);
  //   console.log(confirmedBookings);
  //   console.log(deliveredBookings);

  const [activeTab, setActiveTab] = useState("pending");

  return (
    <div className="container mx-auto py-2">
      <h1 className="text-3xl font-bold mb-6">Product Bookings</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="pending">
            Pending ({pendingBookings.length})
          </TabsTrigger>
          <TabsTrigger value="confirmed">
            Confirmed ({confirmedBookings.length})
          </TabsTrigger>
          <TabsTrigger value="dispatched">
            Dispatched ({dispatchedBookings.length})
          </TabsTrigger>
          <TabsTrigger value="delivered">
            Delivered ({deliveredBookings.length})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="pending">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {pendingBookings.map(booking =>
              <BookingCard
                key={booking.id}
                booking={booking}
                status="Pending"
              />
            )}
          </div>
        </TabsContent>
        <TabsContent value="confirmed">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {confirmedBookings.map(booking =>
              <BookingCard
                key={booking.id}
                booking={booking}
                status="Confirmed"
              />
            )}
          </div>
        </TabsContent>
        <TabsContent value="dispatched">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {dispatchedBookings.map(booking =>
              <BookingCard
                key={booking.id}
                booking={booking}
                status="Dispatched"
              />
            )}
          </div>
        </TabsContent>
        <TabsContent value="delivered">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {deliveredBookings.map(booking =>
              <BookingCard
                key={booking.id}
                booking={booking}
                status="Delivered"
              />
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
