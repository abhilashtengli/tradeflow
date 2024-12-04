import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";

export interface Booking {
  id: string;
  arrivalDate: string;
  containerType: string;
  createdAt: string;
  currency: string | null;
  departureDate: string;
  destination: string;
  dispatched: boolean;
  freightForwarderId: string;
  freightIsAccepted: boolean;
  isDelivered: boolean;
  load: number;
  loadUnit: string;
  noOfContainers: number;
  origin: string;
  paymentStatus: string;
  price: number | null;
  product: string;
  productUnit: string;
  updatedAt: string;
  userConfirm: string;
  userId: string;
}

interface BookingCardProps {
  booking: Booking;
}

export function BookingCard({ booking }: BookingCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-sm font-medium">
          Booking ID: {booking.id}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="grid gap-1">
          <div className="text-sm font-medium">Origin</div>
          <div className="text-sm text-muted-foreground">
            {booking.origin}
          </div>
        </div>
        <div className="grid gap-1">
          <div className="text-sm font-medium">Destination</div>
          <div className="text-sm text-muted-foreground">
            {booking.destination}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-1">
            <div className="text-sm font-medium">Product Details</div>
            <div className="text-sm text-muted-foreground">
              {booking.product} ({booking.productUnit})
            </div>
          </div>
          {booking.price &&
            booking.currency &&
            <div className="grid gap-1">
              <div className="text-sm font-medium">Freight price</div>
              <div className="text-sm text-muted-foreground">
                {booking.price} {booking.currency}
              </div>
            </div>}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-1">
            <div className="text-sm font-medium">Load</div>
            <div className="text-sm text-muted-foreground">
              {booking.load} {booking.loadUnit}
            </div>
          </div>
          <div className="grid gap-1">
            <div className="text-sm font-medium">Containers</div>
            <div className="text-sm text-muted-foreground">
              {booking.noOfContainers} x{" "}
              {booking.containerType === "Type_20"
                ? "20 ft"
                : booking.containerType === "Type_40" ? "40 ft" : ""}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-1">
            <div className="text-sm font-medium">Departure</div>
            <div className="text-sm text-muted-foreground">
              {format(new Date(booking.departureDate), "dd MMM yyyy")}
            </div>
          </div>
          <div className="grid gap-1">
            <div className="text-sm font-medium">Arrival</div>
            <div className="text-sm text-muted-foreground">
              {format(new Date(booking.arrivalDate), "dd MMM yyyy")}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
