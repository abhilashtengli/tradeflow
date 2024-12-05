"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookingCard } from "@/components/seller/transportation/booking-card";
import { EditBookingDialog } from "@/components/seller/transportation/edit-booking-dailog";
import { Toaster } from "@/components/ui/toaster";
import type { Booking } from "@/types/booking";
import axios from "axios";
import { baseUrl } from "@/app/config";

interface BookingsPageProps {
  data: Booking[];
}

export default function BookingsPage({ data }: BookingsPageProps) {
  const [bookingData, setBookingData] = useState(data);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const pendingBookings = bookingData.filter((booking) => !booking.accepted);
  const acceptedBookings = bookingData.filter(
    (booking) => booking.accepted && !booking.dispatched
  );
  const dispatchedBookings = bookingData.filter(
    (booking) => booking.dispatched && !booking.delivered
  );
  const deliveredBookings = bookingData.filter((booking) => booking.delivered);

  const handleEdit = (booking: Booking) => {
    setSelectedBooking(booking);
    setEditDialogOpen(true);
  };

  const fetchUpdatedData = async () => {
    const response = await axios.get(
      `${baseUrl}/transportation/userInput/getBookings`
    );
    data = response.data?.data;
    setBookingData(data);
  };

  const handleUpdate = async (
    bookingId: string,
    updatedData: Partial<Booking>
  ) => {
    // This would be an API call in a real application
    const data = {
      ...updatedData,
      bookingId: bookingId
    };
    // console.log(data);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const response = await axios.patch(
      `${baseUrl}/transportation/userInput`,
      data
    );
    fetchUpdatedData();
    // console.log(response.data);
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Booking Management</h1>

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList className="w-full">
          <TabsTrigger value="pending" className="flex-1">
            Pending
          </TabsTrigger>
          <TabsTrigger value="accepted" className="flex-1">
            Accepted
          </TabsTrigger>
          <TabsTrigger value="dispatched" className="flex-1">
            Dispatched
          </TabsTrigger>
          <TabsTrigger value="delivered" className="flex-1">
            Delivered
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="w-full">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {pendingBookings.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                onEdit={() => handleEdit(booking)}
                isPending
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="accepted" className="w-full">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {acceptedBookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="dispatched" className="w-full">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {dispatchedBookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="delivered" className="w-full">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {deliveredBookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {selectedBooking && (
        <EditBookingDialog
          booking={selectedBooking}
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          onUpdate={handleUpdate}
        />
      )}

      <Toaster />
    </div>
  );
}
