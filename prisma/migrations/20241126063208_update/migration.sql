-- DropForeignKey
ALTER TABLE "Transportation" DROP CONSTRAINT "Transportation_transporterId_fkey";

-- AlterTable
ALTER TABLE "Transportation" ALTER COLUMN "transporterId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Transportation" ADD CONSTRAINT "Transportation_transporterId_fkey" FOREIGN KEY ("transporterId") REFERENCES "UserTransporter"("id") ON DELETE SET NULL ON UPDATE CASCADE;
