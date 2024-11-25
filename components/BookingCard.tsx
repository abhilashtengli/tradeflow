import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, PackageIcon, TruckIcon } from "lucide-react";

interface Booking {
  id: string;
  orderDate: string;
  product: { name: string };
  quantity: number;
  totalPrice: number;
  shippingAddress: string;
  expectedArrivalDate?: string;
  deliveredDate?: string;
  currency?: string;
}

interface BookingCardProps {
  booking: Booking;
  status: "Pending" | "Confirmed" | "Dispatched" | "Delivered";
}

export function BookingCard({ booking, status }: BookingCardProps) {
  const statusColor = {
    Pending: "bg-yellow-100 text-yellow-800",
    Confirmed: "bg-blue-100 text-blue-800",
    Dispatched: "bg-purple-100 text-purple-800",
    Delivered: "bg-green-100 text-green-800"
  }[status];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>
            {booking.product.name}
          </span>
          <Badge className={statusColor}>
            {status}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center">
            <PackageIcon className="mr-2 h-4 w-4" />
            <span>
              Quantity: {booking.quantity}
            </span>
          </div>
          <div className="flex items-center">
            <CalendarIcon className="mr-2 h-4 w-4" />
            <span>
              Order Date: {new Date(booking.orderDate).toLocaleDateString()}
            </span>
          </div>
          {(status === "Dispatched" || status === "Delivered") &&
            booking.expectedArrivalDate &&
            <div className="flex items-center">
              <TruckIcon className="mr-2 h-4 w-4" />
              <span>
                Expected Arrival:{" "}
                {new Date(booking.expectedArrivalDate).toLocaleDateString()}
              </span>
            </div>}
          {status === "Delivered" &&
            booking.deliveredDate &&
            <div className="flex items-center">
              <CalendarIcon className="mr-2 h-4 w-4" />
              <span>
                Delivered Date:{" "}
                {new Date(booking.deliveredDate).toLocaleDateString()}
              </span>
            </div>}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <span>
          Total Price: {booking.currency} {booking.totalPrice.toFixed(2)}
        </span>
      </CardFooter>
    </Card>
  );
}
