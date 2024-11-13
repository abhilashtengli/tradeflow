import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const { email } = await request.json();

  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      role: true
    }
  });
  if (user) return NextResponse.json({ role: user.role });

  const userTs = await prisma.userTransporter.findUnique({
    where: { email },
    select: {
      role: true
    }
  });
  if (userTs) return NextResponse.json({ role: userTs.role || null });

  const userFf = await prisma.freightForwarder.findUnique({
    where: {
      email
    },
    select: {
      role: true
    }
  });
  if(userFf) return NextResponse.json({ role: userFf.role || null });
}
