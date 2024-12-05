import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function GET() {
  const userId = "5dcb6f85-2f53-467c-b9d7-e4ff853b8d4a";
  try {
    const response = await prisma.transportation.findMany({
      where: {
        userId: userId
      },
      include: {
        transporter: {
          select: {
            id: true,
            name: true,
            email: true,
            companyName: true,
            companyAddress: true
          }
        }
      }
    });
    return NextResponse.json({
      data: response
    });
  } catch (err) {
    return NextResponse.json({
      message: "Could not fetch the data",
      error: err
    });
  }
}
