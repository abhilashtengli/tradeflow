import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// Get product by dynamic key-value
export async function GET() {
  try {
    console.log("reached here bk");

    // Fetch products based on dynamic key-value
    const productBookings = await prisma.productBooking.findMany({
      where: {
        buyerId: "5abd8eff-fb43-47d9-9a61-69291f3e5b42",
        isDelivered: true
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
