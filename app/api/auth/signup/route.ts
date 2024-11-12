import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { email, password, name, role } = await req.json();

    const hashPassword = await bcrypt.hash(password, 10);

    if (role === "Buyer" || role === "Seller") {
      const user = await prisma.user.findUnique({
        where: {
          email: email
        }
      });
      const userTs = await prisma.userTransporter.findUnique({
        where: {
          email: email
        }
      });
      if (user && userTs) {
        return NextResponse.json(
          { message: "User already exists with this email address" },
          { status: 400 }
        );
      }
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
    } else if (role === "Transporter") {
      const user = await prisma.userTransporter.findUnique({
        where: {
          email: email
        }
      });
      const userTs = await prisma.userTransporter.findUnique({
        where: {
          email: email
        }
      });
      if (user && userTs) {
        return NextResponse.json(
          { message: "User already exists with this email address" }
        ), { status: 400 };
      }
      const userData = await prisma.userTransporter.create({
        data: {
          email,
          password: hashPassword,
          name,
          role
        }
      });
      return NextResponse.json({ data: userData }, { status: 200 });
    }
  } catch (err) {
    console.error("Error creating user:", err);
    return NextResponse.json(
      { message: "Error creating user " + err },
      { status: 500 }
    );
  }
}
