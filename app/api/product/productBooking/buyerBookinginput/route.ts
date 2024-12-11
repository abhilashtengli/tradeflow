import authOptions from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
const prisma = new PrismaClient();

const validateInput = z.object({
  shippingAddress: z.string(),
  productId: z.string(),
  quantity: z.number(),
  buyerConfirm: z.boolean(),
  productQuoteId: z.string()
});

const validateUpdateInput = z.object({
  productBookingId: z.string(),
  shippingAddress: z.string(),
  quantity: z.number(),
  buyerConfirm: z.boolean()
});

export async function POST(request: NextRequest) {
  console.log("reached be booking");

  try {
    // const buyerId = request.headers.get("x-user-id") as string;
    // const buyerId = (await request.headers.get("x-user-id")) as string;

    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Please login!" });
    }

    const buyerId = session?.user.id;

    const body = await request.json();
    console.log(body);

    const result = validateInput.safeParse(body);

    if (!result.success) {
      return NextResponse.json({
        message: "Invalid inputs",
        errors: result.error.errors
      });
    }

    const product = await prisma.product.findUnique({
      where: {
        id: body.productId
      }
    });
    if (!product) {
      return NextResponse.json({ message: "Product not found" });
    }

    const sellerId = product.userId;

    const data = await prisma.productBooking.create({
      data: {
        sellerId: sellerId,
        productId: body.productId,
        buyerId: buyerId,
        quantity: body.quantity,
        shippingAddress: body.shippingAddress,
        buyerConfirm: body.buyerConfirm
      }
    });
    const dataUpdate = await prisma.productQuote.update({
      where: {
        id: body.productQuoteId
      },
      data: {
        buyerBookingConfirmed: true
      }
    });
    return NextResponse.json({
      data: data,
      quote: dataUpdate
    });
  } catch (err) {
    return NextResponse.json({
      error: err
    });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const result = validateUpdateInput.safeParse(body);

    if (!result.success) {
      return NextResponse.json({
        message: "Invalid inputs",
        errors: result.error.errors
      });
    }

    const data = await prisma.productBooking.update({
      where: {
        id: body.productBookingId
      },
      data: {
        quantity: body.quantity,
        shippingAddress: body.shippingAddress,
        buyerConfirm: body.buyerConfirm
      }
    });
    return NextResponse.json({
      data: data
    });
  } catch (err) {
    return NextResponse.json({
      error: err
    });
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest) {
  try {
    // const userId = request.headers.get("x-user-id") as string;

    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Please login!" });
    }

    const userId = session?.user.id;

    const bookingData = await prisma.productBooking.findMany({
      where: {
        buyerId: userId
      }
    });
    if (!bookingData) {
      return NextResponse.json({
        message: "No bookings found"
      });
    }

    return NextResponse.json({
      data: bookingData
    });
  } catch (err) {
    return NextResponse.json({
      error: err
    });
  }
}
