import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const tsValidation = z.object({
  type: z.string().optional(),
  load: z.string().optional(),
  transportationId: z.string(),
  dispatched: z.boolean().optional(),
  delivered: z.boolean().optional(),
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

  const update = await prisma.transportation.update({
    where: {
      id: body.transportationId
    },
    data: {
      type: body.type !== undefined ? body.type : undefined,
      load: body.laod !== undefined ? body.laod : undefined,
      transporterId: tsId,
      dispatched: body.dispatched !== undefined ? body.dispatched : undefined,
      delivered: body.delivered !== undefined ? body.delivered : undefined,
      accepted: body.accepted !== undefined ? body.accepted : undefined
    }
  });

  return NextResponse.json({
    data: update
  });
}