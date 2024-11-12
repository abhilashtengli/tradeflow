/*
  Warnings:

  - The `distance` column on the `Transportation` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Transportation" DROP COLUMN "distance",
ADD COLUMN     "distance" INTEGER NOT NULL DEFAULT 0;
