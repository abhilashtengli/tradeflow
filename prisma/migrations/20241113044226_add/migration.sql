/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `FreightForwarder` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "FreightForwarder_email_key" ON "FreightForwarder"("email");
