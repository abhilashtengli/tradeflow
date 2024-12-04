import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import axios from "axios";

const tsValidation = z.object({
  type: z.string(),
  origin: z.string(),
  destination: z.string(),
  load: z.number()
});

const prisma = new PrismaClient();

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();

  const { id } = await params;

  const { success } = tsValidation.safeParse(body);

  if (!success) {
    return NextResponse.json({
      message: "Invalid inputs"
    });
  }
  const origin = body.origin !== undefined ? body.origin : undefined;
  const destination =
    body.destination !== undefined ? body.destination : undefined;

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

    const transportationData = await prisma.transportation.update({
      where: {
        id: id
      },
      data: {
        type: body.type !== undefined ? body.type : undefined,
        origin: body.origin !== undefined ? body.origin : undefined,
        destination:
          body.destination !== undefined ? body.destination : undefined,
        load: body.load !== undefined ? body.load : undefined,
        distance,
        price: price
      }
    });

    return NextResponse.json({ transportationData });
  } catch (err) {
    return NextResponse.json({ error: err });
  }
}

export async function GET({ params }: { params: { id: string } }) {
  try {
    const { id } = await params;

    const transportationData = await prisma.transportation.findUnique({
      where: {
        id: id
      },
      select: {
        type: true,
        origin: true,
        destination: true,
        load: true,
        distance: true,
        price: true,
        accepted: true,
        dispatched: true,
        delivered: true,

        transporter: {
          select: {
            name: true,
            email: true,
            companyName: true,
            companyAddress: true
          }
        }
      }
    });
    if (!transportationData) {
      return NextResponse.json({
        message: "There is no booking information "
      });
    }
    return NextResponse.json({
      data: transportationData
    });
  } catch (err) {
    return NextResponse.json({ error: err });
  }
}
