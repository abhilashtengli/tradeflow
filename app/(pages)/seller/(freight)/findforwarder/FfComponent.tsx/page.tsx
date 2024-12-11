import { FindForwarder } from "@/components/seller/FindForwarder";
import { FreightBookingData } from "@/components/seller/FreightBookingForm";
import { SessionProvider } from "next-auth/react";
import React from "react";

type Users = {
  id: string;
  name: string;
  email: string;
  companyName: string;
  companyAddress: string;
  country: string;
};

const FreightFowrderComponent = ({
  users,
  bookings
}: {
  users: Users[];
  bookings: FreightBookingData[];
}) => {
  return (
    <SessionProvider>
      <div>
        <FindForwarder users={users} bookings={bookings} />
      </div>
    </SessionProvider>
  );
};

export default FreightFowrderComponent;
