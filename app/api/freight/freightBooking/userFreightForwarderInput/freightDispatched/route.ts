import authOptions from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const validateInput = z.object({
  dispatched: z.boolean(),
  bookingId: z.string()
});

const prisma = new PrismaClient();

export async function PATCH(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Please login!" });
  }

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
