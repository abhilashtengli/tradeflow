/*
  Warnings:

  - Added the required column `load` to the `Transportation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transportation" ADD COLUMN     "load" INTEGER NOT NULL;
