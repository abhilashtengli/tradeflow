import authOptions from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// Get product by dynamic key-value
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest) {
  try {
    console.log("reached here bk");
    // const buyerId = (await request.headers.get("x-user-id")) as string;

    const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Please login!" });
  }

  const buyerId = session?.user.id;

    // Fetch products based on dynamic key-value
    const productBookings = await prisma.productBooking.findMany({
      where: {
        buyerId: buyerId,
        buyerConfirm: true,
        bookingConfirm: false,
        isDelivered: false,
        isDispatched: false
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
