/*
  Warnings:

  - Added the required column `unit` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Unit" AS ENUM ('pcs', 'box', 'kg', 'grams', 'tons', 'cm', 'meter', 'inche', 'feet');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "unit" "Unit" NOT NULL;
