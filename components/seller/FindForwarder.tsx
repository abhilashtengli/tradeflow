import { useState } from "react";
import { FreightForwarderCard } from "./FreightForwarderCard";
import { FreightBookingForm, FreightBookingData } from "./FreightBookingForm";
import { RequestQuoteCard } from "./RequestQuoteCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data for freight forwarders
const freightForwarders = [
  {
    id: "ff1",
    name: "John Doe",
    email: "john@example.com",
    companyName: "Fast Freight Ltd",
    companyAddress: "123 Shipping Lane, Port City",
    country: "USA"
  }
  // Add more freight forwarders as needed
];

export function FindForwarder() {
  const [selectedForwarder, setSelectedForwarder] = useState<string | null>(
    null
  );
  const [
    bookingDetails,
    setBookingDetails
  ] = useState<FreightBookingData | null>(null);
  const [bookingIds, setBookingIds] = useState<string[]>([
    "B001",
    "B002",
    "B003"
  ]); // Mock booking IDs

  const handleRequestQuote = (forwarderId: string) => {
    setSelectedForwarder(forwarderId);
  };

  const handleBookingSubmit = (data: FreightBookingData) => {
    setBookingDetails(data);
    // Here you would typically send this data to your backend and get a booking ID in response
    setBookingIds([
      ...bookingIds,
      `B${bookingIds.length + 1}`.padStart(4, "0")
    ]);
  };

  const handleConfirmQuote = (
    bookingId: string,
    freightForwarderId: string
  ) => {
    console.log(
      `Requesting quote for booking ${bookingId} from forwarder ${freightForwarderId}`
    );
    // Here you would send this data to your backend
    setSelectedForwarder(null); // Reset selected forwarder after confirming
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Find Forwarder</h1>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="md:w-2/3 space-y-4">
          <FreightBookingForm onSubmit={handleBookingSubmit} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {freightForwarders.map(forwarder =>
              <FreightForwarderCard
                key={forwarder.id}
                {...forwarder}
                onRequestQuote={() => handleRequestQuote(forwarder.id)}
              />
            )}
          </div>
        </div>
        <div className="md:w-1/3 space-y-4">
          {bookingDetails &&
            <Card>
              <CardHeader>
                <CardTitle>Latest Booking Details</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  <strong>Origin:</strong> {bookingDetails.origin}
                </p>
                <p>
                  <strong>Destination:</strong> {bookingDetails.destination}
                </p>
                <p>
                  <strong>Departure Date:</strong>{" "}
                  {bookingDetails.departureDate}
                </p>
                <p>
                  <strong>Load:</strong> {bookingDetails.load}
                </p>
                <p>
                  <strong>Containers:</strong> {bookingDetails.noOfContainers}
                </p>
                <p>
                  <strong>Container Type:</strong>{" "}
                  {bookingDetails.containerType}
                </p>
                <p>
                  <strong>Product Unit:</strong> {bookingDetails.productUnit}
                </p>
              </CardContent>
            </Card>}
          {selectedForwarder &&
            <RequestQuoteCard
              bookingIds={bookingIds}
              freightForwarderId={selectedForwarder}
              onConfirm={handleConfirmQuote}
            />}
        </div>
      </div>
    </div>
  );
}
