import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Booking } from "../../../app/(pages)/freightForwarder/bookings/Booking"
import axios from "axios"
import { baseUrl } from "@/app/config"

type ConfirmedBookingsProps = {
  bookings: Booking[]
  updateBooking: (booking: Booking) => void
}

export function ConfirmedBookings({ bookings, updateBooking }: ConfirmedBookingsProps) {
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null)

  const handleEdit = (booking: Booking) => {
    setEditingBooking(booking)
  }

  const handleUpdate = async () => {
    if (!editingBooking) return

    try {
      const response = await axios.patch(`${baseUrl}/freight/booking/${editingBooking.id}`, editingBooking)
      if (response.status === 200) {
        updateBooking(editingBooking)
        setEditingBooking(null)
      }
    } catch (error) {
      console.error("Error updating booking:", error)
    }
  }

  const handleDispatch = async (booking: Booking) => {
    try {
      const response = await axios.patch(`${baseUrl}/freight/booking/${booking.id}`, {
        isDispatched: true
      })
      if (response.status === 200) {
        updateBooking({ ...booking, isDispatched: true })
      }
    } catch (error) {
      console.error("Error dispatching booking:", error)
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {bookings.map(booking => (
        <Card key={booking.id}>
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-2">Booking ID: {booking.bookingId}</h2>
            {editingBooking?.id === booking.id ? (
              <>
                <Input
                  type="date"
                  value={editingBooking.departureDate?.toISOString().split('T')[0]}
                  onChange={(e) => setEditingBooking({...editingBooking, departureDate: new Date(e.target.value)})}
                  className="mb-2"
                />
                <Input
                  type="date"
                  value={editingBooking.arrivalDate?.toISOString().split('T')[0]}
                  onChange={(e) => setEditingBooking({...editingBooking, arrivalDate: new Date(e.target.value)})}
                  className="mb-2"
                />
                <Input
                  type="number"
                  value={editingBooking.load}
                  onChange={(e) => setEditingBooking({...editingBooking, load: parseInt(e.target.value)})}
                  className="mb-2"
                />
                <Input
                  type="number"
                  value={editingBooking.noOfContainers}
                  onChange={(e) => setEditingBooking({...editingBooking, noOfContainers: parseInt(e.target.value)})}
                  className="mb-2"
                />
                <Input
                  type="number"
                  value={editingBooking.price}
                  onChange={(e) => setEditingBooking({...editingBooking, price: parseFloat(e.target.value)})}
                  className="mb-2"
                />
                <Select
                  value={editingBooking.containerType}
                  onValueChange={(value) => setEditingBooking({...editingBooking, containerType: value as 'Type_20' | 'Type_40'})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Container Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Type_20">20 ft</SelectItem>
                    <SelectItem value="Type_40">40 ft</SelectItem>
                  </SelectContent>
                </Select>
              </>
            ) : (
              <>
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
              </>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            {editingBooking?.id === booking.id ? (
              <Button onClick={handleUpdate}>Update</Button>
            ) : (
              <Button onClick={() => handleEdit(booking)}>Edit</Button>
            )}
            <Button onClick={() => handleDispatch(booking)}>Dispatch</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

