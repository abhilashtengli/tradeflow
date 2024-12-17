"use client";

import { SessionProvider } from "next-auth/react";
import BookingManagementPage from "./BMPage";

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

export default function BookingManagement({
  accepted,
  dispatched,
  delivered
}: BookingManagementProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  return (
    <SessionProvider>
    <div>
      <BookingManagementPage
        accepted={accepted}
        dispatched={dispatched}
        delivered={delivered}
      />
      </div>
      </SessionProvider>
  );
}
