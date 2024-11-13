import { NextRequest } from "next/server";
import { z } from "zod";
enum ContainerType {
  Type_20 = "Type_20",
  Type_40 = "Type_40"
}

const validateInput = z.object({
  departureDate: z.date().refine(date => date > new Date()),
  arrivalDate: z.date().refine(date => date > new Date()),
  load: z.number().min(1).max(28),
  noOfContainers: z.number().min(1),
  price: z.number(),
  containerType: z.enum([ContainerType.Type_20, ContainerType.Type_40])
});

export async function PATCH(request: NextRequest) {
  const userFfId = request.headers.get("x-user-id") as string;

  const body = await request.json();
}
