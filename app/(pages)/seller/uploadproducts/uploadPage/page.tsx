"use client";

import * as React from "react";
import { Box, DollarSign, Globe, Package, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import axios from "axios";
import { baseUrl } from "@/app/config";
import { useSession } from "next-auth/react";

export default function ProductForm() {
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState<string[]>([]);

  const initialProductState = {
    name: "",
    description: "",
    category: "",
    quantity: "",
    price: "",
    unit: "",
    country: "",
    productOrigin: "",
    isAvailable: false,
    currency: ""
  };

  // Set initial product state
  const [product, setProduct] = React.useState(initialProductState);
  const [productAdded, setProductAdded] = React.useState(false);
  
  const { data: session } = useSession();
  const token = session?.accessToken;
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();

    // Check for missing fields
    const requiredFields: (keyof typeof product)[] = [
      "name",
      "description",
      "category",
      "quantity",
      "price",
      "unit",
      "country",
      "productOrigin"
    ];

    const missingFields = requiredFields.filter(field => !product[field]);

    if (missingFields.length > 0) {
      setErrors(missingFields); // Store errors in state
      setLoading(false);
      return;
    }

    setErrors([]);
    console.log(product);

    const productData = {
      ...product, // Convert quantity and price to numbers
      quantity: Number(product.quantity) || 0,
      price: Number(product.price) || 0
    }; // Fallback to 0 if invalid input // Fallback to 0 if invalid input

    try {
      const response = await axios.post(`${baseUrl}/product`, productData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response);
    } catch (err) {
      console.log("could not send data ", { error: err });
    }
    setProductAdded(true);
    setTimeout(() => {
      setProductAdded(false);
      setProduct(initialProductState);
    }, 4000);
    setLoading(false);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto my-2">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Add New Product</CardTitle>
        <CardDescription>
          Fill in the details to add a new product to your inventory.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Product Name</Label>
              <div className="relative">
                <Tag
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  size={16}
                />
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter product name"
                  value={product.name}
                  onChange={handleChange}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Enter product description"
                value={product.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <div className="relative">
                  <Box
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    size={16}
                  />
                  <Input
                    id="category"
                    name="category"
                    placeholder="Enter product category"
                    value={product.category}
                    onChange={handleChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="quantity">Quantity</Label>
                <div className="relative">
                  <Package
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    size={16}
                  />
                  <Input
                    id="quantity"
                    name="quantity"
                    type="number"
                    placeholder="Enter quantity"
                    value={product.quantity}
                    onChange={handleChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price">Price</Label>
                <div className="relative">
                  <DollarSign
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    size={16}
                  />
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    placeholder="Enter price"
                    value={product.price}
                    onChange={handleChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="currency" className="">
                  Currency
                </Label>
                <Select // defaultValue="USD"
                  required
                  onValueChange={value =>
                    setProduct(prev => ({
                      ...prev,
                      currency: value
                    }))}
                >
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
              <div className="grid gap-2">
                <Label htmlFor="unit">Unit</Label>
                <Select
                  onValueChange={value =>
                    setProduct(prev => ({
                      ...prev,
                      unit: value
                    }))}
                  required
                >
                  <SelectTrigger id="unit">
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "pcs",
                      "box",
                      "kg",
                      "grams",
                      "tons",
                      "cm",
                      "meter",
                      "inche",
                      "feet"
                    ].map(unit =>
                      <SelectItem key={unit} value={unit}>
                        {unit}
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="country">Country</Label>
                <div className="relative">
                  <Globe
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    size={16}
                  />
                  <Input
                    id="country"
                    name="country"
                    placeholder="Enter country"
                    value={product.country}
                    onChange={handleChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="productOrigin">Product Origin</Label>
                <div className="relative">
                  <Globe
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    size={16}
                  />
                  <Input
                    id="productOrigin"
                    name="productOrigin"
                    placeholder="Enter product origin"
                    value={product.productOrigin}
                    onChange={handleChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 ">
              <Switch
                id="isAvailable"
                name="isAvailable"
                checked={product.isAvailable}
                onCheckedChange={checked =>
                  setProduct(prev => ({ ...prev, isAvailable: checked }))}
              />
              <Label htmlFor="isAvailable">Available</Label>
              {errors.length > 0 &&
                <div className="text-red-500">
                  Please fill in the Missing fields
                </div>}

              {productAdded &&
                <div className="text-green-500 font-semibold">
                  {product.name} added successfully!
                </div>}
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          type="submit"
          onClick={handleSubmit}
          className={`${loading ? "bg-gray-600" : ""}`}
        >
          {loading ? "adding product..." : "Add product"}
        </Button>
      </CardFooter>
    </Card>
  );
}
