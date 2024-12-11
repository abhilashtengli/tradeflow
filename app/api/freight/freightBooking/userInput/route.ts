import authOptions from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
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
  departureDate: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), "Invalid date format")
    .refine(
      (date) => new Date(date) >= new Date(),
      "Departure date cannot be in the past"
    ),
  load: z.number().min(1).max(28),
  loadUnit: z.enum(["pcs", "box", "kg", "tons", "meter"]),
  noOfContainers: z.number().min(1),
  containerType: z.enum([ContainerType.Type_20, ContainerType.Type_40])
});

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Please login!" });
    }

    const userSellerId = session?.user.id;

    const body = await request.json();
    console.log(body);

    const result = await validateInput.safeParse(body);

    if (!result.success) {
      console.log(result.error);
      return NextResponse.json({
        message: "Invalid inputs provided",
        error: result.error.errors
      });
    }

    const parsedBody = {
      ...body,
      departureDate: body.departureDate
        ? new Date(body.departureDate)
        : undefined
    };

    console.log(parsedBody);

    const data = await prisma.freightBooking.create({
      data: {
        origin: body.origin,
        destination: body.destination,
        departureDate: parsedBody.departureDate,
        userId: userSellerId,
        load: body.load,
        noOfContainers: body.noOfContainers,
        containerType: body.containerType,
        productUnit: body.productUnit,
        loadUnit: body.loadUnit,
        product: body.product,
        freightForwarderId: null
      }
    });
    return NextResponse.json({
      data: data
    });
  } catch (err) {
    console.error("Prisma Error Details:", JSON.stringify(err, null, 2));
    return NextResponse.json({ error: err });
  }
}
