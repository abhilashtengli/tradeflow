import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { email, password, name, role } = await req.json();

    const hashPassword = await bcrypt.hash(password, 10);

    // Check for existing user in any table
    const existingUser =
      (await prisma.user.findUnique({ where: { email } })) ||
      (await prisma.userTransporter.findUnique({ where: { email } })) ||
      (await prisma.freightForwarder.findUnique({ where: { email } }));

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists with this email address" },
        { status: 400 }
      );
    }

    let newUser;
    switch (role) {
      case "Buyer":
      case "Seller":
        newUser = await prisma.user.create({
          data: { email, password: hashPassword, name, role }
        });
        break;
      case "Transporter":
        newUser = await prisma.userTransporter.create({
          data: { email, password: hashPassword, name, role }
        });
        break;
      case "FreightForwarder":
        newUser = await prisma.freightForwarder.create({
          data: { email, password: hashPassword, name, role }
        });
        break;
      default:
        return NextResponse.json(
          { message: "Invalid role specified" },
          { status: 400 }
        );
    }

    return NextResponse.json(
      { message: "User created successfully", user: newUser },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error creating user:", err);
    return NextResponse.json(
      { message: `Error creating user: ${err}` },
      { status: 500 }
    );
  }
}
