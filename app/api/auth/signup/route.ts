import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: {
  json: () => PromiseLike<{ email: string; password: string; name: string }>;
}) {
  try {
    const { email, password, name } = await req.json();
    const user = await prisma.user.findUnique({
      where: {
        email: email
      }
    });
    if (user) {
      return Response.json(
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
        role: "Buyer"
      }
    });
    return Response.json({
      message: "User created successfully",
      user: newUser
    });
  } catch (err) {
    console.error("Error creating user:", err);
    return Response.json({
      message: "Error creating user " + err,
      status: 500
    });
  }
}
