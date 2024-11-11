// Create product , get All product , Update Product , delete Product

import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const prisma = new PrismaClient();

const CreateProduct = z.object({
  name: z.string().min(3),
  description: z.string(),
  category: z.string(),
  quantity: z.number().int().positive().min(0),
  price: z.number().positive(),
  country: z.string(),
  isAvailable: z.boolean()
});

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
