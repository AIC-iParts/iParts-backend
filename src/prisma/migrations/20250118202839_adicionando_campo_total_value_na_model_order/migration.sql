/*
  Warnings:

  - Added the required column `total_value` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "total_value" DOUBLE PRECISION NOT NULL;
