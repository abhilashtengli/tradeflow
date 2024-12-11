import authOptions from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const validateInput = z.object({
  productId: z.string()
});

const prisma = new PrismaClient();

// request quote (create quote by first giving about buyer info)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Please login!" });
    }

    const buyerId = session?.user.id;
    // const buyerId = "5abd8eff-fb43-47d9-9a61-69291f3e5b42";

    const body = await request.json();
    console.log(body);

    const result = validateInput.safeParse(body);

    if (!result.success) {
      return NextResponse.json({
        message: " Invalid input",
        error: result.error.errors
      });
    }
    const product = await prisma.product.findUnique({
      where: { id: body.productId },
      select: {
        userId: true // Get the seller's userId
      }
    });

    if (!product || !product.userId) {
      return NextResponse.json({
        message: "Product or seller not found"
      });
    }

    const sellerId = product.userId;

    const data = await prisma.productQuote.create({
      data: {
        productId: body.productId,
        sellerId: sellerId,
        buyerId: buyerId
      }
    });

    return NextResponse.json({
      data: data
    });
  } catch (err) {
    return NextResponse.json({ error: err });
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest) {
  try {
    // const buyerId = (await request.headers.get("x-user-id")) as string;
    // const buyerId = "5abd8eff-fb43-47d9-9a61-69291f3e5b42";

    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Please login!" });
    }

    const buyerId = session?.user.id;

    const QuoteData = await prisma.productQuote.findMany({
      where: {
        buyerId: buyerId,
        pendingQuotes: true
      },
      include: {
        product: true,
        Seller: {
          select: {
            name: true,
            country: true
          }
        }
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
