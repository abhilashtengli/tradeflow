import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";

const userUpdate = z.object({
  name: z.string().min(2).max(50).optional(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .optional(),
  email: z.string().optional(),
  country: z.string().optional()
});
const prisma = new PrismaClient();

//GetAll Users
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest) {
  try {
    const users = await prisma.user.findMany();

    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Please login!" });
    }

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

//Update Users
export async function PATCH(request: NextRequest) {
  console.log("reached be");

  try {
    // const userId = "5dcb6f85-2f53-467c-b9d7-e4ff853b8d4a";
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Please login!" });
    }

    const userId = session.user.id;

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

    const result = userUpdate.safeParse(body);

    if (!result.success) {
      return NextResponse.json({
        message: "Invalid inputs",
        errors: result.error.errors
      });
    }
    const hashedPassword = body.password
      ? await bcrypt.hash(body.password, 10)
      : undefined;

    const updatedUser = await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        name: body.name !== undefined ? body.name : undefined,
        password: body.password !== undefined ? hashedPassword : undefined,
        email: body.email !== undefined ? body.email : undefined,
        country: body.country !== undefined ? body.country : undefined
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
