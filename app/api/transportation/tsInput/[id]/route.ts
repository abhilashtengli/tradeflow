import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const tsValidation = z.object({
  type: z.string(),
  load: z.string(),
  transporterId: z.string(),
  dispatched: z.boolean(),
  delivered: z.boolean(),
  accepted: z.boolean()
});

const prisma = new PrismaClient();

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const tsId = request.headers.get("x-user-id") as string;
  const body = await request.json();
  const { id } = await params;
  const { success } = tsValidation.safeParse(body);

  if (!success) {
    return NextResponse.json({ message: "Invalid request" });
  }

  const update = await prisma.transportation.update({
    where: {
      id: id
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
