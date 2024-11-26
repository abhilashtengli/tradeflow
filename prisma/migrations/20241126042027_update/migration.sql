/*
  Warnings:

  - Changed the type of `type` on the `Transportation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TruckType" AS ENUM ('Flatbed_Truck', 'Box_Truck', 'Pickup_Truck', 'Refrigerated_Truck', 'Car_Carrier_Truck', 'Tow_Truck', 'Heavy_Hauler', 'Curtain_Side_Truck');

-- AlterTable
ALTER TABLE "Transportation" DROP COLUMN "type",
ADD COLUMN     "type" "TruckType" NOT NULL;
