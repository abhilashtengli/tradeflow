-- CreateEnum
CREATE TYPE "ContainerType" AS ENUM ('Type_20', 'Type_40');

-- CreateTable
CREATE TABLE "FreightForwarder" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "services" TEXT NOT NULL,

    CONSTRAINT "FreightForwarder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FreightBooking" (
    "id" TEXT NOT NULL,
    "freightForwarderId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "containerType" "ContainerType" NOT NULL,
    "origin" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "departureDate" TIMESTAMP(3) NOT NULL,
    "arrivalDate" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FreightBooking_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FreightBooking" ADD CONSTRAINT "FreightBooking_freightForwarderId_fkey" FOREIGN KEY ("freightForwarderId") REFERENCES "FreightForwarder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FreightBooking" ADD CONSTRAINT "FreightBooking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
