import authOptions from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function GET(request: NextRequest) {
  // here add logged in user id
  const userId = "627826c7-0e32-4a01-ac93-0f4cbd05e169";
  // const userId = (await request.headers.get("x-user-id")) as string;
  const session = await getServerSession(authOptions);
  console.log("FFEC", session);

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
