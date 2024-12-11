"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookingCard } from "@/components/seller/transportation/booking-card";
import { EditBookingDialog } from "@/components/seller/transportation/edit-booking-dailog";
import { Toaster } from "@/components/ui/toaster";
import axios from "axios";
import { baseUrl } from "@/app/config";
import { Booking } from "@/app/types/booking";
import { useSession } from "next-auth/react";

interface BookingsPageProps {
  data: Booking[] | null;
}

export default function BookingsPage({ data }: BookingsPageProps) {
  const [bookingData, setBookingData] = useState<Booking[]>(data || []);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const { data: session } = useSession();
  const token = session?.accessToken;

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
    try {
      const response = await axios.get(
        `${baseUrl}/transportation/userInput/getBookings`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      const updatedData = response.data?.data || [];
      setBookingData(updatedData);
    } catch (error) {
      console.error("Error fetching updated data:", error);
      // Handle error (e.g., show a toast notification)
    }
  };

  const handleUpdate = async (
    bookingId: string,
    updatedData: Partial<Booking>
  ) => {
    try {
      const data = {
        ...updatedData,
        bookingId: bookingId
      };
      await axios.patch(
        `${baseUrl}/transportation/userInput`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      await fetchUpdatedData();
    } catch (error) {
      console.error("Error updating booking:", error);
      // Handle error (e.g., show a toast notification)
    }
  };

  const renderBookings = (bookings: Booking[]) => {
    if (bookings.length === 0) {
      return <p className="text-center text-gray-500">No bookings found.</p>;
    }

    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {bookings.map((booking) => (
          <BookingCard
            key={booking.id}
            booking={booking}
            onEdit={() => handleEdit(booking)}
            isPending={!booking.accepted}
          />
        ))}
      </div>
    );
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
          {renderBookings(pendingBookings)}
        </TabsContent>

        <TabsContent value="accepted" className="w-full">
          {renderBookings(acceptedBookings)}
        </TabsContent>

        <TabsContent value="dispatched" className="w-full">
          {renderBookings(dispatchedBookings)}
        </TabsContent>

        <TabsContent value="delivered" className="w-full">
          {renderBookings(deliveredBookings)}
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

