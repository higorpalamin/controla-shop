import { PlusIcon } from "lucide-react";
import Link from "next/link";
import Search from "@/app/_components/search";
import { buscarProdutos } from "@/app/_services/produto.service";

import Filtrar from "@/app/_components/filtrar-button";
import ProductsTable from "@/app/_components/products-table";

type ProductsProps = {
  searchParams: Promise<{
    search?: string;
  }>;
};

export default async function Products({ searchParams }: ProductsProps) {
  const params = await searchParams;

  const search = params.search?.trim() ?? "";

  const produtos = (await buscarProdutos(params.search)).map((produto) => ({
    ...produto,
    sku: produto.sku ?? "",
    codigoBarras: produto.codigoBarras ?? "",
    descricao: produto.descricao ?? "",
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  })) as any;

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold text-controla-primary">
        Produtos
      </h1>

      <p className="text-controla-medium">
        Gerencie os produtos cadastrados no estoque.
      </p>

      <div className="m-auto w-[95%]">
        <div className="flex items-center justify-between py-5">
          <Search />
          <div className="flex items-center gap-2">
            <Filtrar />
            <Link
              href="/dashboard/products/new-product"
              className="flex items-center gap-1 rounded-md p-1.5 px-3 pl-2 font-semibold text-white text-md bg-controla-medium hover:opacity-80"
            >
              <PlusIcon />
              Cadastrar produto
            </Link>
          </div>
        </div>
        <ProductsTable produtos={produtos} search={search} />
      </div>
    </div>
  );
}
