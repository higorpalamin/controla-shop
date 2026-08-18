/*
  Warnings:

  - You are about to drop the column `endereco` on the `Fornecedor` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ie]` on the table `Fornecedor` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Fornecedor" DROP COLUMN "endereco",
ADD COLUMN     "bairro" TEXT,
ADD COLUMN     "cep" TEXT,
ADD COLUMN     "cidade" TEXT,
ADD COLUMN     "estado" TEXT,
ADD COLUMN     "ie" TEXT,
ADD COLUMN     "rua" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Fornecedor_ie_key" ON "Fornecedor"("ie");
