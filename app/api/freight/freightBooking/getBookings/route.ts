import authOptions from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest) {
  // const ffId = "8125bff5-ff56-4e62-872b-5ff4c13e34ff";

  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Please login!" });
  }

  const ffId = session?.user.id;

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
