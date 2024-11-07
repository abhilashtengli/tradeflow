import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { email, password, name, role } = await req.json();
    const user = await prisma.user.findUnique({
      where: {
        email: email
      }
    });
    if (user) {
      return NextResponse.json(
        {
          message: "User already exists"
        },
        {
          status: 400
        }
      );
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashPassword,
        name,
        role
      }
    });
    return NextResponse.json({
      message: "User created successfully",
      user: newUser
    });
  } catch (err) {
    console.error("Error creating user:", err);
    return NextResponse.json(
      { message: "Error creating user " + err },
      { status: 500 }
    );
  }
}
