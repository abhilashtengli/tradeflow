import authOptions from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  console.log("reached ff url");
  const session = await getServerSession(authOptions);
  console.log("ffffff-------------", session);

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
