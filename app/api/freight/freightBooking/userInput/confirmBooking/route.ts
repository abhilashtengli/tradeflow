import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const validateInput = z.object({
  userConfirm: z.enum(["accepted", "rejected"]),
  freightQuoteId: z.string(),
  bookingId: z.string()
});

const prisma = new PrismaClient();
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();

    const { success } = await validateInput.safeParse(body);

    let confirm;
    if (body.userConfirm == "accepted") {
      confirm = true;
    } else {
      confirm = false;
    }

    if (!success) {
      return NextResponse.json({
        message: "Invalid inputs provided"
      });
    }
    await prisma.$transaction(async () => {
      await prisma.freightQuote.update({
        where: {
          id: body.freightQuoteId
        },
        data: {
          isAccepted: confirm
        }
      });
      await prisma.freightBooking.update({
        where: {
          id: body.bookingId
        },
        data: {
          userConfirm: body.userConfirm
        }
      });
    });
    return NextResponse.json({
      message: "Booking confirmed successfully"
    });
  } catch (err) {
    return NextResponse.json({ error: err });
  }
}
