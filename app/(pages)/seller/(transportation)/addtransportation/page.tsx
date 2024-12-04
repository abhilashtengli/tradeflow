"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { Info, Truck, MapPin, Package2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import axios from "axios";
import { baseUrl } from "@/app/config";

// Indian districts data (sample)
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
  "New Mangalore Port, Karnataka."
];
const formSchema = z.object({
  type: z.enum([
    "Flatbed_Truck",
    "Box_Truck",
    "Pickup_Truck",
    "Refrigerated_Truck",
    "Car_Carrier_Truck",
    "Tow_Truck",
    "Heavy_Hauler",
    "Curtain_Side_Truck"
  ]),
  origin: z.string().refine((val) => indianDistricts.includes(val), {
    message: "Please select a valid Indian district"
  }),
  destination: z.string().refine((val) => indianDistricts.includes(val), {
    message: "Please select a valid Indian district"
  }),
  load: z.number().positive(),
  loadUnit: z.enum(["tons", "Kilograms", "Pounds"])
});

export default function TransportationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "Flatbed_Truck",
      origin: "",
      destination: "",
      load: 0,
      loadUnit: "tons"
    }
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    // Simulating API call
    const response = await axios.post(`${baseUrl}/`)
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(values);
    setIsSubmitting(false);
    toast({
      title: "Success",
      description: "Transportation details submitted successfully."
    });
    form.reset();
  }

  return (
    <div className="w-full flex justify-center py-20 mt-12">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Info className="w-5 h-5 text-muted-foreground" />
            <CardTitle>Transportation Details</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid gap-6">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center space-x-2">
                        <Truck className="w-4 h-4" />
                        <span>Vehicle Type</span>
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select a vehicle type" />
                          </SelectTrigger>
                        </FormControl>
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
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="origin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4" />
                          <span>Origin</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="h-12">
                              <SelectValue placeholder="Select origin" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {indianDistricts.map((district) => (
                              <SelectItem key={district} value={district}>
                                {district}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex items-end gap-4">
                    <div className="flex-1">
                      <FormField
                        control={form.control}
                        name="destination"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center space-x-2">
                              <MapPin className="w-4 h-4" />
                              <span>Destination</span>
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="h-12">
                                  <SelectValue placeholder="Select destination" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {indianPorts.map((district) => (
                                  <SelectItem key={district} value={district}>
                                    {district}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="load"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center space-x-2">
                          <Package2 className="w-4 h-4" />
                          <span>Load</span>
                        </FormLabel>
                        <FormControl>
                          <div className="flex space-x-4">
                            <Input
                              type="number"
                              className="h-12"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseFloat(e.target.value))
                              }
                            />
                            <Select
                              defaultValue={form.getValues("loadUnit")}
                              onValueChange={(value) =>
                                form.setValue(
                                  "loadUnit",
                                  value as "tons" | "Kilograms" | "Pounds"
                                )
                              }
                            >
                              <FormControl>
                                <SelectTrigger className="w-[120px] h-12">
                                  <SelectValue placeholder="Unit" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="tons">Tons</SelectItem>
                                <SelectItem value="Kilograms">
                                  Kilograms
                                </SelectItem>
                                <SelectItem value="Pounds">Pounds</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "w-full h-12",
                  isSubmitting && "opacity-50 cursor-not-allowed"
                )}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Transportation Details"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
