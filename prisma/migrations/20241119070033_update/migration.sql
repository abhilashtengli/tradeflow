-- AlterTable
ALTER TABLE "ProductQuote" ADD COLUMN     "pendingQuotes" BOOLEAN NOT NULL DEFAULT true;

-- AddForeignKey
ALTER TABLE "ProductQuote" ADD CONSTRAINT "ProductQuote_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
