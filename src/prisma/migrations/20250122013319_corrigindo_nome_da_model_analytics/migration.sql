/*
  Warnings:

  - You are about to drop the `Analytcs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Analytcs" DROP CONSTRAINT "Analytcs_id_shop_fkey";

-- DropTable
DROP TABLE "Analytcs";

-- CreateTable
CREATE TABLE "Analytics" (
    "id" SERIAL NOT NULL,
    "total_sales" DOUBLE PRECISION,
    "total_sales_last_year" DOUBLE PRECISION,
    "total_sales_last_semester" DOUBLE PRECISION,
    "total_sales_last_month" DOUBLE PRECISION,
    "total_sales_last_week" DOUBLE PRECISION,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "id_shop" INTEGER NOT NULL,

    CONSTRAINT "Analytics_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Analytics" ADD CONSTRAINT "Analytics_id_shop_fkey" FOREIGN KEY ("id_shop") REFERENCES "Shop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
