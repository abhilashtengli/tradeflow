import { NextRequest, NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";

const prisma = new PrismaClient();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest) {
  // const userId = request.headers.get("x-user-id") as string;

  try {
    // const id = (await request.headers.get("x-user-id")) as string;

    const session = await getServerSession(authOptions);
    console.log(session);
    
    if (!session) {
      return NextResponse.json({
        message: "Please login!"
      });
    }
    const id = session.user.id;

    const user = await prisma.userTransporter.findUnique({
      where: {
        id: id
      },
      select: {
        name: true,
        email: true,
        companyName: true,
        companyAddress: true,
        role: true,
        country: true
      }
    });
    if (!user) {
      return NextResponse.json({ message: "User not found " }, { status: 404 });
    }

    return NextResponse.json({ data: user }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err });
  }
}
