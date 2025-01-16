-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "type_user" TEXT NOT NULL DEFAULT 'client';

-- AlterTable
ALTER TABLE "Shop" ADD COLUMN     "type_user" TEXT NOT NULL DEFAULT 'shop';
