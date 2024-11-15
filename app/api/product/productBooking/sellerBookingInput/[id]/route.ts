import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const validateId = z.object({
  productBookingId: z.string()
});
const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const body = await request.json();
    const result = validateId.safeParse(body);

    if (!result.success) {
      return NextResponse.json({
        message: "invalid input",
        error: result.error.errors
      });
    }

    const data = prisma.productBooking.findUnique({
      where: {
        id: body.productBookingId
      },
      select: {
        buyer: {
          select: {
            id: true,
            name: true,
            email: true,
            country: true
          }
        },
        product: true
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
