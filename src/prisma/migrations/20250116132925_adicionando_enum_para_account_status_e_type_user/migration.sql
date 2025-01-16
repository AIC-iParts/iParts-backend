/*
  Warnings:

  - The `account_status` column on the `Client` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `type_user` column on the `Client` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `account_status` column on the `Shop` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `type_user` column on the `Shop` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "AccountStatus" AS ENUM ('Active', 'Inactive', 'Suspended');

-- CreateEnum
CREATE TYPE "TypeUser" AS ENUM ('shop', 'client');

-- AlterTable
ALTER TABLE "Client" DROP COLUMN "account_status",
ADD COLUMN     "account_status" "AccountStatus" NOT NULL DEFAULT 'Active',
DROP COLUMN "type_user",
ADD COLUMN     "type_user" "TypeUser" NOT NULL DEFAULT 'client';

-- AlterTable
ALTER TABLE "Shop" DROP COLUMN "account_status",
ADD COLUMN     "account_status" "AccountStatus" NOT NULL DEFAULT 'Active',
DROP COLUMN "type_user",
ADD COLUMN     "type_user" "TypeUser" NOT NULL DEFAULT 'shop';
