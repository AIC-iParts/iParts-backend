/*
  Warnings:

  - You are about to drop the column `city` on the `Shop` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `Shop` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `Shop` table. All the data in the column will be lost.
  - Added the required column `id_city` to the `Shop` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Shop" DROP COLUMN "city",
DROP COLUMN "country",
DROP COLUMN "state",
ADD COLUMN     "id_city" INTEGER NOT NULL,
ADD COLUMN     "opened" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "Shop" ADD CONSTRAINT "Shop_id_city_fkey" FOREIGN KEY ("id_city") REFERENCES "City"("id_city") ON DELETE RESTRICT ON UPDATE CASCADE;

-- InsertInCountry
INSERT INTO "Country" (name, country_code, created_at, updated_at)
VALUES ('Brasil', 'BR', current_timestamp, current_timestamp);
