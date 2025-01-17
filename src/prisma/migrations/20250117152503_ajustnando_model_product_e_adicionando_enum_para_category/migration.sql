/*
  Warnings:

  - You are about to drop the column `manucafturer` on the `Product` table. All the data in the column will be lost.
  - Added the required column `manufacturer` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `category` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ProductCategory" AS ENUM ('mecanica', 'suspensao', 'freio', 'interna', 'externa', 'eletrica', 'injecao', 'autocare', 'outro');

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "manucafturer",
ADD COLUMN     "manufacturer" TEXT NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
DROP COLUMN "category",
ADD COLUMN     "category" "ProductCategory" NOT NULL;
