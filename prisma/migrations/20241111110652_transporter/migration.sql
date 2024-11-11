/*
  Warnings:

  - Made the column `password` on table `UserTransporter` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "UserTransporter" ALTER COLUMN "password" SET NOT NULL;
