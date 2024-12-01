import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

interface FreightBookingFormProps {
  onSubmit: (data: FreightBookingData) => void;
}

export interface FreightBookingData {
  origin: string;
  destination: string;
  departureDate: string;
  userId: string;
  load: string;
  noOfContainers: string;
  containerType: string;
  productUnit: string;
}

export function FreightBookingForm({ onSubmit }: FreightBookingFormProps) {
  const [formData, setFormData] = useState<FreightBookingData>({
    origin: "",
    destination: "",
    departureDate: "",
    userId: "",
    load: "",
    noOfContainers: "",
    containerType: "",
    productUnit: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Freight Booking Details</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Freight Booking Details</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="origin">Origin</Label>
              <Input
                id="origin"
                name="origin"
                value={formData.origin}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="destination">Destination</Label>
              <Input
                id="destination"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="departureDate">Departure Date</Label>
            <Input
              id="departureDate"
              name="departureDate"
              type="date"
              value={formData.departureDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="userId">User ID</Label>
            <Input
              id="userId"
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="load">Load</Label>
              <Input
                id="load"
                name="load"
                value={formData.load}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="noOfContainers">No. of Containers</Label>
              <Input
                id="noOfContainers"
                name="noOfContainers"
                type="number"
                value={formData.noOfContainers}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="containerType">Container Type</Label>
              <Input
                id="containerType"
                name="containerType"
                value={formData.containerType}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="productUnit">Product Unit</Label>
              <Input
                id="productUnit"
                name="productUnit"
                value={formData.productUnit}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
