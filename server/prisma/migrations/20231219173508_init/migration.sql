-- CreateEnum
CREATE TYPE "BottleType" AS ENUM ('PET', 'GLASS');

-- CreateTable
CREATE TABLE "Bottle" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "BottleType" NOT NULL,
    "weight" INTEGER NOT NULL,
    "cycles" INTEGER NOT NULL,

    CONSTRAINT "Bottle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Process" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "WC" DOUBLE PRECISION NOT NULL,
    "NRG" DOUBLE PRECISION NOT NULL,
    "CO2" DOUBLE PRECISION NOT NULL,
    "BottleType" "BottleType" NOT NULL,

    CONSTRAINT "Process_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Bottle_name_key" ON "Bottle"("name");
