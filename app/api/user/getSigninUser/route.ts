// import { getAuthToken } from "@/lib/getToken";
import authOptions from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
// import { cookies } from "next/headers";

import { NextResponse } from "next/server";

const prisma = new PrismaClient();

//GetUser
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET() {
  // const id = (await req.headers.get("x-user-id")) as string;
  // const cookieStore = await cookies();
  // const allCookies = [...cookieStore.entries()]; // Get all cookies
  // console.log("All cookies:", allCookies);
  const id = "627826c7-0e32-4a01-ac93-0f4cbd05e169";
  const session = await getServerSession(authOptions);

  console.log("Session", session);
  // con

  console.log(
    "Reached---------------------------------------------------------------------------------------"
  );

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        country: true
      }
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ data: user }, { status: 200 });
  } catch (err) {
    return NextResponse.json({
      error: err,
      message: "Error fetching user"
    });
  }
}
