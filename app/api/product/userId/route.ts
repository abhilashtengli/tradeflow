import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";

const prisma = new PrismaClient();

//get all my products which  I have posted

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest) {
  try {
    // const userId = request.headers.get("x-user-id") as string;

    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Please login!" });
    }

    const userId = session.user.id;

    // const userId = "81720a24-1739-43e2-89a6-baff01d18cb5";

    const userProducts = await prisma.product.findMany({
      where: {
        userId: userId
      }
    });
    return NextResponse.json({
      products: userProducts
    });
  } catch (err) {
    return NextResponse.json({
      error: err
    });
  }
}
