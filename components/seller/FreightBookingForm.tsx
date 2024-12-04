import { useState, useRef } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import axios from "axios";
import { baseUrl } from "@/app/config";

interface FreightBookingFormProps {
  onSubmit: (data: FreightBookingData) => void;
}

export interface FreightBookingData {
  id: string;
  origin: string;
  destination: string;
  departureDate: string;
  load: string;
  loadUnit: string;
  noOfContainers: string;
  containerType: string;
  product: string;
  productUnit: string;
}

export function FreightBookingForm({ onSubmit }: FreightBookingFormProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [formData, setFormData] = useState<FreightBookingData>({
    id: "",
    origin: "",
    destination: "",
    departureDate: "",
    load: "",
    loadUnit: "",
    noOfContainers: "",
    containerType: "",
    product: "",
    productUnit: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      origin: formData.origin,
      destination: formData.destination,
      product: formData.product,
      productUnit: formData.productUnit,
      departureDate: formData.departureDate
        ? formData.departureDate.toString()
        : null,
      load: Number(formData.load),
      loadUnit: formData.loadUnit,
      noOfContainers: Number(formData.noOfContainers),
      containerType: formData.containerType
    };
    try {
      const response = await axios.post(
        `${baseUrl}/freight/freightBooking/userInput`,
        data
      );

      console.log(response.data);
      onSubmit(formData);

      setOpen(false);
    } catch (err) {
      console.log("Could not set Freight Booking details", err);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" ref={triggerRef}>
          Freight Booking Details
        </Button>
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
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="load">Load</Label>
              <Input
                type="number"
                id="load"
                name="load"
                value={formData.load}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="loadUnit">Load Unit</Label>
              <Select
                onValueChange={handleSelectChange("loadUnit")}
                value={formData.loadUnit}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pcs">pcs</SelectItem>
                  <SelectItem value="box">box</SelectItem>
                  <SelectItem value="kg">kg</SelectItem>
                  <SelectItem value="tons">tons</SelectItem>
                  <SelectItem value="meter">meter</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
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
            <div className="space-y-2">
              <Label htmlFor="containerType">Container Type</Label>
              <Select
                onValueChange={handleSelectChange("containerType")}
                value={formData.containerType}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Type_20">20 feet</SelectItem>
                  <SelectItem value="Type_40">40 feet</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="product">Product Name</Label>
              <Input
                type="text"
                id="product"
                name="product"
                value={formData.product}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="productUnit">Product Unit</Label>
              <Select
                onValueChange={handleSelectChange("productUnit")}
                value={formData.productUnit}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pcs">pcs</SelectItem>
                  <SelectItem value="box">box</SelectItem>
                  <SelectItem value="kg">kg</SelectItem>
                  <SelectItem value="grams">grams</SelectItem>
                  <SelectItem value="tons">tons</SelectItem>
                  <SelectItem value="cm">cm</SelectItem>
                  <SelectItem value="meter">meter</SelectItem>
                  <SelectItem value="inch">inch</SelectItem>
                  <SelectItem value="feet">feet</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button type="submit">Submit</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
