import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

//GetUser
export async function GET() {
  const id = "5dcb6f85-2f53-467c-b9d7-e4ff853b8d4a"; //change it the end

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
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ data : user }, { status: 200 });
  } catch (err) {
    return NextResponse.json({
      error: err,
      message: "Error fetching user"
    });
  }
}
