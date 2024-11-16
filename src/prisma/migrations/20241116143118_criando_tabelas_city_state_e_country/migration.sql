/*
  Warnings:

  - You are about to drop the column `city` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `Address` table. All the data in the column will be lost.
  - Added the required column `id_city` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Address" DROP COLUMN "city",
DROP COLUMN "state",
ADD COLUMN     "id_city" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "City" (
    "id_city" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "id_state" INTEGER NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id_city")
);

-- CreateTable
CREATE TABLE "State" (
    "id_state" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "uf" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "id_country" INTEGER NOT NULL,

    CONSTRAINT "State_pkey" PRIMARY KEY ("id_state")
);

-- CreateTable
CREATE TABLE "Country" (
    "id_country" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id_country")
);

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_id_city_fkey" FOREIGN KEY ("id_city") REFERENCES "City"("id_city") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_id_state_fkey" FOREIGN KEY ("id_state") REFERENCES "State"("id_state") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "State" ADD CONSTRAINT "State_id_country_fkey" FOREIGN KEY ("id_country") REFERENCES "Country"("id_country") ON DELETE RESTRICT ON UPDATE CASCADE;
