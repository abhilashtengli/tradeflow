import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import bcrypt from "bcryptjs";

const userUpdate = z.object({
  name: z.string().min(2).max(50),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.enum(["Buyer", "Seller"])
});
const prisma = new PrismaClient();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest) {
  try {
    const users = await prisma.user.findMany();

    return NextResponse.json({
      users: users
    });
  } catch (err) {
    return NextResponse.json(
      { message: "Error fetching users", error: err },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id") as string;

    const user = await prisma.user.findUnique({
      where: {
        id: userId
      }
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "Invalid user"
        },
        { status: 404 }
      );
    }

    const body = await request.json();

    const { success } = userUpdate.safeParse(body);

    if (!success) {
      return NextResponse.json({ message: "Invalid inputs" }, { status: 400 });
    }
    const hashedPassword = body.password
      ? await bcrypt.hash(body.password, 10)
      : undefined;

    const updatedUser = await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        name: body.name,
        password: hashedPassword || user.password,
        role: body.role
      }
    });

    return NextResponse.json({
      user: updatedUser,
      message: "Updated successfully",
      status: 200
    });
  } catch (err) {
    return NextResponse.json({ message: "User not found", error: err });
  }
}
