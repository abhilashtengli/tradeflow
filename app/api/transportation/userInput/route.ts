import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import axios from "axios";

const tsValidation = z.object({
  type: z.enum([
    "Flatbed_Truck",
    "Box_Truck",
    "Pickup_Truck",
    "Refrigerated_Truck",
    "Car_Carrier_Truck",
    "Tow_Truck",
    "Heavy_Hauler",
    "Curtain_Side_Truck"
  ]),
  origin: z.string(),
  destination: z.string(),
  load: z.number(),
  userId: z.string(),
  loadUnit: z.enum(["tons", "Kilograms", "Pounds"])
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
    const ratePerKm = 26;
    const price = disInKms * ratePerKm;

    const transportationData = await prisma.transportation.create({
      data: {
        type: body.type,
        origin: body.origin,
        destination: body.destination,
        load: body.load,
        userId: body.userId,
        distance,
        price: price,
        userConfirmBooking: true,
        loadUnit: body.loadUnit
      },
      select: {
        id: true,
        type: true,
        origin: true,
        destination: true,
        load: true,
        distance: true,
        price: true
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

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id") as string;

    const transportationData = await prisma.transportation.findMany({
      where: {
        userId: userId
      }
    });
    return NextResponse.json({
      data: transportationData
    });
  } catch (err) {
    return NextResponse.json({ error: err });
  }
}
