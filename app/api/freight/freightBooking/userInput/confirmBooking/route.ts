import authOptions from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const validateInput = z.object({
  userConfirm: z.enum(["accepted", "rejected"]),
  freightQuoteId: z.string(),
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

    const result = await validateInput.safeParse(body);
    if (!result.success) {
      return NextResponse.json({
        message: "Invalid inputs provided",
        error: result.error.errors
      });
    }

    let confirm;
    let rejected;
    if (body.userConfirm == "accepted") {
      confirm = true;
      rejected = false;
    } else {
      confirm = false;
      rejected = true;
    }
    if (rejected === true && confirm === false) {
      await prisma.freightQuote.update({
        where: {
          id: body.freightQuoteId
        },
        data: {
          isAccepted: confirm,
          isRejected: rejected
        }
      });
      return NextResponse.json({
        message: "Quote is rejected"
      });
    }
    const freightQuote = await prisma.freightQuote.findUnique({
      where: {
        id: body.freightQuoteId
      }
    });

    const ffId = freightQuote?.freightForwarderId;
    if (!ffId) {
      return NextResponse.json({
        message: "No freight forwarder found"
      });
    }

    const response = await prisma.$transaction(async () => {
      await prisma.freightQuote.update({
        where: {
          id: body.freightQuoteId
        },
        data: {
          isAccepted: confirm,
          isRejected: rejected
        }
      });

      await prisma.freightBooking.update({
        where: {
          id: body.bookingId
        },
        data: {
          userConfirm: body.userConfirm,
          freightForwarderId: ffId
        }
      });
    });
    return NextResponse.json({
      data: response,
      message: "performed operation successfully"
    });
  } catch (err) {
    return NextResponse.json({ error: err });
  }
}
