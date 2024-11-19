/* eslint-disable @next/next/no-img-element */
import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
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
    <div className="">
      <main>
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
