import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const ffId = "8125bff5-ff56-4e62-872b-5ff4c13e34ff";
  // console.log("entered here");

  try {
    const response = await prisma.freightBooking.findMany({
      where: {
        freightForwarderId: ffId,
        userConfirm: "accepted"
      },
      include: {
        freightQuote: true
      }
    });
    return NextResponse.json({
      data: response
    });
  } catch (err) {
    return NextResponse.json({
      message: "Could not fetch data",
      error: err
    });
  }
}
