import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const validateInput = z.object({
  productQuoteId: z.string(),
  currency: z.enum(["USD", "EURO", "GBP", "INR", "RUB", "CNY"]),
  portOfOrigin: z.string(),
  price: z.number()
});

const prisma = new PrismaClient();

// update the Quote with deatils
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();

    const result = validateInput.safeParse(body);

    if (!result.success) {
      return NextResponse.json({
        message: "Invalid inputs",
        errors: result.error.errors
      });
    }

    const data = await prisma.productQuote.update({
      where: {
        id: body.productQuoteId
      },
      data: {
        price: body.price !== undefined ? body.price : undefined,
        currency: body.currency !== undefined ? body.currency : undefined,
        portOfOrigin: body.portOfOrigin !== undefined ? body.portOfOrigin : undefined,
      }
    });
    return NextResponse.json({
      data: data
    });
  } catch (err) {
    return NextResponse.json({ error: err });
  }
}

// get All the quote by Sellerid
export async function GET(request: NextRequest) {
  try {
    const sellerId = (await request.headers.get("x-user-id")) as string;

    const QuoteData = await prisma.productQuote.findMany({
      where: {
        sellerId: sellerId
      }
    });
    return NextResponse.json({
      data: QuoteData
    });
  } catch (err) {
    return NextResponse.json({
      error: err
    });
  }
}
