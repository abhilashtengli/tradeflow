/*
  Warnings:

  - You are about to drop the column `accepted` on the `FreightBooking` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "FreightBooking" DROP COLUMN "accepted",
ADD COLUMN     "freightIsAccepted" BOOLEAN NOT NULL DEFAULT false;
