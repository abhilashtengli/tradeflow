import authOptions from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest) {
  try {
    // const userId = request.headers.get("x-user-id") as string;
    // const sellerId = (await request.headers.get("x-user-id")) as string;

    const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Please login!" });
  }

  const sellerId = session?.user.id;

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
