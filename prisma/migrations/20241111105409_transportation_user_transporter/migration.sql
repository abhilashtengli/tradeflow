/*
  Warnings:

  - Added the required column `transporterId` to the `Transportation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transportation" ADD COLUMN     "transporterId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "country" TEXT NOT NULL DEFAULT 'India';

-- CreateTable
CREATE TABLE "UserTransporter" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "companyAddres" TEXT NOT NULL,

    CONSTRAINT "UserTransporter_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Transportation" ADD CONSTRAINT "Transportation_transporterId_fkey" FOREIGN KEY ("transporterId") REFERENCES "UserTransporter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
