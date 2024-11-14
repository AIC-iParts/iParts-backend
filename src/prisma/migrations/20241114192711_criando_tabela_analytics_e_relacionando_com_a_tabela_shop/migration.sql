-- CreateTable
CREATE TABLE "Analytcs" (
    "id_alytics" SERIAL NOT NULL,
    "total_sales" DOUBLE PRECISION,
    "total_sales_last_year" DOUBLE PRECISION,
    "total_sales_last_semester" DOUBLE PRECISION,
    "total_sales_last_month" DOUBLE PRECISION,
    "total_sales_last_week" DOUBLE PRECISION,
    "id_shop" INTEGER NOT NULL,

    CONSTRAINT "Analytcs_pkey" PRIMARY KEY ("id_alytics")
);

-- AddForeignKey
ALTER TABLE "Analytcs" ADD CONSTRAINT "Analytcs_id_shop_fkey" FOREIGN KEY ("id_shop") REFERENCES "Shop"("id_shop") ON DELETE RESTRICT ON UPDATE CASCADE;
