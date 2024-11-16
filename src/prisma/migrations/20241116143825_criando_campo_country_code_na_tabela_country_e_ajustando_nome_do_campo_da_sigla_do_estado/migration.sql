/*
  Warnings:

  - You are about to drop the column `uf` on the `State` table. All the data in the column will be lost.
  - Added the required column `country_code` to the `Country` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state_code` to the `State` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Country" ADD COLUMN     "country_code" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "State" DROP COLUMN "uf",
ADD COLUMN     "state_code" TEXT NOT NULL;
