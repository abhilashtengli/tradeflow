import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookingCard } from "./booking-card";

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

interface BookingManagementProps {
  bookings: Booking[];
}

export function BookingManagement({ bookings }: BookingManagementProps) {
  // Filter bookings based on their status
  const acceptedBookings = bookings.filter(
    booking =>
      booking.freightIsAccepted && !booking.dispatched && !booking.isDelivered
  );
  const dispatchedBookings = bookings.filter(
    booking => booking.dispatched && !booking.isDelivered
  );
  const deliveredBookings = bookings.filter(booking => booking.isDelivered);

  return (
    <div className="w-full px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Booking Management</h1>
      <Tabs defaultValue="accepted" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="accepted">Accepted Bookings</TabsTrigger>
          <TabsTrigger value="dispatched">Dispatched Bookings</TabsTrigger>
          <TabsTrigger value="delivered">Delivered Bookings</TabsTrigger>
        </TabsList>
        <TabsContent value="accepted">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {acceptedBookings.map(booking =>
              <BookingCard key={booking.id} booking={booking} />
            )}
            {acceptedBookings.length === 0 &&
              <p className="text-muted-foreground col-span-full text-center py-4">
                No accepted bookings found
              </p>}
          </div>
        </TabsContent>
        <TabsContent value="dispatched">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {dispatchedBookings.map(booking =>
              <BookingCard key={booking.id} booking={booking} />
            )}
            {dispatchedBookings.length === 0 &&
              <p className="text-muted-foreground col-span-full text-center py-4">
                No dispatched bookings found
              </p>}
          </div>
        </TabsContent>
        <TabsContent value="delivered">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {deliveredBookings.map(booking =>
              <BookingCard key={booking.id} booking={booking} />
            )}
            {deliveredBookings.length === 0 &&
              <p className="text-muted-foreground col-span-full text-center py-4">
                No delivered bookings found
              </p>}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
