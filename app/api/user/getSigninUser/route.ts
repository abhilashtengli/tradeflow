import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

//GetUser
export async function GET() {
  const id = "5abd8eff-fb43-47d9-9a61-69291f3e5b42"; //change it the end

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
