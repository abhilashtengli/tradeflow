import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

enum ContainerType {
  Type_20 = "Type_20",
  Type_40 = "Type_40"
}

const validateInput = z.object({
  origin: z.string(),
  destination: z.string(),
  product: z.string(),
  productUnit: z.enum([
    "pcs",
    "box",
    "kg",
    "grams",
    "tons",
    "cm",
    "meter",
    "inche",
    "feet"
  ]),
  departureDate: z.date().refine(date => date > new Date()),
  load: z.number().min(1).max(28),
  noOfContainers: z.number().min(1),
  containerType: z.enum([ContainerType.Type_20, ContainerType.Type_40])
});

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id") as string;

    const body = await request.json();

    const { success } = await validateInput.safeParse(body);

    if (!success) {
      return NextResponse.json({
        message: "Invalid inputs provided"
      });
    }
    const data = await prisma.freightBooking.create({
      data: {
        origin: body.origin,
        destination: body.destination,
        departureDate: body.departureDate,
        userId: userId,
        load: body.load,
        noOfContainers: body.noOfContainers,
        containerType: body.containerType,
        productUnit: body.productUnit
      }
    });
    return NextResponse.json({
      data: data
    });
  } catch (err) {
    return NextResponse.json({ error: err });
  }
}
