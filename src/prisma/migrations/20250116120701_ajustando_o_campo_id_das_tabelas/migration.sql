/*
  Warnings:

  - The primary key for the `Address` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_address` on the `Address` table. All the data in the column will be lost.
  - The primary key for the `Analytcs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_alytics` on the `Analytcs` table. All the data in the column will be lost.
  - The primary key for the `City` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_city` on the `City` table. All the data in the column will be lost.
  - The primary key for the `Client` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_client` on the `Client` table. All the data in the column will be lost.
  - The primary key for the `Country` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_country` on the `Country` table. All the data in the column will be lost.
  - The primary key for the `Order` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_order` on the `Order` table. All the data in the column will be lost.
  - The primary key for the `OrderProduct` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_order_product` on the `OrderProduct` table. All the data in the column will be lost.
  - The primary key for the `Product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_product` on the `Product` table. All the data in the column will be lost.
  - The primary key for the `Shop` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_shop` on the `Shop` table. All the data in the column will be lost.
  - The primary key for the `State` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_state` on the `State` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_id_city_fkey";

-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_id_client_fkey";

-- DropForeignKey
ALTER TABLE "Analytcs" DROP CONSTRAINT "Analytcs_id_shop_fkey";

-- DropForeignKey
ALTER TABLE "City" DROP CONSTRAINT "City_id_state_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_id_client_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_id_shop_fkey";

-- DropForeignKey
ALTER TABLE "OrderProduct" DROP CONSTRAINT "OrderProduct_id_order_fkey";

-- DropForeignKey
ALTER TABLE "OrderProduct" DROP CONSTRAINT "OrderProduct_id_product_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_id_shop_fkey";

-- DropForeignKey
ALTER TABLE "Shop" DROP CONSTRAINT "Shop_id_city_fkey";

-- DropForeignKey
ALTER TABLE "State" DROP CONSTRAINT "State_id_country_fkey";

-- AlterTable
ALTER TABLE "Address" DROP CONSTRAINT "Address_pkey",
DROP COLUMN "id_address",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Address_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Analytcs" DROP CONSTRAINT "Analytcs_pkey",
DROP COLUMN "id_alytics",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Analytcs_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "City" DROP CONSTRAINT "City_pkey",
DROP COLUMN "id_city",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "City_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Client" DROP CONSTRAINT "Client_pkey",
DROP COLUMN "id_client",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Client_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Country" DROP CONSTRAINT "Country_pkey",
DROP COLUMN "id_country",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Country_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Order" DROP CONSTRAINT "Order_pkey",
DROP COLUMN "id_order",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Order_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "OrderProduct" DROP CONSTRAINT "OrderProduct_pkey",
DROP COLUMN "id_order_product",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "OrderProduct_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Product" DROP CONSTRAINT "Product_pkey",
DROP COLUMN "id_product",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Product_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Shop" DROP CONSTRAINT "Shop_pkey",
DROP COLUMN "id_shop",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Shop_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "State" DROP CONSTRAINT "State_pkey",
DROP COLUMN "id_state",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "State_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Shop" ADD CONSTRAINT "Shop_id_city_fkey" FOREIGN KEY ("id_city") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_id_city_fkey" FOREIGN KEY ("id_city") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_id_client_fkey" FOREIGN KEY ("id_client") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_id_state_fkey" FOREIGN KEY ("id_state") REFERENCES "State"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "State" ADD CONSTRAINT "State_id_country_fkey" FOREIGN KEY ("id_country") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_id_shop_fkey" FOREIGN KEY ("id_shop") REFERENCES "Shop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_id_shop_fkey" FOREIGN KEY ("id_shop") REFERENCES "Shop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_id_client_fkey" FOREIGN KEY ("id_client") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderProduct" ADD CONSTRAINT "OrderProduct_id_order_fkey" FOREIGN KEY ("id_order") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderProduct" ADD CONSTRAINT "OrderProduct_id_product_fkey" FOREIGN KEY ("id_product") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Analytcs" ADD CONSTRAINT "Analytcs_id_shop_fkey" FOREIGN KEY ("id_shop") REFERENCES "Shop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
