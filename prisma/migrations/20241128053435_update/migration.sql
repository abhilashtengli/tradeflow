/*
  Warnings:

  - You are about to drop the column `location` on the `FreightForwarder` table. All the data in the column will be lost.
  - You are about to drop the column `pendingQuotes` on the `FreightQuote` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "FreightForwarder" DROP COLUMN "location";

-- AlterTable
ALTER TABLE "FreightQuote" DROP COLUMN "pendingQuotes",
ADD COLUMN     "pendingQuote" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "price" DROP NOT NULL;
