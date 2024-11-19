import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
//get the sent quotes
export async function GET(request: NextRequest) {
  try {
    const sellerId = (await request.headers.get("x-user-id")) as string;

    const QuoteData = await prisma.productQuote.findMany({
      where: {
        sellerId: sellerId,
        pendingQuotes: false
      },
      select: { Buyer: true, product: true }
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
