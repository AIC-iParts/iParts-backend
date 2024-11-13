-- CreateTable
CREATE TABLE "Client" (
    "id_client" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "date_of_birth" TIMESTAMP(3) NOT NULL,
    "register_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "register_update_date" TIMESTAMP(3) NOT NULL,
    "account_status" TEXT NOT NULL DEFAULT 'Active',

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id_client")
);
