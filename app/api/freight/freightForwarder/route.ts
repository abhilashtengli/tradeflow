import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const prisma = new PrismaClient();

const ValidateUpdate = z.object({
  name: z.string().min(2).max(30),
  password: z.string().min(8),
  companyName: z.string(),
  companyAddress: z.string(),
  country: z.string(),
  location: z.string()
});

export async function PATCH(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id") as string;
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
        country: body.country !== undefined ? body.country : undefined,
        location: body.location !== undefined ? body.location : undefined
      }
    });
    return NextResponse.json({
      data: data
    });
  } catch (err) {
    return NextResponse.json({ error: err });
  }
}
