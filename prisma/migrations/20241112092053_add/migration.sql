-- AlterTable
ALTER TABLE "Transportation" ADD COLUMN     "accepted" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "price" SET DEFAULT 0,
ALTER COLUMN "dispatched" SET DEFAULT false,
ALTER COLUMN "delivered" SET DEFAULT false,
ALTER COLUMN "transporterId" SET DEFAULT 'not yet accepted ';
