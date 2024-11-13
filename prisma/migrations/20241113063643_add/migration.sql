/*
  Warnings:

  - Added the required column `load` to the `FreightBooking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `noOfContainers` to the `FreightBooking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FreightBooking" ADD COLUMN     "load" INTEGER NOT NULL,
ADD COLUMN     "noOfContainers" INTEGER NOT NULL;
