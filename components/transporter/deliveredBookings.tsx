import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Booking {
  id: string;
  type: string;
  load: number;
  dispatched: boolean;
  origin: string;
  destination: string;
  delivered: boolean;
  paymentStatus: "PENDING" | "PAID" | "PARTIALLY_PAID" | "CANCELLED";
  // Add other relevant fields
}

interface DeliveredBookingsProps {
  bookings: Booking[];
}

export function DeliveredBookings({ bookings }: DeliveredBookingsProps) {
  return (
    <div className="grid gap-6 mt-6">
      {bookings && bookings.length > 0
        ? bookings.map(booking =>
            <Card key={booking.id} className="max-w-2xl ">
              <CardHeader>
                <CardTitle>
                  Booking ID: {booking.id}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p>
                    <strong>Type:</strong> {booking.type}
                  </p>
                  <p>
                    <strong>Load:</strong> {booking.load}
                  </p>
                  <p>
                    <strong>Origin:</strong> {booking.origin}
                  </p>
                  <p>
                    <strong>Destination:</strong> {booking.destination}
                  </p>

                  <p>
                    <strong>Payment Status:</strong> {booking.paymentStatus}
                  </p>
                  <p>
                    <strong>Dispatched:</strong> Yes
                  </p>
                  <p>
                    <strong>Delivered:</strong> Yes
                  </p>
                </div>
              </CardContent>
            </Card>
          )
        : <div className="flex mx-auto items-center justify-center text-3xl ">
            <h1 className="mt-32">
              There are products delivered as of now..🔸
            </h1>
          </div>}
    </div>
  );
}
