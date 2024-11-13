import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// Get All the transportation clients
export async function GET() {
  try {
    const data = await prisma.transportation.findMany({
      where: {
        accepted: false
      }
    });
    if (!data) {
      return NextResponse.json({
        message: "There is no data available to transport"
      });
    }
    return NextResponse.json({
      data: data
    });
  } catch (err) {
    return NextResponse.json({ error: err });
  }
}
