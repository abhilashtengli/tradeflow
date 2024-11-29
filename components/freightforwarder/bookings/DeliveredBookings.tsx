import { Card, CardContent } from "@/components/ui/card"
import { Booking } from "../../../app/(pages)/freightForwarder/bookings/Booking"

type DeliveredBookingsProps = {
  bookings: Booking[]
}

export function DeliveredBookings({ bookings }: DeliveredBookingsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {bookings.map(booking => (
        <Card key={booking.id}>
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-2">Booking ID: {booking.bookingId}</h2>
            <p>Origin: {booking.origin}</p>
            <p>Destination: {booking.destination}</p>
            <p>Product: {booking.product}</p>
            <p>Product Unit: {booking.productUnit}</p>
            <p>Departure Date: {booking.departureDate?.toLocaleDateString()}</p>
            <p>Arrival Date: {booking.arrivalDate?.toLocaleDateString()}</p>
            <p>Load: {booking.load}</p>
            <p>No. of Containers: {booking.noOfContainers}</p>
            <p>Price: {booking.price}</p>
            <p>Container Type: {booking.containerType}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
