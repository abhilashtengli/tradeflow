import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const validateUpdateInput = z.object({
  isDelivered: z.boolean(),
  productBookingId: z.string(),
  paymentStatus: z.enum(["PENDING", "PAID", "PARTIALLY_PAID", "CANCELLED"]),
  deliveredDate: z
    .string()
    .refine(date => !isNaN(Date.parse(date)), "Invalid date format")
});
const prisma = new PrismaClient();

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    console.log(body);

    const result = validateUpdateInput.safeParse(body);

    if (!result.success) {
      console.log(result.error.errors);

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
        isDelivered: body.isDelivered,
        paymentStatus: body.paymentStatus,
        deliveredDate: body.deliveredDate
          ? new Date(body.deliveredDate)
          : undefined
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
