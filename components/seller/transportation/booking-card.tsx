import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Banknote, MapPin, Package, Ruler, Truck } from "lucide-react";
import { Booking } from "@/app/types/booking";

interface BookingCardProps {
  booking: Booking;
  onEdit?: () => void;
  isPending?: boolean;
}

export function BookingCard({
  booking,
  onEdit,
  isPending = false
}: BookingCardProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Booking ID: {booking.id}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <div>
              <p className="text-sm font-medium">Origin</p>
              <p className="text-sm text-muted-foreground">
                {booking.origin}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <div>
              <p className="text-sm font-medium">Destination</p>
              <p className="text-sm text-muted-foreground">
                {booking.destination}
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Banknote className="h-4 w-4" />
            <div>
              <p className="text-sm font-medium">Price</p>
              <p className="text-sm text-muted-foreground">
                INR {booking.price.toFixed(2)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Ruler className="h-4 w-4 text-gray-600" />
            <div>
              <p className="text-sm font-medium">Distance</p>
              <p className="text-sm text-muted-foreground">
                {booking.distance.toFixed(2)} Kms
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            <div>
              <p className="text-sm font-medium">Load</p>
              <p className="text-sm text-muted-foreground">
                {booking.load} {booking.loadUnit}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Truck className="h-4 w-4" />
            <div>
              <p className="text-sm font-medium">Vehicle Type</p>
              <p className="text-sm text-muted-foreground">
                {booking.type.replace("_", " ")}
              </p>
            </div>
          </div>
        </div>
        {booking.transporter &&
          <div className="border-t pt-4">
            <p className="text-sm font-medium">Transporter Details</p>
            <p className="text-sm text-muted-foreground">
              {booking.transporter.companyName}
            </p>
            <p className="text-sm text-muted-foreground">
              {booking.transporter.companyAddress}
            </p>
          </div>}
        <div className=" flex justify-end ">
          {isPending &&
            <Button onClick={onEdit} size="sm">
              Edit Details
            </Button>}
        </div>
      </CardContent>
    </Card>
  );
}
