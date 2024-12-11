"use client";
import React from "react";
import BookingsPage from "../BookingsPage/BookingsPage";
import { Booking } from "@/app/types/booking";
import { SessionProvider } from "next-auth/react";
interface BookingsPageProps {
  data: Booking[];
}
const ClientB = ({ data }: BookingsPageProps) => {
  return (
    <SessionProvider>
      <div>
        <BookingsPage data={data} />
      </div>
    </SessionProvider>
  );
};

export default ClientB;
