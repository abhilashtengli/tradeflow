import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
// import { z } from "zod";

const prisma = new PrismaClient();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function GET(request: NextRequest) {
  try {
    const users = await prisma.user.findMany();

    return NextResponse.json({
      users: users
    });
  } catch (err) {
    return NextResponse.json(
      { message: "Error fetching users", error: err },
      { status: 500 }
    );
  }
}
