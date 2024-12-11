"use client";

import { useState } from "react";
import { FreightForwarderCard } from "./FreightForwarderCard";
import { FreightBookingForm, FreightBookingData } from "./FreightBookingForm";
import { RequestQuoteCard } from "./RequestQuoteCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import axios from "axios";
import { baseUrl } from "@/app/config";
import { useSession } from "next-auth/react";

type Users = {
  id: string;
  name: string;
  email: string;
  companyName: string;
  companyAddress: string;
  country: string;
};

export function FindForwarder({
  users,
  bookings
}: {
  users: Users[];
  bookings: FreightBookingData[];
}) {
  const [selectedForwarder, setSelectedForwarder] = useState<string | null>(
    null
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [freightForwarders, setFreightForwarders] = useState<Users[]>(
    users || []
  );
  const [bookingDetails, setBookingDetails] = useState<FreightBookingData[]>(
    bookings || []
  );
  const [isRequestQuoteOpen, setIsRequestQuoteOpen] = useState(false);

  const { data: session } = useSession();
  const token = session?.accessToken;

  const handleRequestQuote = (forwarderId: string) => {
    setSelectedForwarder(forwarderId);
    setIsRequestQuoteOpen(true);
  };

  const handleBookingSubmit = (data: FreightBookingData) => {
    setBookingDetails([...bookingDetails, data]);
  };

  const handleConfirmQuote = async (
    bookingId: string,
    freightForwarderId: string
  ) => {
    // console.log(
    //   `Requesting quote for booking ${bookingId} from forwarder ${freightForwarderId}`
    // );
    // Here you would send this data to your backend
    const data = {
      bookingId: bookingId,
      freightForwarderId: freightForwarderId
    };
    try {
      const response = await axios.post(
        `${baseUrl}/freight/freightQuote/requestFreightQuote`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log(response.data);
    } catch (err) {
      console.log(
        "Could not send quotation request to  freight forwarder",
        err
      );
    }
    setSelectedForwarder(null);
    setIsRequestQuoteOpen(false); // Close the dialog after confirming
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Find Forwarder</h1>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="md:w-full space-y-4">
          <FreightBookingForm onSubmit={handleBookingSubmit} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {freightForwarders.map((forwarder) => (
              <FreightForwarderCard
                key={forwarder.id}
                {...forwarder}
                onRequestQuote={() => handleRequestQuote(forwarder.id)}
              />
            ))}
          </div>
        </div>
        <div className="md:w-1/2 space-y-4">
          {bookingDetails.map((booking) => (
            <Card key={booking.id}>
              <CardHeader>
                <CardTitle>Freight Booking Details</CardTitle>
                <span className="text-sm ">Booking Id : {booking.id}</span>
              </CardHeader>
              <CardContent>
                <p>
                  <strong>Origin:</strong> {booking.origin}
                </p>
                <p>
                  <strong>Destination:</strong> {booking.destination}
                </p>
                <p>
                  <strong>Product Name:</strong> {booking.product}
                </p>
                <p>
                  <strong>Product Unit:</strong> {booking.productUnit}
                </p>
                <p>
                  <strong>Expected Departure Date:</strong>{" "}
                  {new Intl.DateTimeFormat("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric"
                  }).format(new Date(booking.departureDate))}
                </p>
                <p>
                  <strong>Load:</strong> {booking.load} {booking.loadUnit}
                </p>
                <p>
                  <strong>Containers:</strong> {booking.noOfContainers}
                </p>
                <p>
                  <strong>Container Type: </strong>
                  {booking.containerType === "Type_20"
                    ? "20 ft"
                    : booking.containerType === "Type_40"
                    ? "40 ft"
                    : "Unkown type"}
                </p>
              </CardContent>
            </Card>
          ))}
          <Dialog
            open={isRequestQuoteOpen}
            onOpenChange={setIsRequestQuoteOpen}
          >
            <DialogContent>
              {selectedForwarder && (
                <RequestQuoteCard
                  bookings={bookingDetails}
                  freightForwarderId={selectedForwarder}
                  onConfirm={handleConfirmQuote}
                />
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
