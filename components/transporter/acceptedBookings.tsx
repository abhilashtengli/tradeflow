import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

interface Booking {
  id: string;
  type: string;
  load: number;
  loadUnit: string;
  origin: string;
  destination: string;
  dispatched: boolean;
  delivered: boolean;
  paymentStatus: "PENDING" | "PAID" | "PARTIALLY_PAID" | "CANCELLED";
}

interface AcceptedBookingsProps {
  bookings: Booking[];
  onUpdate: (booking: Booking) => void;
}

export function AcceptedBookings({
  bookings,
  onUpdate
}: AcceptedBookingsProps) {
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);

  const handleEdit = (booking: Booking) => {
    setEditingBooking({ ...booking });
  };

  const handleSave = () => {
    if (!editingBooking?.type || !editingBooking.load) {
      alert("Please fill all required fields.");
      return;
    }
    if (editingBooking) {
      onUpdate(editingBooking);
      setEditingBooking(null);
    }
  };

  return (
    <div className="grid gap-6 mt-6">
      {bookings && bookings.length > 0 ?(
        bookings.map((booking) => (
          <Card key={booking.id} className="max-w-2xl ">
            <CardHeader>
              <CardTitle>Booking ID: {booking.id}</CardTitle>
            </CardHeader>
            <CardContent>
              {editingBooking && editingBooking.id === booking.id ? (
                <form className="space-y-4 max-w-md mx-auto">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="type">Type</Label>
                      <Select
                        value={editingBooking.type}
                        onValueChange={(value) =>
                          setEditingBooking({ ...editingBooking, type: value })
                        }
                        required
                      >
                        <SelectTrigger id="type">
                          <SelectValue placeholder="Select truck type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Flatbed_Truck">
                            Flatbed Truck
                          </SelectItem>
                          <SelectItem value="Box_Truck">Box Truck</SelectItem>
                          <SelectItem value="Pickup_Truck">
                            Pickup Truck
                          </SelectItem>
                          <SelectItem value="Refrigerated_Truck">
                            Refrigerated Truck
                          </SelectItem>
                          <SelectItem value="Car_Carrier_Truck">
                            Car Carrier Truck
                          </SelectItem>
                          <SelectItem value="Tow_Truck">Tow Truck</SelectItem>
                          <SelectItem value="Heavy_Hauler">
                            Heavy Hauler
                          </SelectItem>
                          <SelectItem value="Curtain_Side_Truck">
                            Curtain Side Truck
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="load">Load in {booking.loadUnit}</Label>
                      <Input
                        id="load"
                        value={editingBooking.load}
                        onChange={(e) =>
                          setEditingBooking({
                            ...editingBooking,
                            load: parseInt(e.target.value) || 0
                          })
                        }
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="paymentStatus">Payment Status</Label>
                      <Select
                        value={editingBooking.paymentStatus}
                        onValueChange={(
                          value:
                            | "PENDING"
                            | "PAID"
                            | "PARTIALLY_PAID"
                            | "CANCELLED"
                        ) =>
                          setEditingBooking({
                            ...editingBooking,
                            paymentStatus: value
                          })
                        }
                      >
                        <SelectTrigger id="paymentStatus">
                          <SelectValue placeholder="Select payment status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="PENDING">Pending</SelectItem>
                          <SelectItem value="PAID">Paid</SelectItem>
                          <SelectItem value="PARTIALLY_PAID">
                            Partially Paid
                          </SelectItem>
                          <SelectItem value="CANCELLED">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center mt-5 justify-center space-x-2">
                      <Switch
                        id="dispatched"
                        checked={!!editingBooking.dispatched}
                        onCheckedChange={(checked) =>
                          setEditingBooking({
                            ...editingBooking,
                            dispatched: checked
                          })
                        }
                      />
                      <Label htmlFor="dispatched">Dispatched</Label>
                    </div>
                  </div>
                </form>
              ) : (
                <div className="space-y-2">
                  <p>
                    <strong>Type:</strong> {booking.type}
                  </p>
                  <p>
                    <strong>Load:</strong> {booking.load} {booking.loadUnit}
                  </p>
                  <p>
                    <strong>Dispatched:</strong>{" "}
                    {booking.dispatched ? "Yes" : "No"}
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              {editingBooking && editingBooking.id === booking.id ? (
                <>
                  <Button
                    variant="outline"
                    onClick={() => setEditingBooking(null)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleSave}>Save</Button>
                </>
              ) : (
                <Button onClick={() => handleEdit(booking)}>Edit</Button>
              )}
            </CardFooter>
          </Card>
        ))
      ) : (
        <div className="flex mx-auto items-center justify-center text-3xl ">
          <h1 className="mt-32">There are no bookings as of now..🔸</h1>
        </div>
      )}
    </div>
  );
}
