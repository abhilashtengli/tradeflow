-- DropForeignKey
ALTER TABLE "FreightQuote" DROP CONSTRAINT "FreightQuote_freightForwarderId_fkey";

-- AlterTable
ALTER TABLE "FreightQuote" ALTER COLUMN "freightForwarderId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "FreightQuote" ADD CONSTRAINT "FreightQuote_freightForwarderId_fkey" FOREIGN KEY ("freightForwarderId") REFERENCES "FreightForwarder"("id") ON DELETE SET NULL ON UPDATE CASCADE;
