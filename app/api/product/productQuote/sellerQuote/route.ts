import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const validateInput = z.object({
  productQuoteId: z.string(),
  currency: z.enum(["USD", "EURO", "GBP", "INR", "RUB", "CNY"]),
  portOfOrigin: z.string(),
  price: z.number(),
  noOfDaystoDeliver: z.number(),
  paymentTerms: z.string()
});

const prisma = new PrismaClient();

// update the Quote with deatils
export async function PATCH(request: NextRequest) {
  console.log("started PATCH");

  try {
    const body = await request.json();
    console.log(body);

    const result = validateInput.safeParse(body);

    if (!result.success) {
      console.log("error in validateInput", result.error.errors);
      return NextResponse.json({
        message: "Invalid inputs",
        errors: result.error.errors
      });
    }
    console.log(body.productQuoteId);

    const existingQuote = await prisma.productQuote.findUnique({
      where: { id: body.productQuoteId }
    });

    if (!existingQuote) {
      return NextResponse.json({
        error: "Quote not found",
        productQuoteId: body.productQuoteId
      });
    }

    const data = await prisma.productQuote.update({
      where: {
        id: body.productQuoteId
      },
      data: {
        price: body.price !== undefined ? body.price : undefined,
        currency: body.currency !== undefined ? body.currency : undefined,
        portOfOrigin:
          body.portOfOrigin !== undefined ? body.portOfOrigin : undefined,
        noOfDaystoDeliver:
          body.noOfDaystoDeliver !== undefined
            ? body.noOfDaystoDeliver
            : undefined,
        paymentTerms:
          body.paymentTerms !== undefined ? body.paymentTerms : undefined,
        pendingQuotes: false
      }
    });
    console.log(data);

    return NextResponse.json({
      data: data
    });
  } catch (err) {
    console.error("Error in PATCH handler:", err);
    return NextResponse.json({
      error: "Failed to update quote",
      details: err
    });
  }
}

// get All the quote by Sellerid
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest) {
  try {
    // const sellerId = (await request.headers.get("x-user-id")) as string;

    const sellerId = "5dcb6f85-2f53-467c-b9d7-e4ff853b8d4a";

    const QuoteData = await prisma.productQuote.findMany({
      where: {
        sellerId: sellerId,
        pendingQuotes: true
      },
      include: {
        Buyer: true,
        product: true
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
