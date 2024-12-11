import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";

const prisma = new PrismaClient();
//get the sent quotes
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest) {
  try {
    // const sellerId = (await request.headers.get("x-user-id")) as string;
    // const sellerId = "627826c7-0e32-4a01-ac93-0f4cbd05e169";

    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Please login!" });
    }

    const sellerId = session?.user.id;
    const QuoteData = await prisma.productQuote.findMany({
      where: {
        sellerId: sellerId,
        pendingQuotes: false
      },
      include: { Buyer: true, product: true }
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
