import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const validateInput = z.object({
  producId: z.string()
});

const prisma = new PrismaClient();

// request quote (create quote by first giving about buyer info)
export async function POST(request: NextRequest) {
  try {
    const buyerId = (await request.headers.get("x-user-id")) as string;

    const body = await request.json();
    const { success } = validateInput.safeParse(body);

    if (!success) {
      return NextResponse.json({ message: " Invalid input" });
    }
    const product = await prisma.product.findUnique({
      where: { id: body.productId },
      select: {
        userId: true // Get the seller's userId
      }
    });

    if (!product || !product.userId) {
      return NextResponse.json({
        message: "Product or seller not found"
      });
    }

    const sellerId = product.userId;

    const data = await prisma.productQuote.create({
      data: {
        productId: body.productId,
        sellerId: sellerId,
        buyerId: buyerId
      }
    });

    return NextResponse.json({
      data: data
    });
  } catch (err) {
    return NextResponse.json({ error: err });
  }
}

export async function GET(request: NextRequest) {
  try {
    const buyerId = (await request.headers.get("x-user-id")) as string;

    const QuoteData = await prisma.productQuote.findMany({
      where: {
        sellerId: buyerId
      }
    });
    return NextResponse.json({
      data: QuoteData
    });
  } catch (err) {
    return NextResponse.json({
      error: err
    });
  }
}
