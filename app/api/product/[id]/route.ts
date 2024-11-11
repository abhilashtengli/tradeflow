//  get productById , updateById

import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;

    const product = await prisma.product.findUnique({
      where: {
        id: id
      },
      select: {
        name: true,
        description: true,
        category: true,
        price: true,
        isAvailable: true,
        quantity: true,
        user: {
          select: {
            name: true,
            email: true,
            role: true
          }
        }
      }
    });
    if (!product) {
      return NextResponse.json({
        message: "No Product found"
      });
    }
    return NextResponse.json(
      {
        product: product
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({
      error: err
    });
  }
}
