/*
  Warnings:

  - You are about to drop the column `contact` on the `FreightForwarder` table. All the data in the column will be lost.
  - You are about to drop the column `services` on the `FreightForwarder` table. All the data in the column will be lost.
  - Added the required column `password` to the `FreightForwarder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FreightForwarder" DROP COLUMN "contact",
DROP COLUMN "services",
ADD COLUMN     "companyAddress" TEXT,
ADD COLUMN     "companyName" TEXT,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'FreightForwarder',
ALTER COLUMN "country" DROP NOT NULL,
ALTER COLUMN "location" DROP NOT NULL;
