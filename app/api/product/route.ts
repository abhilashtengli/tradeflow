// Create product , get All product , Update Product , delete Product
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { CreateProduct, UpdateProduct } from "./productValidation/route";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  console.log("reached be");

  try {
    // const userId = "5dcb6f85-2f53-467c-b9d7-e4ff853b8d4a";
    // const userId = (await request.headers.get("x-user-id")) as string;

    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Please login!" });
    }

    const userId = session.user.id;

    const body = await request.json();
    console.log(body);

    const result = CreateProduct.safeParse(body);

    if (!result.success) {
      console.log(result.error.errors);

      return NextResponse.json({
        message: "Invalid parameters given",
        errors: result.error.errors
      });
    }
    console.log("reached present");

    const isPresent = await prisma.product.findFirst({
      where: {
        name: body.name,
        userId: userId
      }
    });
    console.log(isPresent);

    if (isPresent) {
      return NextResponse.json({ message: "Product already exists" });
    }
    console.log("reached add be");

    const newProduct = await prisma.product.create({
      data: {
        name: body.name,
        description: body.description,
        category: body.category,
        quantity: body.quantity,
        price: body.price,
        unit: body.unit,
        country: body.country,
        productOrigin: body.productOrigin,
        isAvailable: body.isAvailable,
        currency: body.currency,
        userId: userId
      }
    });

    return NextResponse.json(
      {
        product: newProduct
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ error: err });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();

    const product = await prisma.product.findUnique({
      where: {
        id: id
      }
    });
    if (!product) {
      return NextResponse.json(
        {
          message: "No product found"
        },
        { status: 400 }
      );
    }

    await prisma.product.delete({
      where: {
        id: product.id
      }
    });
    return NextResponse.json({
      message: "success"
    });
  } catch (err) {
    return NextResponse.json({
      error: err || "An unknown error occurred"
    });
  }
}

//Get all products
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest) {
  console.log("reached");

  const session = getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Please login!" });
  }

  try {
    const products = await prisma.product.findMany();

    console.log(products);
    return NextResponse.json({
      data: products
    });
  } catch (err) {
    return NextResponse.json({
      error: err
    });
  }
}

export async function PATCH(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Please login!" });
  }
  try {
    const body = await request.json();

    const result = UpdateProduct.safeParse(body);

    if (!result.success) {
      return NextResponse.json({
        message: "Invalid inputs",
        error: result.error.errors
      });
    }

    const response = await prisma.product.update({
      where: {
        id: body.productId
      },
      data: {
        name: body.name !== "" ? body.name : undefined,
        description: body.description !== "" ? body.description : undefined,
        category: body.category !== "" ? body.category : undefined,
        quantity: body.quantity !== 0 ? body.quantity : undefined,
        price: body.price !== 0 ? body.price : undefined,
        unit: body.unit !== "" ? body.unit : undefined,
        country: body.country !== "" ? body.country : undefined,
        productOrigin:
          body.productOrigin !== "" ? body.productOrigin : undefined,
        isAvailable:
          body.isAvailable !== undefined ? body.isAvailable : undefined,
        currency: body.currency !== "" ? body.currency : undefined
      }
    });

    return NextResponse.json({
      message: "success",
      data: response
    });
  } catch (err) {
    return NextResponse.json({
      message: "Something went wrong",
      error: err
    });
  }
}
