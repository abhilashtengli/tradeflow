import authOptions from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const prisma = new PrismaClient();

const ValidateUpdate = z.object({
  name: z.string().min(2).max(30).optional(),
  password: z.string().min(8).optional(),
  companyName: z.string().optional(),
  companyAddress: z.string().optional(),
  country: z.string().optional()
});

export async function PATCH(request: NextRequest) {
  try {
    // const userId = "8125bff5-ff56-4e62-872b-5ff4c13e34ff";
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Please login!" });
    }

    const userId = session?.user.id;

    const body = await request.json();
    const result = await ValidateUpdate.safeParse(body);

    if (!result.success) {
      return NextResponse.json({
        message: "Invalid inputs for the update request",
        error: result.error.errors
      });
    }

    const data = await prisma.freightForwarder.update({
      where: {
        id: userId
      },
      data: {
        name: body.name !== undefined ? body.name : undefined,
        password: body.password !== undefined ? body.password : undefined,
        companyName:
          body.companyName !== undefined ? body.companyName : undefined,
        companyAddress:
          body.companyAddress !== undefined ? body.companyAddress : undefined,
        country: body.country !== undefined ? body.country : undefined
      }
    });
    return NextResponse.json({
      data: data
    });
  } catch (err) {
    return NextResponse.json({ error: err });
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest) {
  try {
    // const userId = "8125bff5-ff56-4e62-872b-5ff4c13e34ff";

    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Please login!" });
    }

    const userId = session?.user.id;

    const response = await prisma.freightForwarder.findUnique({
      where: {
        id: userId
      }
    });
    return NextResponse.json({
      data: response
    });
  } catch (err) {
    return NextResponse.json({ message: "Could not get user", error: err });
  }
}
