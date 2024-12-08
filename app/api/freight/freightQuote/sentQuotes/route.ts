import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  // const ffId = "8125bff5-ff56-4e62-872b-5ff4c13e34ff";
  const ffId = (await request.headers.get("x-user-id")) as string;

  try {
    const response = await prisma.freightQuote.findMany({
      where: {
        freightForwarderId: ffId,
        pendingQuote: false
      },
      include: {
        freightBooking: true,
        user: {
          select: {
            name: true,
            country: true,
            email: true
          }
        }
      }
    });

    return NextResponse.json({
      data: response
    });
  } catch (err) {
    return NextResponse.json({
      message: "Somethings went wrong! Could not get the Quotes",
      error: err
    });
  }
}
