/*
  Warnings:

  - Added the required column `capacity` to the `Bottle` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bottle" ADD COLUMN     "capacity" DOUBLE PRECISION NOT NULL;
