/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `UserTransporter` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserTransporter_email_key" ON "UserTransporter"("email");
