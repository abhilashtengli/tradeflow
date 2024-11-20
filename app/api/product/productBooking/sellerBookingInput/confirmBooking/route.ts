import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const validateUpdateInput = z.object({
  noOfDaystoDeliver: z.number().min(1),
  totalPrice: z.number(),
  paymentStatus: z.enum(["PENDING", "PAID", "PARTIALLY_PAID", "CANCELLED"]),
  productBookingId: z.string(),
  bookingConfirm: z.boolean()
});
const prisma = new PrismaClient();

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    console.log(body);

    const result = validateUpdateInput.safeParse(body);

    if (!result.success) {
      return NextResponse.json({
        message: "invalid input",
        error: result.error.errors
      });
    }
    const data = await prisma.productBooking.update({
      where: {
        id: body.productBookingId
      },
      data: {
        noOfDaystoDeliver:
          body.noOfDaystoDeliver !== undefined
            ? body.noOfDaystoDeliver
            : undefined,
        totalPrice: body.totalPrice,
        paymentStatus: body.paymentStatus,
        bookingConfirm: body.bookingConfirm
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
