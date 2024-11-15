/*
  Warnings:

  - You are about to drop the column `isVesselDispatched` on the `ProductBooking` table. All the data in the column will be lost.
  - You are about to drop the column `totalAmount` on the `ProductBooking` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProductBooking" DROP COLUMN "isVesselDispatched",
DROP COLUMN "totalAmount",
ADD COLUMN     "bookingConfirm" BOOLEAN NOT NULL DEFAULT false;
