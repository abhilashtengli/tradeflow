import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import axios from "axios";

const tsValidation = z.object({
  type: z.string(),
  origin: z.string(),
  destination: z.string(),
  load: z.number(),
  userId: z.string()
});

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { success } = tsValidation.safeParse(body);

  if (!success) {
    return NextResponse.json({ message: "Invalid Inputs" }, { status: 400 });
  }

  const origin = body.origin;
  const destination = body.destination;

  try {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${encodeURIComponent(
      origin
    )}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

    const response = await axios.get(url);
    const distanceData = response.data.rows[0].elements[0];

    if (distanceData.status !== "OK") {
      return NextResponse.json(
        { message: "Failed to calculate distance" },
        { status: 500 }
      );
    }

    const distance = distanceData.distance.value; // Distance in meters
    const disInKms = distance / 1000;
    const ratePerKm = 20;
    const price = disInKms * ratePerKm;

    const transportationData = await prisma.transportation.create({
      data: {
        type: body.type,
        origin: body.origin,
        destination: body.destination,
        load: body.load,
        userId: body.userId,
        distance,
        price: price
      }
    });

    return NextResponse.json({ transportationData });
  } catch (error) {
    console.error("Error calculating distance:", error);
    return NextResponse.json(
      { message: "Failed to calculate distance" },
      { status: 500 }
    );
  }
}
