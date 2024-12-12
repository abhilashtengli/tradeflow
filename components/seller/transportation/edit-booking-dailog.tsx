"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Booking } from "@/app/types/booking";

const indianDistricts = [
  "Agra",
  "Ahmedabad",
  "Amritsar",
  "Bengaluru",
  "Bhubaneswar",
  "Chandigarh",
  "Chennai",
  "Coimbatore",
  "Dehradun",
  "Delhi",
  "Hyderabad",
  "Jaipur",
  "Kochi",
  "Kolkata",
  "Lucknow",
  "Mumbai",
  "Mysuru",
  "Pune",
  "Raipur",
  "Ranchi",
  "Surat",
  "Thiruvananthapuram",
  "Vadodara",
  "Varanasi",
  "Visakhapatnam"
];
const indianPorts = [
  "Kolkata Port, West Bengal.",
  "Paradip Port, Orissa.",
  "Visakhapatnam Port, Andhra Pradesh.",
  "Kamarajar Port, Tamil Nadu.",
  "Chennai Port, Tamil Nadu.",
  "Tuticorin Port, Tamil Nadu.",
  "Cochin Port, Kerala.",
  "New Mangalore Port, Karnataka.",
  "Kandla Port, Gujarat",
  "Mundra Port, Gujarat",
  "Pipavav Port, Gujarat",
  "Dahej Port, Gujarat",
  "Hazira Port, Gujarat",
  "Jawaharlal Nehru Port, Maharashtra",
  "Mumbai Port, Maharashtra"
];

interface EditBookingDialogProps {
  booking: Booking;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdate: (bookingId: string, data: Partial<Booking>) => Promise<void>;
}

export function EditBookingDialog({
  booking,
  open,
  onOpenChange,
  onUpdate
}: EditBookingDialogProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      type: formData.get("type") as string,
      origin: formData.get("origin") as string,
      destination: formData.get("destination") as string,
      load: Number(formData.get("load")),
      loadUnit: formData.get("loadUnit") as string
    };

    try {
      await onUpdate(booking.id, data);
      toast({
        title: "Success",
        description: "Booking details updated successfully"
      });
      onOpenChange(false);
    } catch (error) {
      console.log(error);

      toast({
        title: "Error",
        description: "Failed to update booking details",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Transportation Details</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Vehicle Type</label>
            <Select name="type" defaultValue={booking.type}>
              <SelectTrigger>
                <SelectValue placeholder="Select vehicle type" />
              </SelectTrigger>
              <SelectContent className="h-80">
                <SelectItem value="Flatbed_Truck">Flatbed Truck</SelectItem>
                <SelectItem value="Refrigerated_Truck">
                  Refrigerated Truck
                </SelectItem>
                <SelectItem value="Box_Truck">Box Truck</SelectItem>
                <SelectItem value="Tow_Truck"> Tow_Truck</SelectItem>
                <SelectItem value="Pickup_Truck">Pickup Truck</SelectItem>
                <SelectItem value="Car_Carrier_Truck">
                  Car Carrier Truck
                </SelectItem>
                <SelectItem value="Heavy_Hauler">Heavy Hauler</SelectItem>
                <SelectItem value="Curtain_Side_Truck">
                  Curtain Side Truck
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Origin</label>
            <Select name="origin" defaultValue={booking.origin}>
              <SelectTrigger>
                <SelectValue placeholder="Select origin" />
              </SelectTrigger>
              <SelectContent className="h-80">
                {indianDistricts.map(district =>
                  <SelectItem key={district} value={district}>
                    {district}
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Destination</label>
            <Select name="destination" defaultValue={booking.destination}>
              <SelectTrigger>
                <SelectValue placeholder="Select destination" />
              </SelectTrigger>
              <SelectContent>
                {indianPorts.map(ports =>
                  <SelectItem key={ports} value={ports}>
                    {ports}
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-4">
            <div className="flex-1 space-y-2">
              <label className="text-sm font-medium">Load</label>
              <Input
                type="number"
                name="load"
                defaultValue={booking.load}
                min="0"
              />
            </div>
            <div className="w-[100px] space-y-2">
              <label className="text-sm font-medium">Unit</label>
              <Select name="loadUnit" defaultValue={booking.loadUnit}>
                <SelectTrigger>
                  <SelectValue placeholder="Unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tons">Tons</SelectItem>
                  <SelectItem value="Kilograms">Kilograms</SelectItem>
                  <SelectItem value="Pounds">Pounds</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Updating..." : "Submit Transportation Details"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
