"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/app/_components/ui/tooltip";
import { Button } from "@/app/_components/ui/button";
import { AlertCircle, MinusIcon, PackageMinus, PlusIcon } from "lucide-react";
import Link from "next/link";
import StockExitModal from "./stock-exit-modal";
import { StockProduct } from "./stock-entry-modal";

interface StockRemoveTableProps {
  search?: string;
  produtos: StockProduct[];
}

export default function StockRemoveTable({
  search,
  produtos,
}: StockRemoveTableProps) {
  const [selectedProduct, setSelectedProduct] = useState<StockProduct | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenExit = (produto: StockProduct) => {
    setSelectedProduct(produto);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <>
      <Table>
        {produtos && produtos.length > 0 ? (
          <>
            <TableCaption>
              {search
                ? `Resultados para "${search}"`
                : "Todos os produtos disponíveis para baixa/saída"}
            </TableCaption>

            <TableHeader>
              <TableRow className="uppercase border-controla-green hover:bg-white">
                <TableHead className="w-max text-controla-green font-semibold">
                  Produto
                </TableHead>
                <TableHead className="w-30 text-controla-green font-semibold text-center">
                  SKU / Cód.
                </TableHead>
                <TableHead className="w-40 text-controla-green font-semibold text-center">
                  Categoria
                </TableHead>
                <TableHead className="w-24 text-controla-green font-semibold text-center">
                  Estoque Atual
                </TableHead>
                <TableHead className="w-28 text-controla-green font-semibold text-center">
                  Preço Venda
                </TableHead>
                <TableHead className="w-32 text-controla-green font-semibold text-center">
                  Ação
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {produtos.map((produto) => {
                const isEstoqueBaixo = produto.quantidade < produto.estoqueMinimo;
                const isZerado = produto.quantidade <= 0;

                return (
                  <TableRow key={produto.id} className="border-controla-green">
                    {/* Nome do Produto */}
                    <TableCell className="font-medium uppercase">
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-900">
                          {produto.nome}
                        </span>
                        {produto.fornecedor?.nome && (
                          <span className="text-[11px] text-gray-400 capitalize">
                            Fornecedor: {produto.fornecedor.nome}
                          </span>
                        )}
                      </div>
                    </TableCell>

                    {/* SKU ou Código de barras */}
                    <TableCell className="text-center text-xs text-gray-600">
                      {produto.sku || produto.codigoBarras || "-"}
                    </TableCell>

                    {/* Categoria */}
                    <TableCell className="text-center text-xs">
                      <span className="rounded-md bg-gray-100 px-2 py-0.5 font-medium text-gray-700">
                        {produto.categoria?.nome || "Sem categoria"}
                      </span>
                    </TableCell>

                    {/* Estoque */}
                    <Tooltip>
                      <TooltipTrigger
                        render={
                          <TableCell className="text-center">
                            {isZerado ? (
                              <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-0.5 text-xs font-bold text-gray-500">
                                0 un (Esgotado)
                              </span>
                            ) : isEstoqueBaixo ? (
                              <span className="inline-flex items-center gap-1 rounded-md bg-red-100 px-2 py-0.5 text-xs font-bold text-red-700">
                                <AlertCircle className="h-3.5 w-3.5" />
                                {produto.quantidade} un
                              </span>
                            ) : (
                              <span className="inline-flex items-center rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                                {produto.quantidade} un
                              </span>
                            )}
                          </TableCell>
                        }
                      />
                      <TooltipContent>
                        <p>
                          {isZerado
                            ? "Produto sem estoque disponível."
                            : isEstoqueBaixo
                            ? `Abaixo do mínimo (${produto.estoqueMinimo} un).`
                            : `Estoque normal (Mínimo: ${produto.estoqueMinimo} un)`}
                        </p>
                      </TooltipContent>
                    </Tooltip>

                    {/* Preço de Venda */}
                    <TableCell className="text-center text-xs font-medium text-gray-700">
                      R$ {Number(produto.precoVenda).toFixed(2)}
                    </TableCell>

                    {/* Botão de Ação Dar Saída */}
                    <TableCell className="text-center">
                      <Button
                        size="sm"
                        disabled={isZerado}
                        onClick={() => handleOpenExit(produto)}
                        className="cursor-pointer bg-controla-medium hover:opacity-90 hover:bg-controla-medium text-white text-xs font-semibold px-2.5 py-1 rounded-md transition disabled:opacity-40 disabled:pointer-events-none"
                      >
                        <MinusIcon className="h-3.5 w-3.5" />
                        Dar Saída
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </>
        ) : (
          <TableBody>
            <TableRow>
              <TableCell colSpan={6} className="py-12 text-center">
                <div className="flex flex-col items-center justify-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                    <PackageMinus className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700">
                      {search
                        ? `Nenhum produto encontrado com "${search}"`
                        : "Nenhum produto cadastrado no sistema"}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Cadastre novos produtos para poder registrar saídas no estoque.
                    </p>
                  </div>
                  <Link
                    href="/dashboard/products/new-product"
                    className="mt-2 inline-flex items-center gap-1.5 rounded-md bg-controla-medium px-3.5 py-2 text-xs font-semibold text-white shadow-xs hover:opacity-85"
                  >
                    <PlusIcon className="h-4 w-4" />
                    Cadastrar Novo Produto
                  </Link>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        )}
      </Table>

      {/* Modal de Saída */}
      {selectedProduct && (
        <StockExitModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}
