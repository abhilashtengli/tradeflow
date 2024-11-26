/*
  Warnings:

  - Added the required column `loadUnit` to the `Transportation` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "LoadUnit" AS ENUM ('tons', 'Kilograms', 'Pounds');

-- AlterTable
ALTER TABLE "Transportation" ADD COLUMN     "loadUnit" "LoadUnit" NOT NULL;
