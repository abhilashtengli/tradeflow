import { NextRequest, NextResponse } from "next/server";
import { updateUserTs } from "./userTsValidation/route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PATCH(request: NextRequest) {
  const body = await request.json();

  // const userId = request.headers.get("x-user-id") as string;
  const userId = "30f0e50e-99da-456c-b873-b19565c451b0";

  const result = updateUserTs.safeParse(body);

  if (!result.success) {
    return NextResponse.json({
      message: "Invalid parameters given",
      error: result.error.errors
    });
  }
  const userTsUpdated = await prisma.userTransporter.update({
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
    data: userTsUpdated,
    status: 200
  });
}
//Get all Transporters
export async function GET() {
  const userTs = await prisma.userTransporter.findMany();

  if (!userTs) {
    return NextResponse.json({
      message: "No Transporters found"
    });
  }
  return NextResponse.json({
    data: userTs
  });
}
