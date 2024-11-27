/*
  Warnings:

  - Added the required column `productUnit` to the `FreightBooking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FreightBooking" ADD COLUMN     "isDelivered" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "paymentStatus" "PaymentStatus" DEFAULT 'PENDING',
ADD COLUMN     "product" TEXT,
ADD COLUMN     "productUnit" "Unit" NOT NULL;

-- AlterTable
ALTER TABLE "FreightQuote" ADD COLUMN     "currency" "Currency",
ADD COLUMN     "pendingQuotes" BOOLEAN NOT NULL DEFAULT true;
