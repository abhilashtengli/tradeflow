import authOptions from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const validateQuoteUpdateInput = z.object({
  freightQuoteId: z.string(),
  price: z.number(),
  currency: z.enum(["USD", "EURO", "GBP", "INR", "RUB", "CNY"])
});
const prisma = new PrismaClient();

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();

    const result = validateQuoteUpdateInput.safeParse(body);

    if (!result.success) {
      return NextResponse.json({
        message: "Invalid inputs",
        error: result.error.errors
      });
    }

    const data = await prisma.freightQuote.update({
      where: {
        id: body.freightQuoteId
      },
      data: {
        price: body.price,
        currency: body.currency,
        pendingQuote: false
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

//get freight quote requests
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest) {
  // const ffId = "8125bff5-ff56-4e62-872b-5ff4c13e34ff";

  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Please login!" });
  }

  const ffId = session?.user.id;

  try {
    const response = await prisma.freightQuote.findMany({
      where: {
        freightForwarderId: ffId,
        pendingQuote: true
      },
      include: {
        freightBooking: true,
        user: {
          select: {
            name: true,
            country: true,
            email: true
          }
        }
      }
    });
    console.log(response);

    return NextResponse.json({
      data: response
    });
  } catch (err) {
    return NextResponse.json({
      message: "Somethings went wrong! Could not get the Quotes",
      error: err
    });
  }
}
