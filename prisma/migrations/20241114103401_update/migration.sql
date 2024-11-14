/*
  Warnings:

  - You are about to drop the column `deliveryDate` on the `ProductBooking` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `ProductBooking` table. All the data in the column will be lost.
  - Added the required column `sellerId` to the `ProductBooking` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProductBooking" DROP CONSTRAINT "ProductBooking_userId_fkey";

-- AlterTable
ALTER TABLE "ProductBooking" DROP COLUMN "deliveryDate",
DROP COLUMN "userId",
ADD COLUMN     "sellerId" TEXT NOT NULL,
ALTER COLUMN "quoteId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "ProductBooking" ADD CONSTRAINT "ProductBooking_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductBooking" ADD CONSTRAINT "ProductBooking_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
