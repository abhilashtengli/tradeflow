-- AlterTable
ALTER TABLE "ProductBooking" ALTER COLUMN "quoteId" DROP NOT NULL,
ALTER COLUMN "billingAddress" DROP NOT NULL,
ALTER COLUMN "totalAmount" DROP NOT NULL;
