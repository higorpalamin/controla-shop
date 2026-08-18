/*
  Warnings:

  - A unique constraint covering the columns `[cnpj]` on the table `Fornecedor` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Fornecedor" ADD COLUMN     "cnpj" TEXT,
ADD COLUMN     "endereco" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Fornecedor_cnpj_key" ON "Fornecedor"("cnpj");
