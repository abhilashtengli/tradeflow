import { PrismaClient } from "@prisma/client";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const validateInput = z.object({
  dispatched: z.boolean(),
  bookingId: z.string()
});

const prisma = new PrismaClient();

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();

    const result = validateInput.safeParse(body);

    if (!result.success)
      return NextResponse.json({
        message: " Invalid inputs",
        error: result.error.errors
      });

    const dispatchedData = await prisma.freightBooking.update({
      where: {
        id: body.bookingId
      },
      data: {
        dispatched: body.dispatched
      }
    });

    return NextResponse.json({
      data: dispatchedData
    });
  } catch (err) {
    return NextResponse.json({
      error: err
    });
  }
}
