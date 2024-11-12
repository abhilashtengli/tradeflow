import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { json } from "stream/consumers";

const prisma = new PrismaClient();
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;

    const user = await prisma.userTransporter.findUnique({
      where: {
        id: id
      },
      select: {
        name: true,
        email: true,
        companyName: true,
        companyAddres: true,
        role: true
      }
    });
    if (!user) {
      return NextResponse.json({ message: "User not found " }, { status: 404 });
    }

    return NextResponse.json(
      {
        data: user
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ error: err });
  }
}
