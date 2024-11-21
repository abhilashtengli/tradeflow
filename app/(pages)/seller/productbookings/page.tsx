/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon, Clock, DollarSign, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import axios from "axios";
import { baseUrl } from "@/app/config";

interface Booking {
  id: string;
  sellerId: string;
  productId: string;
  buyerId: string;
  quantity: number;
  shippingAddress: string;
  buyerConfirm: boolean;
  noOfDaystoDeliver: number | null;
  totalPrice: number | null;
  paymentStatus: string;
  bookingConfirm: boolean;
  isDispatched: boolean;
  isDelivered: boolean;
  containerTypeBooked: string | null;
  noOfContainersBooked: number | null;
  departureDate: Date | null;
  expectedArrivalDate: Date | null;
  product: { name: string; category: string; price: number };
  buyer: { name: string; quantity: number };
}

interface BookingCardProps {
  booking: Booking;
  onConfirm?: (id: string, data: BookingConfirmData) => void;
  onUpdateDispatch?: (id: string, data: Partial<Booking>) => void;
}

interface BookingConfirmData {
  noOfDaystoDeliver: number;
  totalPrice: number;
  paymentStatus: string;
  productBookingId: string;
  bookingConfirm: boolean;
  currency: string;
  billingAddress : string;
}
interface DeliveredProduct {
  id: string;
  buyer?: {
    id: string;
    country: string;
  };
  product?: {
    id: string;
    name: string;
  };
  quantity: number;
  paymentStatus: string;
  totalPrice: number;
  deliveredDate: Date | null;
  currency: string;
}

export default function ProductBookingDashboard() {
  const [loading, setLoading] = React.useState(true);
  const [bookings, setBookings] = React.useState<Booking[]>([]);
  const [delivered, setDelivered] = React.useState<DeliveredProduct[]>([]);

  React.useEffect(() => {
    const fetchProductBookings = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/product/productBooking/sellerBookingInput`
        );
        setBookings(response.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const fetchDeliveredProducts = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/product/productBooking/sellerBookingInput/deliveredProduct`
        );
        // console.log(response.data.data);
        setDelivered(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProductBookings();
    fetchDeliveredProducts();
  }, []);

  const handleConfirmBooking = (id: string, data: BookingConfirmData) => {
    setBookings(
      bookings.map((booking) =>
        booking.id === id
          ? { ...booking, ...data, bookingConfirm: true }
          : booking
      )
    );
  };

  const handleUpdateDispatch = (id: string, data: Partial<Booking>) => {
    setBookings(
      bookings.map((booking) =>
        booking.id === id ? { ...booking, ...data } : booking
      )
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Product Booking Dashboard</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue="pending" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
              <TabsTrigger value="dispatched">Dispatched</TabsTrigger>
            </TabsList>
            <TabsContent value="pending">
              {bookings
                .filter((b) => !b.bookingConfirm)
                .map((booking) => (
                  <BookingCard
                    key={booking.id}
                    booking={booking}
                    onConfirm={handleConfirmBooking}
                  />
                ))}
            </TabsContent>
            <TabsContent value="confirmed">
              {bookings
                .filter((b) => b.bookingConfirm && !b.isDispatched)
                .map((booking) => (
                  <BookingCard
                    key={booking.id}
                    booking={booking}
                    onUpdateDispatch={handleUpdateDispatch}
                  />
                ))}
            </TabsContent>
            <TabsContent value="dispatched">
              {bookings
                .filter((b) => b.isDispatched && !b.isDelivered)
                .map((booking) => (
                  <BookingCard
                    key={booking.id}
                    booking={booking}
                    onUpdateDispatch={handleUpdateDispatch}
                  />
                ))}
            </TabsContent>
          </Tabs>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Delivered Products</CardTitle>
              <CardDescription>Recently delivered products</CardDescription>
            </CardHeader>
            <CardContent>
              {delivered.map((product) => (
                <div key={product.id} className="mb-4 p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">
                      Product Name: {product.product?.name}
                    </span>
                    <span className="text-sm text-gray-500">
                      {/* {format(product.deliveredDate, "MMM d, yyyy")} */}
                    </span>
                  </div>
                  <div>Buyer ID : {product.buyer?.id}</div>
                  <div>Product ID : {product.product?.id}</div>
                  <div>
                    Country : {product.buyer?.country || "Not mentioned"}{" "}
                  </div>
                  <div>Quantity: {product.quantity}</div>
                  <div>Payment status: {product.paymentStatus}</div>
                  <div>Total Price : {product.currency} {product.totalPrice} /-</div>
                  <div>
                    Delivered on :
                    {product.deliveredDate
                      ? new Date(product.deliveredDate).toLocaleDateString()
                      : " No date set"}
                  </div>
                  <div></div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function BookingCard({ booking }: BookingCardProps) {
  const [departureDate, setDepartureDate] = React.useState<Date | null>(null);
  const [deliveredDate, setDeliveredDate] = React.useState<Date | null>();
  const [expectedArrivalDate, setExpectedArrivalDate] =
    React.useState<Date | null>(null);
  
  const handleConfirm = async (
    e: React.FormEvent<HTMLFormElement>,
    { id }: { id: string }
  ) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: BookingConfirmData = {
      noOfDaystoDeliver: Number(formData.get("noOfDaystoDeliver")),
      totalPrice: Number(formData.get("totalPrice")),
      paymentStatus: formData.get("paymentStatus") as string,
      billingAddress: formData.get("billingAddress") as string,
      productBookingId: id,
      bookingConfirm: true,
      currency: formData.get("currency") as string
    };

    //send data to backend
    try {
      const response = await axios.patch(
        `${baseUrl}/product/productBooking/sellerBookingInput/confirmBooking`,
        data
      );
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
    // onConfirm?.(booking.id, data);
  };

  const handleUpdateDispatch = async (
    e: React.FormEvent<HTMLFormElement>,
    { id }: { id: string }
  ) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      isDispatched: formData.get("isDispatched") === "on",
      isDelivered: formData.get("isDelivered") === "on",
      containerTypeBooked: formData.get("containerTypeBooked") as string,
      noOfContainersBooked: Number(formData.get("noOfContainersBooked")),
      productBookingId: id,
      departureDate: departureDate ? departureDate.toISOString() : null, // ISO format
      expectedArrivalDate: expectedArrivalDate
        ? expectedArrivalDate.toISOString()
        : null // ISO format
    };
    console.log(data);

    //send data to backend
    try {
      const response = await axios.patch(
        `${baseUrl}/product/productBooking/sellerBookingInput`,
        data
      );
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
    // onUpdateDispatch?.(booking.id, data );
  };

  const handleUpdateDelivery = async (
    e: React.FormEvent<HTMLFormElement>,
    { id }: { id: string }
  ) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      isDelivered: formData.get("isDelivered") === "on",
      productBookingId: id,
      paymentStatus: formData.get("paymentStatus") as string,
      deliveredDate: deliveredDate ? deliveredDate.toISOString() : null
    };
    console.log(data);

    try {
      const response = await axios.patch(
        `${baseUrl}/product/productBooking/sellerBookingInput/deliveryBookingInput`,
        data
      );
      console.log(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-lg">Booking ID: {booking.id}</CardTitle>
        <CardDescription className="text-zinc-600">
          <h2>Product</h2>
          <p>ID: {booking.productId}</p>
          <p>Name: {booking.product.name}</p>
          <p>Category: {booking.product.category}</p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Buyer Name</Label>
            <div>{booking.buyer?.name.toUpperCase()}</div>
          </div>
          <div>
            <Label>Quantity</Label>
            <div>{booking.quantity}</div>
          </div>
          <div className="col-span-2">
            <Label>Shipping Address</Label>
            <div className="flex items-center">
              <MapPin className="mr-2 h-4 w-4" />
              {booking.shippingAddress}
            </div>
          </div>
        </div>
        {!booking.bookingConfirm && (
          <form
            onSubmit={(e) => {
              handleConfirm(e, { id: booking.id });
            }}
            className="mt-4 space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="noOfDaystoDeliver">Days to Deliver</Label>
                <Input
                  id="noOfDaystoDeliver"
                  name="noOfDaystoDeliver"
                  type="number"
                  required
                />
              </div>
              <div>
                <Label htmlFor="totalPrice">Total Price</Label>
                <Input
                  id="totalPrice"
                  name="totalPrice"
                  type="number"
                  step="0.01"
                  required
                />
              </div>
              <div className="">
                <Label htmlFor="currency" className="">
                  Currency
                </Label>
                <Select name="currency" defaultValue="USD" required>
                  <SelectTrigger className="">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EURO">EUR</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                    <SelectItem value="INR">INR</SelectItem>
                    <SelectItem value="RUB">RUB</SelectItem>
                    <SelectItem value="CNY">CNY</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="paymentStatus">Payment Status</Label>
                <Select name="paymentStatus" defaultValue="PENDING">
                  <SelectTrigger>
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
              <div>
                <Label htmlFor="billingAddress">Billing Address </Label>
                <Input
                  id="billingAddress"
                  name="billingAddress"
                  type="text"
                  placeholder="ex : port land, India"
                  required
                />
              </div>
            </div>

            <Button type="submit">Confirm Booking</Button>
          </form>
        )}
        {booking.bookingConfirm && !booking.isDispatched && (
          <form
            onSubmit={(e) => {
              handleUpdateDispatch(e, { id: booking.id });
            }}
            className="mt-4 space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="isDispatched"
                  name="isDispatched"
                  // checked={booking.isDispatched}
                />
                <Label htmlFor="isDispatched">Dispatched</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="isDelivered"
                  name="isDelivered"
                  // checked={booking.isDelivered}
                />
                <Label htmlFor="isDelivered">Delivered</Label>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="containerTypeBooked">Container Type</Label>
                <Select
                  name="containerTypeBooked"
                  defaultValue={booking.containerTypeBooked || ""}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select container type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Type_20">20ft</SelectItem>
                    <SelectItem value="Type_40">40ft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="noOfContainersBooked">
                  Number of Containers
                </Label>
                <Input
                  id="noOfContainersBooked"
                  name="noOfContainersBooked"
                  type="number"
                  defaultValue={booking.noOfContainersBooked?.toString() || ""}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Departure Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !departureDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {departureDate ? (
                        format(departureDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      //@ts-ignore
                      selected={departureDate}
                      //@ts-ignore
                      onSelect={(date) => {
                        console.log("Selected Departure Date:", date);

                        setDepartureDate(date || null);
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Label>Expected Arrival Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !expectedArrivalDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {expectedArrivalDate ? (
                        format(expectedArrivalDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      //@ts-ignore
                      selected={expectedArrivalDate}
                      //@ts-ignore
                      onSelect={(date) => {
                        console.log("Selected arrival Date:", date);

                        setExpectedArrivalDate(date || null);
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <Button type="submit">Update Dispatch Details</Button>
          </form>
        )}
        {booking.bookingConfirm &&
          booking.isDispatched &&
          !booking.isDelivered && (
            <form
              onSubmit={(e) => {
                handleUpdateDelivery(e, { id: booking.id });
              }}
              className="mt-4 space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="isDispatched"
                    name="isDispatched"
                    checked={booking.isDispatched}
                  />
                  <Label htmlFor="isDispatched">Dispatched</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="isDelivered"
                    name="isDelivered"
                    defaultChecked={booking.isDelivered}
                  />
                  <Label htmlFor="isDelivered">Delivered</Label>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-x-4">
                <div>
                  <Label htmlFor="paymentStatus">Payment Status</Label>
                  <Select name="paymentStatus" defaultValue={booking.paymentStatus}>
                    <SelectTrigger>
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
                <div>
                  <Label>Delivered Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !deliveredDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {deliveredDate ? (
                          format(deliveredDate, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        //@ts-ignore
                        selected={deliveredDate}
                        //@ts-ignore
                        onSelect={setDeliveredDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <Button type="submit">Update Delivery Details</Button>
            </form>
          )}
      </CardContent>
      <CardFooter>
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center">
            <Clock className="mr-2 h-4 w-4" />
            <span>
              {booking.noOfDaystoDeliver
                ? `${booking.noOfDaystoDeliver} days to deliver`
                : "Pending confirmation"}
            </span>
          </div>
          <div className="flex items-center">
            <DollarSign className="mr-2 h-4 w-4" />
            <span>
              {booking.totalPrice
                ? `$${booking.totalPrice.toFixed(2)}`
                : "Price not set"}
            </span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

