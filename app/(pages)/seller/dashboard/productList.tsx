"use client";

import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { EditProductDialog } from "./editProductDialog";
import { Product } from "@/app/types/sellerTypes";
import { useSession } from "next-auth/react";
import axios from "axios";
import { baseUrl } from "@/app/config";

interface ProductsListProps {
  products: Product[];
  //   onUpdate: (updatedProduct: Product) => Promise<void>;
  onDelete: (productId: string) => Promise<void>;
}

export function ProductsList({ products, onDelete }: ProductsListProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const token = session?.accessToken;

  const handleEdit = async (product: Product) => {
    setSelectedProduct(product);
    //   console.log("Edit", product);

    setIsEditOpen(true);
  };

  const handleDelete = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteOpen(true);
  };

  const handleUpdate = async (updatedProduct: Product) => {
    try {
      setIsLoading(true);
      //   console.log(updatedProduct);

      const data = {
        productId: updatedProduct.id,
        name: updatedProduct.name,
        productOrigin: updatedProduct.productOrigin,
        description: updatedProduct.description,
        quantity: Number(updatedProduct.quantity),
        price: Number(updatedProduct.price),
        unit: updatedProduct.unit,
        country: updatedProduct.country,
        isAvailable: updatedProduct.isAvailable,
        currency: updatedProduct.currency,
        category: updatedProduct.category
      };

      const response = await axios.patch(`${baseUrl}/product`, data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.data.message === "success") {
        setIsEditOpen(false);
        toast({
          title: "Product updated",
          description: "The product has been updated successfully."
        });
      }
      console.log("Final Data", response);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast({
        title: "Error",
        description:
          "An error occurred while updating the product. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedProduct) return;

    try {
      setIsLoading(true);
      await onDelete(selectedProduct.id);
      setIsDeleteOpen(false);
      toast({
        title: "Product deleted",
        description: "The product has been deleted successfully."
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast({
        title: "Error",
        description:
          "An error occurred while deleting the product. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                {product.name}
              </CardTitle>
              <CardDescription>{product.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category:</span>
                  <span className="font-medium">{product.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Quantity:</span>
                  <span className="font-medium">
                    {product.quantity} {product.unit}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Price:</span>
                  <span className="font-medium">
                    {product.currency} {product.price} / {product.unit}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Origin:</span>
                  <span className="font-medium">
                    {product.productOrigin}, {product.country}
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleEdit(product)}
              >
                <Pencil className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(product)}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <EditProductDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        product={selectedProduct}
        onSubmit={handleUpdate}
        isLoading={isLoading}
      />

      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              product from the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              disabled={isLoading}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isLoading ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
