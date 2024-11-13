-- CreateTable
CREATE TABLE "Shop" (
    "id_shop" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "fundation_date" TIMESTAMP(3) NOT NULL,
    "street" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "cep" INTEGER NOT NULL,
    "complement" TEXT NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "long" DOUBLE PRECISION NOT NULL,
    "register_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "register_update_date" TIMESTAMP(3) NOT NULL,
    "account_status" TEXT NOT NULL DEFAULT 'Active',

    CONSTRAINT "Shop_pkey" PRIMARY KEY ("id_shop")
);

-- CreateIndex
CREATE UNIQUE INDEX "Shop_cnpj_key" ON "Shop"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "Shop_email_key" ON "Shop"("email");
