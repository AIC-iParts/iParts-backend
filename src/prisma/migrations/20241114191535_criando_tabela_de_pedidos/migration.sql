-- CreateTable
CREATE TABLE "Order" (
    "id_order" SERIAL NOT NULL,
    "status" TEXT,
    "observations" TEXT,
    "delivery_value" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "id_shop" INTEGER NOT NULL,
    "id_client" INTEGER NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id_order")
);

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_id_shop_fkey" FOREIGN KEY ("id_shop") REFERENCES "Shop"("id_shop") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_id_client_fkey" FOREIGN KEY ("id_client") REFERENCES "Client"("id_client") ON DELETE RESTRICT ON UPDATE CASCADE;
