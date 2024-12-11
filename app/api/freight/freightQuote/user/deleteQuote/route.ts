import authOptions from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
const prisma = new PrismaClient();

const validateId = z.object({
  quoteId: z.string()
});
export async function DELETE(request: NextRequest) {
  // here add logged in user id
  // const userId = "5dcb6f85-2f53-467c-b9d7-e4ff853b8d4a";

  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Please login!" });
  }

  const userId = session?.user.id;

  try {
    const body = await request.json();
    console.log(body);

    const result = validateId.safeParse(body);

    if (!result.success) {
      return NextResponse.json({
        message: "Quote Id is not valid",
        error: result.error.errors
      });
    }
    const Quote = await prisma.freightQuote.findUnique({
      where: {
        id: body.quoteId
      }
    });

    if (Quote?.id !== body.quoteId) {
      return NextResponse.json({
        message: "Quote Id is not valid"
      });
    } else if (Quote?.userId !== userId) {
      return NextResponse.json({
        message: "You cannot perform this action"
      });
    }
    const response = await prisma.freightQuote.delete({
      where: {
        id: body.quoteId
      }
    });
    return NextResponse.json({
      message: "Quote is deleted successfully",
      data: response
    });
  } catch (err) {
    return NextResponse.json({
      message: "Could not perform delete operation",
      error: err
    });
  }
}
