/*
  Warnings:

  - Added the required column `productOrigin` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PAID', 'PARTIALLY_PAID', 'CANCELLED');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "productOrigin" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "ProductBooking" (
    "id" TEXT NOT NULL,
    "orderDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deliveryDate" TIMESTAMP(3),
    "quoteId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "buyerId" INTEGER NOT NULL,
    "shippingAddress" TEXT NOT NULL,
    "billingAddress" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductBooking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductQuote" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "paymentTerms" TEXT NOT NULL,
    "BuyerId" TEXT NOT NULL,
    "SellerId" TEXT NOT NULL,
    "Currency" TEXT NOT NULL,
    "PortOfOrigin" TEXT NOT NULL,
    "unit" "Unit" NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ProductQuote_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProductBooking" ADD CONSTRAINT "ProductBooking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductBooking" ADD CONSTRAINT "ProductBooking_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductQuote" ADD CONSTRAINT "ProductQuote_BuyerId_fkey" FOREIGN KEY ("BuyerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductQuote" ADD CONSTRAINT "ProductQuote_SellerId_fkey" FOREIGN KEY ("SellerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
