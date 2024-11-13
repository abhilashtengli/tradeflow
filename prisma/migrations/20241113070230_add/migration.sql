-- AlterTable
ALTER TABLE "FreightBooking" ADD COLUMN     "price" DOUBLE PRECISION,
ALTER COLUMN "freightForwarderId" SET DEFAULT 'not yet accepted ',
ALTER COLUMN "arrivalDate" DROP NOT NULL,
ALTER COLUMN "arrivalDate" SET DEFAULT CURRENT_TIMESTAMP;
