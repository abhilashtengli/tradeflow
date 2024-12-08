import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  console.log("reached ff url");

  try {

    const response = await prisma.freightForwarder.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        companyName: true,
        companyAddress: true,
        country: true
      }
    });
    return NextResponse.json({
      data: response
    });
  } catch (err) {
    return NextResponse.json({ message: "Could not get users ", error: err });
  }
}
