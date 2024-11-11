// Create product , get All product , Update Product , delete Product

import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { CreateProduct } from "./productValidation/route";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { success } = CreateProduct.safeParse(body);

    if (!success) {
      return NextResponse.json({
        message: "Invalid parameters given"
      });
    }

    const newProduct = await prisma.product.create({
      data: {
        name: body.name,
        description: body.description,
        category: body.category,
        quantity: body.quantity,
        price: body.price,
        country: body.country,
        isAvailable: body.isAvailable,
        userId: "81720a24-1739-43e2-89a6-baff01d18cb5"
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
