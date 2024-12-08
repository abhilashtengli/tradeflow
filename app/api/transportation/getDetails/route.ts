import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// Get All the transportation clients
export async function GET(request: NextRequest) {
  // const userId = "30f0e50e-99da-456c-b873-b19565c451b0";
  const userId = (await request.headers.get("x-user-id")) as string;
  try {
    const acceptedData = await prisma.transportation.findMany({
      where: {
        transporterId: userId,
        accepted: true,
        dispatched: false,
        delivered: false
      }
    });
    const dispatchedData = await prisma.transportation.findMany({
      where: {
        transporterId: userId,
        accepted: true,
        dispatched: true,
        delivered: false
      }
    });
    const deliveredData = await prisma.transportation.findMany({
      where: {
        transporterId: userId,
        accepted: true,
        dispatched: true,
        delivered: true
      }
    });

    return NextResponse.json({
      acceptedData: acceptedData,
      dispatchedData: dispatchedData,
      deliveredData: deliveredData
    });
  } catch (err) {
    return NextResponse.json({
      message: "Error fetching data",
      error: err
    });
  }
}
