/*
  Warnings:

  - The `Currency` column on the `ProductQuote` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "ProductQuote" DROP COLUMN "Currency",
ADD COLUMN     "Currency" "Currency";
