import { NextRequest, NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest) {
  // const userId = request.headers.get("x-user-id") as string;

  try {
    const id = (await request.headers.get("x-user-id")) as string;

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
