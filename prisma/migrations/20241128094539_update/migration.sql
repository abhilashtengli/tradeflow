-- DropForeignKey
ALTER TABLE "FreightBooking" DROP CONSTRAINT "FreightBooking_freightForwarderId_fkey";

-- AlterTable
ALTER TABLE "FreightBooking" ALTER COLUMN "freightForwarderId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "FreightBooking" ADD CONSTRAINT "FreightBooking_freightForwarderId_fkey" FOREIGN KEY ("freightForwarderId") REFERENCES "FreightForwarder"("id") ON DELETE SET NULL ON UPDATE CASCADE;
