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
  departureDate: z
    .string()
    .refine(date => !isNaN(Date.parse(date)), "Invalid date format")
    .refine(
      date => new Date(date) >= new Date(),
      "Departure date cannot be in the past"
    )
    .optional(),
  arrivalDate: z
    .string()
    .refine(date => !isNaN(Date.parse(date)), "Invalid date format")
    .refine(
      date => new Date(date) >= new Date(),
      "Arrival date cannot be in the past"
    )
    .optional(),
  load: z.number().min(1).max(28).optional(),
  noOfContainers: z.number().min(1).optional(),
  price: z.number().optional(),
  containerType: z
    .enum([ContainerType.Type_20, ContainerType.Type_40])
    .optional(),
  freightIsAccepted: z.boolean().optional(),
  currency: z.enum(["USD", "EURO", "GBP", "INR", "RUB", "CNY"]).optional(),
  bookingId: z.string(),
  paymentStatus: z.enum(["PENDING", "PAID", "CANCELLED"]).optional()
});

const prisma = new PrismaClient();

export async function PATCH(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Please login!" });
  }

  try {
    // const userFfId = request.headers.get("x-user-id") as string;
    const body = await request.json();

    const parsedBody = {
      ...body,
      departureDate: body.departureDate
        ? new Date(body.departureDate)
        : undefined,
      expectedArrivalDate: body.expectedArrivalDate
        ? new Date(body.expectedArrivalDate)
        : undefined
    };
    console.log("reached bk");
    console.log(body);

    const result = validateInput.safeParse(body);

    if (!result.success) {
      return NextResponse.json({
        message: "invalid input type",
        error: result.error.errors
      });
    }

    const data = await prisma.freightBooking.update({
      where: {
        id: body.bookingId
      },
      data: {
        departureDate: parsedBody.departureDate,
        arrivalDate: parsedBody.arrivalDate,
        load: body.load !== undefined ? body.load : undefined,
        noOfContainers:
          body.noOfContainers !== undefined ? body.noOfContainers : undefined,
        price: body.price,
        containerType:
          body.containerType !== undefined ? body.containerType : undefined,
        freightIsAccepted: body.freightIsAccepted,
        currency: body.currency,
        paymentStatus: body.paymentStatus
        // freightForwarderId: userFfId
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
