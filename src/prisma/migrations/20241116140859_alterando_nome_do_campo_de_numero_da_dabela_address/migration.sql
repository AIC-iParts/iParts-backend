/*
  Warnings:

  - You are about to drop the column `number` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `number` on the `Shop` table. All the data in the column will be lost.
  - Added the required column `address_number` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address_number` to the `Shop` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Address" DROP COLUMN "number",
ADD COLUMN     "address_number" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Shop" DROP COLUMN "number",
ADD COLUMN     "address_number" INTEGER NOT NULL;
