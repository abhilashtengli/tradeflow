// Create product , get All product , Update Product , delete Product

import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { CreateProduct } from "./productValidation/route";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const userId = "5dcb6f85-2f53-467c-b9d7-e4ff853b8d4a";
    const body = await request.json();

    const result = CreateProduct.safeParse(body);

    if (!result.success) {
      return NextResponse.json({
        message: "Invalid parameters given",
        errors: result.error.errors
      });
    }

    const isPresent = await prisma.product.findMany({
      where: {
        name: body.name,
        userId: userId
      }
    });
    if (isPresent) {
      return NextResponse.json({ message: "Product already exists" });
    }

    const newProduct = await prisma.product.create({
      data: {
        name: body.name,
        description: body.description,
        category: body.category,
        quantity: body.quantity,
        price: body.price,
        unit: body.unit,
        country: body.country,
        productOrigin: body.productOrigin,
        isAvailable: body.isAvailable,
        userId: "5dcb6f85-2f53-467c-b9d7-e4ff853b8d4a"
      }
    });

    return NextResponse.json(
      {
        product: newProduct
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ error: err });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();

    const product = await prisma.product.findUnique({
      where: {
        id: id
      }
    });
    if (!product) {
      return NextResponse.json(
        {
          message: "No product found"
        },
        { status: 400 }
      );
    }

    await prisma.product.delete({
      where: {
        id: product.id
      }
    });
    return NextResponse.json({
      message: "Product deleted successfully"
    });
  } catch (err) {
    return NextResponse.json({
      error: err
    });
  }
}

//Get all products
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest) {
  try {
    const products = await prisma.product.findMany();

    return NextResponse.json({
      products: products
    });
  } catch (err) {
    return NextResponse.json({
      error: err
    });
  }
}
