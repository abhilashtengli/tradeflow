import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const tsValidation = z.object({
  type: z
    .enum([
      "Flatbed_Truck",
      "Box_Truck",
      "Pickup_Truck",
      "Refrigerated_Truck",
      "Car_Carrier_Truck",
      "Tow_Truck",
      "Heavy_Hauler",
      "Curtain_Side_Truck"
    ])
    .optional(),
  load: z.number().optional(),
  transportationId: z.string(),
  dispatched: z.boolean().optional(),
  delivered: z.boolean().optional(),
  paymentStatus: z
    .enum(["PENDING", "PAID", "PARTIALLY_PAID", "CANCELLED"])
    .optional(),
  accepted: z.boolean().optional()
});

const prisma = new PrismaClient();

export async function PATCH(request: NextRequest) {
  // const tsId = request.headers.get("x-user-id") as string;
  const tsId = "30f0e50e-99da-456c-b873-b19565c451b0";

  const body = await request.json();
  console.log(body);

  const result = tsValidation.safeParse(body);

  if (!result.success) {
    return NextResponse.json({
      message: "Invalid request",
      error: result.error.errors
    });
  }
  const res = await prisma.transportation.findUnique({
    where: {
      id: body.transportationId
    },
    select: {
      accepted: true
    }
  });

  if (res?.accepted === true) {
    return NextResponse.json({
      message : "This request is already accepted by someone"
    })
  }

  const update = await prisma.transportation.update({
    where: {
      id: body.transportationId
    },

    data: {
      type: body.type !== undefined ? body.type : undefined,
      load: body.load !== undefined ? body.load : undefined,
      transporterId: tsId !== undefined ? tsId : undefined,
      dispatched: body.dispatched !== undefined ? body.dispatched : undefined,
      delivered: body.delivered !== undefined ? body.delivered : undefined,
      accepted: body.accepted !== undefined ? body.accepted : undefined,
      paymentStatus:
        body.paymentStatus !== undefined ? body.paymentStatus : undefined
    }
  });

  return NextResponse.json({
    data: update
  });
}
