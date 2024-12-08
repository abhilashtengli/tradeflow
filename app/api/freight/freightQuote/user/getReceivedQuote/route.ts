import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function GET(request: NextRequest) {
  // here add logged in user id
  // const userId = "5dcb6f85-2f53-467c-b9d7-e4ff853b8d4a";
  const userId = (await request.headers.get("x-user-id")) as string;

  try {
    const response = await prisma.freightQuote.findMany({
      where: {
        userId: userId,
        pendingQuote: false
      },
      include: {
        freightBooking: {
          select: {
            product: true,
            origin: true,
            destination: true
          }
        },
        freightForwarder: {
          select: {
            name: true,
            email: true,
            companyName: true,
            companyAddress: true,
            country: true
          }
        }
      }
    });
    return NextResponse.json({
      data: response
    });
  } catch (err) {
    return NextResponse.json({
      message: "Could not fetch the Data",
      error: err
    });
  }
}
