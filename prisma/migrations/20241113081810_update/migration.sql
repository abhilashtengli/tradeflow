-- CreateTable
CREATE TABLE "FreightQuote" (
    "id" TEXT NOT NULL,
    "freightForwarderId" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "isAccepted" BOOLEAN NOT NULL,

    CONSTRAINT "FreightQuote_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FreightQuote" ADD CONSTRAINT "FreightQuote_freightForwarderId_fkey" FOREIGN KEY ("freightForwarderId") REFERENCES "FreightForwarder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FreightQuote" ADD CONSTRAINT "FreightQuote_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "FreightBooking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
