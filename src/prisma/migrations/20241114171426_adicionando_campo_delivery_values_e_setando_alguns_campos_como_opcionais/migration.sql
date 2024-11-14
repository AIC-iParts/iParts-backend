-- AlterTable
ALTER TABLE "Client" ALTER COLUMN "phone" DROP NOT NULL,
ALTER COLUMN "date_of_birth" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "serial_number" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Shop" ADD COLUMN     "delivery_value" DOUBLE PRECISION,
ALTER COLUMN "fundation_date" DROP NOT NULL,
ALTER COLUMN "complement" DROP NOT NULL,
ALTER COLUMN "complement" DROP DEFAULT;
