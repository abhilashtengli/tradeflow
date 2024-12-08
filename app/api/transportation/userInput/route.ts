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
  loadUnit: z.enum(["tons", "Kilograms", "Pounds"])
});
const tsUpdateValidation = z.object({
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
  origin: z.string().optional(),
  destination: z.string().optional(),
  load: z.number().optional(),
  loadUnit: z.enum(["tons", "Kilograms", "Pounds"]).optional(),
  bookingId : z.string()
});
const apiKey = process.env.GOOGLE_MAPS_API_KEY;

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log("Request Body:", body);

  const userId = "5dcb6f85-2f53-467c-b9d7-e4ff853b8d4a"; //logged in user id
  const result = tsValidation.safeParse(body);

  if (!result.success) {
    console.error("Validation Error:", result.error.errors);
    return NextResponse.json({
      message: "Invalid Inputs",
      error: result.error.errors,
      status: 400
    });
  }

  const origin = body.origin;
  const destination = body.destination;

  try {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${encodeURIComponent(
      origin
    )}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

    const response = await axios.get(url);
    console.log("Google Maps API Response:", response.data);

    const distanceData = response.data.rows[0]?.elements[0];
    console.log("Distance Data:", distanceData);

    if (!distanceData) {
      return NextResponse.json(
        { message: "Failed to calculate distance", error: distanceData },
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
        userId: userId,
        distance: disInKms,
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

    console.log("Created Transportation Data:", transportationData);

    return NextResponse.json({ data: transportationData });
  } catch (error) {
    // const errorMessage = error?.message || "An unknown error occurred";
    // const errorStack = error?.stack || null;
    // console.log(errorMessage, errorStack);

    return NextResponse.json(
      {
        message: "Failed to calculate distance",
        error: error
      },
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

export async function PATCH(request: NextRequest) {
  const body = await request.json();
  console.log("Request Body:", body);

  // const userId = "5dcb6f85-2f53-467c-b9d7-e4ff853b8d4a"; //logged in user id
  const userId = (await request.headers.get("x-user-id")) as string;
  const result = tsUpdateValidation.safeParse(body);

  if (!result.success) {
    console.error("Validation Error:", result.error.errors);
    return NextResponse.json({
      message: "Invalid Inputs",
      error: result.error.errors,
      status: 400
    });
  }
  const user = await prisma.transportation.findUnique({
    where: {
      id: body.bookingId
    }
  })
  
  if (!user || user.userId !== userId) {
    return NextResponse.json({
      message : "Invalid request"
    })
  }

  const origin = body.origin;
  const destination = body.destination;

  try {
    const distance = await calculateDistance(origin, destination); // Distance in meters
    const disInKms = distance / 1000;
    const ratePerKm = 26;
    const price = disInKms * ratePerKm;

    const transportationData = await prisma.transportation.update({
      where: {
        id: body.bookingId
      },
      data: {
        type: body.type,
        origin: body.origin,
        destination: body.destination,
        load: body.load,
        userId: userId,
        distance: disInKms,
        price: price,
        userConfirmBooking: true,
        loadUnit: body.loadUnit
      }
    });

    console.log("Created Transportation Data:", transportationData);

    return NextResponse.json({ data: transportationData });
  } catch (error) {
    // const errorMessage = error?.message || "An unknown error occurred";
    // const errorStack = error?.stack || null;
    // console.log(errorMessage, errorStack);

    return NextResponse.json(
      {
        message: "Failed to calculate distance",
        error: error
      },
      { status: 500 }
    );
  }
}

export async function calculateDistance(origin: string, destination: string) {
  try {
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${encodeURIComponent(
      origin
    )}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

    const response = await axios.get(url);
    console.log("Google Maps API Response:", response.data);

    const distanceData = response.data.rows[0]?.elements[0];
    console.log("Distance Data:", distanceData);

    if (!distanceData || !distanceData.distance) {
      throw new Error("Failed to retrieve distance data.");
    }

    return distanceData.distance.value; // Distance in meters
  } catch (error) {
    console.error("Error fetching distance:", error);
    throw new Error(
      "Could not calculate distance. Please check the inputs or API configuration."
    );
  }
}
