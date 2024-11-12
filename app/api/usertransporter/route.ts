import { NextRequest, NextResponse } from "next/server";
import { updateUserTs } from "./userTsValidation/route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PATCH(request: NextRequest) {
  const body = await request.json();

  const userId = request.headers.get("x-user-id") as string;

  const { success } = updateUserTs.safeParse(body);

  if (!success) {
    return NextResponse.json("Invalid parameters given");
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
      companyAddres:
        body.companyAddres !== undefined ? body.companyAddres : undefined,
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
