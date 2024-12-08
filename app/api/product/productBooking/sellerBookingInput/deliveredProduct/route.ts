import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    // const userId = request.headers.get("x-user-id") as string;
    const sellerId = (await request.headers.get("x-user-id")) as string;

    const data = await prisma.productBooking.findMany({
      where: {
        sellerId: sellerId,
        isDelivered: true
      },
      include: {
        buyer: {
          select: {
            id: true,
            name: true,
            email: true,
            country: true
          }
        },
        product: {
          select: {
            id: true,
            name: true,
            category: true,
            quantity: true,
            productOrigin: true
          }
        }
      }
    });

    return NextResponse.json({
      data: data
    });
  } catch (err) {
    return NextResponse.json({
      error: err
    });
  }
}
