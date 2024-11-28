import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
const validateQuoteInput = z.object({
  freightForwarderId: z.string(),
  bookingId: z.string()
});

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const result = validateQuoteInput.safeParse(body);

    if (!result.success) {
      return NextResponse.json({
        message: "Invalid inputs",
        error: result.error.errors
      });
    }

    // Fetch the userId from the FreightBooking
    const booking = await prisma.freightBooking.findUnique({
      where: {
        id: body.bookingId
      },
      select: {
        userId: true
      }
    });

    // Handle the case where no booking is found
    if (!booking) {
      return NextResponse.json({ message: "Booking not found" });
    }

    const data = await prisma.freightQuote.create({
      data: {
        freightForwarderId: body.freightForwarderId,
        bookingId: body.bookingId,
        userId: booking.userId
      }
    });
    return NextResponse.json({ data: data });
  } catch (err) {
    return NextResponse.json({ error: err });
  }
}
