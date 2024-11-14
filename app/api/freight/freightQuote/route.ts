import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
const validateQuoteInput = z.object({
  bookingId: z.string(),
  price: z.number()
});
const validateQuoteUpdateInput = z.object({
  freightQuoteId: z.string(),
  price: z.number()
});
const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id") as string;
    const body = await request.json();

    const { success } = validateQuoteInput.safeParse(body);

    if (!success) {
      return NextResponse.json({ message: "Invalid inputs" });
    }

    const data = await prisma.freightQuote.create({
      data: {
        freightForwarderId: userId,
        bookingId: body.bookingId,
        price: body.price
      }
    });
    return NextResponse.json({
      data: data
    });
  } catch (err) {
    return NextResponse.json({ error: err });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();

    const { success } = validateQuoteUpdateInput.safeParse(body);

    if (!success) {
      return NextResponse.json({ message: "Invalid inputs" });
    }

    const data = await prisma.freightQuote.update({
      where: {
        id: body.freightQuoteId
      },
      data: {
        price: body.price
      }
    });
    return NextResponse.json({
      data: data,
      mesaage: "Updated Price successfully"
    });
  } catch (err) {
    return NextResponse.json({ error: err });
  }
}
