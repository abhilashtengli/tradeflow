/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import {
  Bell,
  Package,
  FileText,
  ShoppingCart,
  Upload,
  User,
  Search,
  MoreVertical
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

export default function Dashboard() {
  // Mock data for products
  const products = [
    {
      id: 1,
      name: "Premium Widget",
      price: 99.99,
      stock: 50,
      image: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Deluxe Gadget",
      price: 149.99,
      stock: 30,
      image: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Super Tool",
      price: 79.99,
      stock: 100,
      image: "/placeholder.svg"
    },
    {
      id: 4,
      name: "Mega Device",
      price: 199.99,
      stock: 20,
      image: "/placeholder.svg"
    },
    {
      id: 5,
      name: "Ultra Appliance",
      price: 299.99,
      stock: 15,
      image: "/placeholder.svg"
    },
    {
      id: 6,
      name: "Fantastic Product",
      price: 89.99,
      stock: 75,
      image: "/placeholder.svg"
    }
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-800">TradeFlow</h1>
        </div>
        <nav className="mt-6">
          <Link
            href="/dashboard"
            className="block py-2 px-4 text-gray-700 bg-gray-200 hover:bg-gray-300"
          >
            <Package className="inline-block mr-2" size={20} />
            Dashboard
          </Link>
          <Link
            href="/quotations"
            className="block py-2 px-4 text-gray-700 hover:bg-gray-200"
          >
            <FileText className="inline-block mr-2" size={20} />
            Quotations
          </Link>
          <Link
            href="/bookings"
            className="block py-2 px-4 text-gray-700 hover:bg-gray-200"
          >
            <ShoppingCart className="inline-block mr-2" size={20} />
            Product Bookings
          </Link>
          <Link
            href="/upload"
            className="block py-2 px-4 text-gray-700 hover:bg-gray-200"
          >
            <Upload className="inline-block mr-2" size={20} />
            Upload Products
          </Link>
          <Link
            href="/profile"
            className="block py-2 px-4 text-gray-700 hover:bg-gray-200"
          >
            <User className="inline-block mr-2" size={20} />
            Profile
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate">
              Seller Dashboard
            </h2>
            <div className="flex items-center">
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 rounded-full"
                />
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
              </div>
              <Button variant="ghost" size="icon" className="ml-4">
                <Bell size={20} />
              </Button>
              <Avatar className="ml-4">
                <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                <AvatarFallback>US</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Product Listings */}
            <div className="lg:w-3/4">
              <h3 className="text-lg font-semibold mb-4">Listed Products</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map(product =>
                  <Card key={product.id}>
                    <CardHeader className="p-4">
                      <img
                        src="https://plus.unsplash.com/premium_photo-1661769750859-64b5f1539aa8?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZHVjdCUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D"
                        alt=""
                        className="w-full h-48 object-cover rounded-md"
                      />
                    </CardHeader>
                    <CardContent>
                      <h4 className="font-semibold">
                        {product.name}
                      </h4>
                      <p className="text-sm text-gray-500">
                        Price: ${product.price}
                      </p>
                      <p className="text-sm text-gray-500">
                        Stock: {product.stock}
                      </p>
                      <div className="mt-2 flex justify-between items-center">
                        <Button size="sm">Edit</Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical size={16} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Update Stock</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              Remove Listing
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>

            {/* Summary Stats */}
            <div className="lg:w-1/4">
              <h3 className="text-lg font-semibold mb-4">Summary</h3>
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Total Products</CardTitle>
                    <CardDescription>
                      Your current product inventory
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">
                      {products.length}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Pending Quotations</CardTitle>
                    <CardDescription>
                      Quotations awaiting your response
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">7</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Active Bookings</CardTitle>
                    <CardDescription>Current product bookings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">13</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
