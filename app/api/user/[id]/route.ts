import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true
      }
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "User not found"
        },
        { status: 404 }
      );
    }

    return NextResponse.json({ user: user }, { status: 200 });
  } catch (err) {
    return NextResponse.json({
      error: err,
      message: "Error fetching user"
    });
  }
}
