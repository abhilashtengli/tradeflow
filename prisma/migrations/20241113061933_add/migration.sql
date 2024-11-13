/*
  Warnings:

  - You are about to drop the column `status` on the `FreightBooking` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "FreightBooking" DROP COLUMN "status",
ADD COLUMN     "accepted" BOOLEAN NOT NULL DEFAULT false;
