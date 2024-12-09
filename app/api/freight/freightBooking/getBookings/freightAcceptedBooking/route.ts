import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest) {
  //seller id
  const userId = "5dcb6f85-2f53-467c-b9d7-e4ff853b8d4a";
  // const userId = (await request.headers.get("x-user-id")) as string;

  // console.log("entered here");

  try {
    const response = await prisma.freightBooking.findMany({
      where: {
        userId: userId,
        freightIsAccepted: true
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
