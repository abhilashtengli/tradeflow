import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

//GetUser
export async function GET(req: NextRequest) {
  const id = (await req.headers.get("x-user-id")) as string;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        country: true
      }
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ data: user }, { status: 200 });
  } catch (err) {
    return NextResponse.json({
      error: err,
      message: "Error fetching user"
    });
  }
}
