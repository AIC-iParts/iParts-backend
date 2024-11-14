-- CreateTable
CREATE TABLE "Address" (
    "id_address" SERIAL NOT NULL,
    "name" TEXT,
    "cep" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "complement" TEXT,
    "lat" DOUBLE PRECISION NOT NULL,
    "long" DOUBLE PRECISION NOT NULL,
    "id_client" INTEGER NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id_address")
);

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_id_client_fkey" FOREIGN KEY ("id_client") REFERENCES "Client"("id_client") ON DELETE RESTRICT ON UPDATE CASCADE;
