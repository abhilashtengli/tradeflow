import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Booking {
  id: string;
  type: string;
  load: number;
  loadUnit: string;
  dispatched: boolean;
  delivered: boolean;
  origin: string;
  destination: string;
  paymentStatus: "PENDING" | "PAID" | "PARTIALLY_PAID" | "CANCELLED";
}

interface DispatchedBookingsProps {
  bookings: Booking[];
  onUpdate: (booking: Booking) => void;
}

export function DispatchedBookings({
  bookings,
  onUpdate
}: DispatchedBookingsProps) {
  const handleDeliveryUpdate = (booking: Booking, delivered: boolean) => {
    onUpdate({ ...booking, delivered });
  };

  console.log(bookings);

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
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-end">
                {/* <div className="flex items-center space-x-2">
              <Switch
                id={`delivered-${booking.id}`}
                checked={booking.delivered}
                onCheckedChange={checked =>
                  handleDeliveryUpdate(booking, checked)}
              />
              <Label htmlFor={`delivered-${booking.id}`}>Delivered</Label>
            </div> */}
                <Button onClick={() => handleDeliveryUpdate(booking, true)}>
                  Mark as Delivered
                </Button>
              </CardFooter>
            </Card>
          )
        : <div className="flex mx-auto items-center justify-center text-3xl ">
            <h1 className="mt-32">There are no dispatched bookings as of now..🔸</h1>
          </div>}
    </div>
  );
}
