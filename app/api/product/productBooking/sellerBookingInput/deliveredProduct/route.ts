import { PrismaClient } from "@prisma/client";
import {  NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // const userId = request.headers.get("x-user-id") as string;


    const data = await prisma.productBooking.findMany({
      where: {
        sellerId: "5dcb6f85-2f53-467c-b9d7-e4ff853b8d4a",
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
