//  get productById , updateById
import { PrismaClient } from "@prisma/client";
import { UpdateProduct } from "../productValidation/route";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();
// GetBy Id
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

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const { success } = UpdateProduct.safeParse(body);

    if (!success) {
      return NextResponse.json({
        message: "Please provide a valid input value"
      });
    }

    await prisma.product.update({
      where: {
        id: id
      },
      data: {
        name: body.name !== undefined ? body.name : undefined,
        description:
          body.description !== undefined ? body.description : undefined,
        category: body.category !== undefined ? body.category : undefined,
        quantity: body.quantity !== undefined ? body.quantity : undefined,
        price: body.price !== undefined ? body.price : undefined,
        country: body.country !== undefined ? body.country : undefined,
        isAvailable:
          body.isAvailable !== undefined ? body.isAvailable : undefined
      }
    });
  } catch (err) {
    return NextResponse.json({
      error: err
    });
  }
}
