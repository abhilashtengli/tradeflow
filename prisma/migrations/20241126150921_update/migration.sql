/*
  Warnings:

  - You are about to drop the column `companyAddres` on the `UserTransporter` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserTransporter" DROP COLUMN "companyAddres",
ADD COLUMN     "companyAddress" TEXT;
