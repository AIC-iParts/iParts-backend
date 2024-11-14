-- CreateTable
CREATE TABLE "Product" (
    "id_product" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "category" TEXT NOT NULL,
    "manucafturer" TEXT NOT NULL,
    "serial_number" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,
    "lenght" DOUBLE PRECISION NOT NULL,
    "width" DOUBLE PRECISION NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "id_shop" INTEGER NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id_product")
);

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_id_shop_fkey" FOREIGN KEY ("id_shop") REFERENCES "Shop"("id_shop") ON DELETE RESTRICT ON UPDATE CASCADE;
