import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Booking } from "../../../app/(pages)/freightForwarder/bookings/Booking";
import axios from "axios";
import { baseUrl } from "@/app/config";
import { Label } from "@/components/ui/label";

type ConfirmedBookingsProps = {
  bookings: Booking[];
  updateBooking: (booking: Booking) => void;
};

export function ConfirmedBookings({
  bookings,
  updateBooking
}: ConfirmedBookingsProps) {
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);

  const handleEdit = (booking: Booking) => {
    setEditingBooking(booking);
  };

  const handleUpdate = async (booking: Booking) => {
    if (!editingBooking) return;
    const formattedArrivalDate =
      editingBooking.arrivalDate && editingBooking.arrivalDate instanceof Date
        ? editingBooking.arrivalDate.toISOString()
        : editingBooking.arrivalDate;

    // If departureDate is not null, convert to ISO string, else keep it null
    const formattedDepartureDate =
      editingBooking.departureDate &&
      editingBooking.departureDate instanceof Date
        ? editingBooking.departureDate.toISOString()
        : editingBooking.departureDate;

    try {
      const data = {
        containerType: editingBooking.containerType,
        noOfContainers: editingBooking.noOfContainers,
        arrivalDate: formattedArrivalDate,
        departureDate: formattedDepartureDate,
        load: editingBooking.load,
        bookingId: booking.id,
        currency: editingBooking.currency,
        price: editingBooking.price,
        paymentStatus: editingBooking.paymentStatus
      };
      console.log(data);

      const response = await axios.patch(
        `${baseUrl}/freight/freightBooking/userFreightForwarderInput`,
        data
      );
      console.log(response.data);

      if (response.status === 200) {
        updateBooking(editingBooking);
        setEditingBooking(null);
      }
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  };

  const handleDispatch = async (booking: Booking) => {
    try {
      const data = {
        bookingId: booking.id,
        dispatched : true
      }
      const response = await axios.patch(
        `${baseUrl}/freight/freightBooking/userFreightForwarderInput/freightDispatched`,
        data
      );
      console.log(response.data);
      
      if (response.status === 200) {
        updateBooking({ ...booking, dispatched
: true });
      }
    } catch (error) {
      console.error("Error dispatching booking:", error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {bookings.map((booking) => (
        <Card key={booking.id}>
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-2">
              Booking ID: {booking.id}
            </h2>
            {editingBooking?.id === booking.id ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <div className="space-y-4">
                  <div>
                    <Label
                      htmlFor="departureDate"
                      className="text-sm font-medium"
                    >
                      Departure Date
                    </Label>
                    <Input
                      id="departureDate"
                      type="date"
                      value={
                        editingBooking.departureDate
                          ? new Date(editingBooking.departureDate)
                              .toISOString()
                              .split("T")[0]
                          : ""
                      }
                      onChange={(e) =>
                        setEditingBooking({
                          ...editingBooking,
                          departureDate: new Date(e.target.value)
                        })
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="arrivalDate"
                      className="text-sm font-medium"
                    >
                      Arrival Date
                    </Label>
                    <Input
                      id="arrivalDate"
                      type="date"
                      value={
                        editingBooking.arrivalDate
                          ? new Date(editingBooking.arrivalDate)
                              .toISOString()
                              .split("T")[0]
                          : ""
                      }
                      onChange={(e) =>
                        setEditingBooking({
                          ...editingBooking,
                          arrivalDate: new Date(e.target.value)
                        })
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="load" className="text-sm font-medium">
                      Shipment Load
                    </Label>
                    <Input
                      id="load"
                      type="number"
                      value={editingBooking.load}
                      onChange={(e) =>
                        setEditingBooking({
                          ...editingBooking,
                          load: parseInt(e.target.value) || 0
                        })
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="containerType"
                      className="text-sm font-medium"
                    >
                      Type of Container
                    </Label>
                    <Select
                      value={editingBooking.containerType ?? "Type_20"}
                      onValueChange={(value) =>
                        setEditingBooking({
                          ...editingBooking,
                          containerType: value as "Type_20" | "Type_40"
                        })
                      }
                    >
                      <SelectTrigger id="containerType" className="mt-1">
                        <SelectValue placeholder="Container Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Type_20">20 ft</SelectItem>
                        <SelectItem value="Type_40">40 ft</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label
                      htmlFor="noOfContainers"
                      className="text-sm font-medium"
                    >
                      No. of containers
                    </Label>
                    <Input
                      id="noOfContainers"
                      type="number"
                      value={editingBooking.noOfContainers ?? ""}
                      onChange={(e) =>
                        setEditingBooking({
                          ...editingBooking,
                          noOfContainers: parseInt(e.target.value) || 0
                        })
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="price" className="text-sm font-medium">
                      Add price
                    </Label>
                    <Input
                      id="price"
                      placeholder="Ex  $ 999"
                      type="number"
                      value={editingBooking.price ?? ""}
                      onChange={(e) =>
                        setEditingBooking({
                          ...editingBooking,
                          price: parseInt(e.target.value)
                        })
                      }
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="currency" className="text-sm font-medium">
                      Select Currency
                    </Label>
                    <Select
                      onValueChange={(value) =>
                        setEditingBooking({
                          ...editingBooking,
                          currency: value
                        })
                      }
                    >
                      <SelectTrigger id="currency" className="mt-1">
                        <SelectValue placeholder="USD" />
                      </SelectTrigger>
                      <SelectContent>
                        {["USD", "EURO", "GBP", "INR", "RUB", "CNY"].map(
                          (curr) => (
                            <SelectItem key={curr} value={curr}>
                              {curr}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label
                      htmlFor="paymentStatus"
                      className="text-sm font-medium"
                    >
                      Payment Status
                    </Label>
                    <Select
                      name="paymentStatus"
                      defaultValue={booking.paymentStatus}
                      onValueChange={(value) =>
                        setEditingBooking({
                          ...editingBooking,
                          paymentStatus: value
                        })
                      }
                    >
                      <SelectTrigger id="paymentStatus" className="mt-1">
                        <SelectValue placeholder="Select payment status" />
                      </SelectTrigger>
                      <SelectContent>
                        {["PENDING", "PAID", "CANCELLED"].map(
                          (paymentStatus) => (
                            <SelectItem
                              key={paymentStatus}
                              value={paymentStatus}
                            >
                              {paymentStatus}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <p>Origin: {booking.origin}</p>
                <p>Destination: {booking.destination}</p>
                <p>Product: {booking.product}</p>
                <p>Product Unit: {booking.productUnit}</p>
                <p>
                  Price:{" "}
                  {booking.price ? (
                    <span className=" text-green-600 font-semibold">
                      {booking.price}{" "}
                      <span className="text-black text-sm font-normal">
                        {booking.currency}{" "}
                      </span>
                    </span>
                  ) : (
                    <span className="font-semibold text-red-500">
                      Price not yet set
                    </span>
                  )}
                </p>
                <p>
                  Payment status:{" "}
                  {booking.paymentStatus === "PAID" ? (
                    <span className="font-semibold text-green-500">
                      {booking.paymentStatus}
                    </span>
                  ) : (
                    <span className="font-semibold text-red-500">
                      {booking.paymentStatus}
                    </span>
                  )}
                </p>
                <p>
                  Departure Date:{" "}
                  {booking.departureDate &&
                  !isNaN(new Date(booking.departureDate).getTime())
                    ? new Date(booking.departureDate).toLocaleDateString()
                    : "Date not set"}
                </p>
                <p>
                  Arrival Date:{" "}
                  {booking.arrivalDate &&
                  !isNaN(new Date(booking.arrivalDate).getTime())
                    ? new Date(booking.arrivalDate).toLocaleDateString()
                    : "Date not set"}
                </p>
                <p>Load: {booking.load}</p>
                <p>No. of Containers: {booking.noOfContainers}</p>
                <p>
                  Container Type:{" "}
                  {booking.containerType === "Type_20"
                    ? "20 ft"
                    : booking.containerType === "Type_40"
                    ? "40 ft"
                    : "Unknown"}
                </p>
              </>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            {editingBooking?.id === booking.id ? (
              <div className="flex gap-2">
                {/* Update Button */}
                <Button onClick={() => handleUpdate(booking)}>Update</Button>
                {/* Cancel Button */}
                <Button
                  variant="outline"
                  onClick={() => setEditingBooking(null)}
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <Button onClick={() => handleEdit(booking)}>Edit</Button>
            )}
            <div className="flex flex-col">
              <Button
                onClick={() => handleDispatch(booking)}
                disabled={!booking.price || booking.paymentStatus === "PENDING" || booking.paymentStatus === "CANCELLED"}
              >
                Dispatch
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
