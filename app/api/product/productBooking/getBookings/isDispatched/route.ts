import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// Get product by dynamic key-value
export async function GET(request: NextRequest) {
  try {
    const buyerId = (await request.headers.get("x-user-id")) as string;

    console.log("reached here bk");

    // Fetch products based on dynamic key-value
    const productBookings = await prisma.productBooking.findMany({
      where: {
        buyerId: buyerId,
        isDispatched: true,
        isDelivered: false
      },
      include: {
        product: true
      }
    });

    // If no product is found, return a message
    if (productBookings.length === 0) {
      return NextResponse.json({ message: "No Product found" });
    }

    return NextResponse.json({ data: productBookings }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({
      error: "Internal Server Error"
    });
  }
}
