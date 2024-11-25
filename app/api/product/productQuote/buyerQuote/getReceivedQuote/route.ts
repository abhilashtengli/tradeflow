import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
//get the sent quotes
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest) {
  try {
    // const sellerId = (await request.headers.get("x-user-id")) as string;
    // console.log("reached be");

    const QuoteData = await prisma.productQuote.findMany({
      where: {
        buyerId: "5abd8eff-fb43-47d9-9a61-69291f3e5b42",
        pendingQuotes: false,
        buyerBookingConfirmed: false
      },
      include: {
        Seller: {
          select: {
            id: true,
            name: true,
            country: true
          }
        },
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
