import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
enum ContainerType {
  Type_20 = "Type_20",
  Type_40 = "Type_40"
}

const validateInput = z.object({
  departureDate: z.date().refine(date => date > new Date()).optional(),
  arrivalDate: z.date().refine(date => date > new Date()).optional(),
  load: z.number().min(1).max(28).optional(),
  noOfContainers: z.number().min(1).optional(),
  price: z.number().optional(),
  containerType: z
    .enum([ContainerType.Type_20, ContainerType.Type_40])
    .optional(),
  freightIsAccepted: z.boolean().optional(),
  bookingId: z.string()
});

const prisma = new PrismaClient();

export async function PATCH(request: NextRequest) {
  try {
    const userFfId = request.headers.get("x-user-id") as string;

    const body = await request.json();

    const { success } = validateInput.safeParse(body);

    if (!success) {
      return NextResponse.json({
        message: "invalid input type"
      });
    }

    const data = await prisma.freightBooking.update({
      where: {
        id: body.bookingId
      },
      data: {
        departureDate: body.departureDate,
        arrivalDate: body.arrivalDate,
        load: body.load !== undefined ? body.load : undefined,
        noOfContainers:
          body.noOfContainers !== undefined ? body.noOfContainers : undefined,
        price: body.price,
        containerType:
          body.containerType !== undefined ? body.containerType : undefined,
        freightIsAccepted: body.freightIsAccepted,
        freightForwarderId: userFfId
      }
    });

    return NextResponse.json({
      data: data,
      status: 200
    });
  } catch (err) {
    return NextResponse.json({
      error: err
    });
  }
}
