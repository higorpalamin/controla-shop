import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { buscarProdutosParaEntrada } from "@/app/_services/stock.service";
import Filtrar from "@/app/_components/filter-button";
import StockRemoveSearch from "@/app/_components/stock-remove-search";
import StockRemoveTable from "@/app/_components/stock-remove-table";
import { Decimal } from "@prisma/client/runtime/client";

export const revalidate = 0;

type StockRemoveProps = {
  searchParams: Promise<{
    search?: string;
  }>;
};

export default async function StockRemove({ searchParams }: StockRemoveProps) {
  const params = await searchParams;
  const search = params.search?.trim() ?? "";

  const produtosDb = await buscarProdutosParaEntrada(params.search);

  const produtosFormatados = produtosDb.map((produto) => ({
    id: produto.id,
    nome: produto.nome,
    sku: produto.sku ?? "",
    codigoBarras: produto.codigoBarras ?? "",
    descricao: produto.descricao ?? "",
    quantidade: produto.quantidade,
    estoqueMinimo: produto.estoqueMinimo,
    precoCompra: Number(produto.precoCompra as unknown as Decimal),
    precoVenda: Number(produto.precoVenda as unknown as Decimal),
    categoria: {
      nome: produto.categoria?.nome ?? "Sem categoria",
    },
    fornecedor: produto.fornecedor
      ? {
          nome: produto.fornecedor.nome,
        }
      : null,
  }));

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold text-controla-primary">
        Saída de Estoque
      </h1>

      <p className="text-controla-medium">
        Selecione um produto cadastrado para dar baixa ou registrar saída de unidades do estoque.
      </p>

      <div className="m-auto w-[95%]">
        <div className="flex items-center justify-between py-5">
          <StockRemoveSearch defaultValue={search} />
          <div className="flex items-center gap-2">
            <Filtrar />
            <Link
              href="/dashboard/products/new-product"
              className="flex items-center gap-1 rounded-md p-1.5 px-3 pl-2 font-semibold text-white text-md bg-controla-medium hover:opacity-80"
            >
              <PlusIcon />
              Novo Produto
            </Link>
          </div>
        </div>
        <StockRemoveTable produtos={produtosFormatados} search={search} />
      </div>
    </div>
  );
}