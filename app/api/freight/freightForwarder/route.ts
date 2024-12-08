import { PrismaClient } from "@prisma/client";
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
    // const userId = request.headers.get("x-user-id") as string;
    const userId = "8125bff5-ff56-4e62-872b-5ff4c13e34ff";
    const body = await request.json();
    const { success } = await ValidateUpdate.safeParse(body);

    if (!success) {
      return NextResponse.json({
        message: "Invalid inputs for the update request"
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

export async function GET(request: NextRequest) {
  try {
    // const userId = "8125bff5-ff56-4e62-872b-5ff4c13e34ff";
    const userId = (await request.headers.get("x-user-id")) as string;

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
