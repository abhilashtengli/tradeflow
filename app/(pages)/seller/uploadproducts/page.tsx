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

export default function ProductForm() {
  const [product, setProduct] = React.useState({
    name: "",
    description: "",
    category: "",
    quantity: "",
    price: "",
    unit: "",
    country: "",
    productOrigin: "",
    isAvailable: false
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted product:", product);
    // Handle form submission logic here
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

            <div className="flex items-center space-x-2">
              <Switch
                id="isAvailable"
                name="isAvailable"
                checked={product.isAvailable}
                onCheckedChange={checked =>
                  setProduct(prev => ({ ...prev, isAvailable: checked }))}
              />
              <Label htmlFor="isAvailable">Available</Label>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button type="submit" onClick={handleSubmit}>
          Add Product
        </Button>
      </CardFooter>
    </Card>
  );
}
