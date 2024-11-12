import { NextRequest } from "next/server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const userId = request.headers.get("x-user-id") as string;

  const user = await prisma.userTransporter.findUnique({
    where: {
      id: userId
    },
    select: {
      name: true,
      companyName: true,
      email: true
    }
  });
}
