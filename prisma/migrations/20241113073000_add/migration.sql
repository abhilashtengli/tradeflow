/*
  Warnings:

  - The `userConfirm` column on the `FreightBooking` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "confirmFreightBooking" AS ENUM ('accepted', 'rejected');

-- AlterTable
ALTER TABLE "FreightBooking" DROP COLUMN "userConfirm",
ADD COLUMN     "userConfirm" "confirmFreightBooking";
