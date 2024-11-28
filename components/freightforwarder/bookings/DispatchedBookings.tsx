import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Booking } from "../../../app/(pages)/freightForwarder/bookings/Booking"
import axios from "axios"
import { baseUrl } from "@/app/config"

type DispatchedBookingsProps = {
  bookings: Booking[]
  updateBooking: (booking: Booking) => void
}

export function DispatchedBookings({ bookings, updateBooking }: DispatchedBookingsProps) {
  const handleDeliver = async (booking: Booking) => {
    try {
      const response = await axios.patch(`${baseUrl}/freight/booking/${booking.id}`, {
        isDelivered: true
      })
      if (response.status === 200) {
        updateBooking({ ...booking, isDelivered: true })
      }
    } catch (error) {
      console.error("Error marking booking as delivered:", error)
    }
  }

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
          <CardFooter>
            <Button onClick={() => handleDeliver(booking)}>Mark as Delivered</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

