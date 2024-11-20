import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
const validateUpdateInput = z.object({
  isDispatched: z.boolean(),
  isDelivered: z.boolean(),
  containerTypeBooked: z.enum(["Type_20", "Type_40"]),
  noOfContainersBooked: z.number().min(1),
  departureDate: z
    .string()
    .refine(date => !isNaN(Date.parse(date)), "Invalid date format"),
  expectedArrivalDate: z
    .string()
    .refine(date => !isNaN(Date.parse(date)), "Invalid date format"),

  productBookingId: z.string()
});

const prisma = new PrismaClient();

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    console.log(body);

    const result = validateUpdateInput.safeParse(body);

    if (!result.success) {
      return NextResponse.json({
        message: "invalid input",
        error: result.error.errors
      });
    }
    const parsedBody = {
      ...body,
      departureDate: body.departureDate
        ? new Date(body.departureDate)
        : undefined,
      expectedArrivalDate: body.expectedArrivalDate
        ? new Date(body.expectedArrivalDate)
        : undefined
    };

    const data = await prisma.productBooking.update({
      where: {
        id: parsedBody.productBookingId
      },
      data: {
        isDispatched: parsedBody.isDispatched,
        isDelivered: parsedBody.isDelivered,
        containerTypeBooked: parsedBody.containerTypeBooked,
        noOfContainersBooked: parsedBody.noOfContainersBooked,
        departureDate: parsedBody.departureDate,
        expectedArrivalDate: parsedBody.expectedArrivalDate
      }
    });
    return NextResponse.json({
      data: data
    });
  } catch (err) {
    return NextResponse.json({
      error: err
    });
  }
}

export async function GET(request: NextRequest) {
  try {
    // const userId = request.headers.get("x-user-id") as string;

    console.log("reached db");

    const data = await prisma.productBooking.findMany({
      where: {
        sellerId: "5dcb6f85-2f53-467c-b9d7-e4ff853b8d4a"
      },
      include: {
        buyer: {
          select: {
            id: true,
            name: true,
            email: true,
            country: true
          }
        },
        product: {
          select: {
            id: true,
            name: true,
            category: true,
            quantity: true,
            productOrigin: true
          }
        }
      }
    });
    console.log(data);

    return NextResponse.json({
      data: data
    });
  } catch (err) {
    return NextResponse.json({
      error: err
    });
  }
}