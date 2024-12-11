import authOptions from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// Get All the transportation clients
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest) {
  // const userId = "30f0e50e-99da-456c-b873-b19565c451b0";
  // const userId = (await request.headers.get("x-user-id")) as string;

  
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Please login!" });
  }

  const userId = session.user.id;
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
