/*
  Warnings:

  - You are about to drop the column `BuyerId` on the `ProductQuote` table. All the data in the column will be lost.
  - You are about to drop the column `Currency` on the `ProductQuote` table. All the data in the column will be lost.
  - You are about to drop the column `PortOfOrigin` on the `ProductQuote` table. All the data in the column will be lost.
  - You are about to drop the column `SellerId` on the `ProductQuote` table. All the data in the column will be lost.
  - Added the required column `buyerId` to the `ProductQuote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sellerId` to the `ProductQuote` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProductQuote" DROP CONSTRAINT "ProductQuote_BuyerId_fkey";

-- DropForeignKey
ALTER TABLE "ProductQuote" DROP CONSTRAINT "ProductQuote_SellerId_fkey";

-- AlterTable
ALTER TABLE "ProductQuote" DROP COLUMN "BuyerId",
DROP COLUMN "Currency",
DROP COLUMN "PortOfOrigin",
DROP COLUMN "SellerId",
ADD COLUMN     "buyerId" TEXT NOT NULL,
ADD COLUMN     "currency" "Currency",
ADD COLUMN     "portOfOrigin" TEXT,
ADD COLUMN     "sellerId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ProductQuote" ADD CONSTRAINT "ProductQuote_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductQuote" ADD CONSTRAINT "ProductQuote_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
