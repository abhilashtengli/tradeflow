import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
const validateUpdateInput = z.object({
  noOfDaystoDeliver: z.number().min(1),
  totalPrice: z.number(),
  paymentStatus: z.number(),
  isDispatched: z.boolean(),
  isDelivered: z.boolean(),
  containerTypeBooked: z.enum(["Type_20", "Type_40"]),
  noOfContainersBooked: z.number().min(1),
  departureDate: z.date().refine(date => date > new Date()),
  expectedArrivalDate: z.date().refine(date => date > new Date()),
  productBookingId: z.string(),
  bookingConfirmed: z.boolean()
});

const prisma = new PrismaClient();

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();

    const result = validateUpdateInput.safeParse(body);

    if (!result.success) {
      return NextResponse.json({
        message: "invalid input",
        error: result.error.errors
      });
    }
    const data = await prisma.productBooking.update({
      where: {
        id: body.productBookingId
      },
      data: {
        noOfDaystoDeliver:
          body.noOfDaystoDeliver !== undefined
            ? body.noOfDaystoDeliver
            : undefined,
        totalPrice: body.totalPrice,
        paymentStatus: body.paymentStatus,
        isDispatched:
          body.isDispatched !== undefined ? body.isDispatched : undefined,
        isDelivered:
          body.isDelivered !== undefined ? body.isDelivered : undefined,
        containerTypeBooked:
          body.containerTypeBooked !== undefined
            ? body.containerType
            : undefined,
        noOfContainersBooked:
          body.noOfContainersBooked !== undefined
            ? body.noOfContainersBooked
            : undefined,
        departureDate:
          body.departureDate !== undefined ? body.departureDate : undefined,
        expectedArrivalDate:
          body.expectedArrivalDate !== undefined
            ? body.expectedArrival
            : undefined,
        bookingConfirm: body.bookingConfirm
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
    const userId = request.headers.get("x-user-id") as string;

    const data = prisma.productBooking.findMany({
      where: {
        sellerId: userId
      },
      select: {
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
    return NextResponse.json({
      data: data
    });
  } catch (err) {
    return NextResponse.json({
      error: err
    });
  }
}

