import CategoriesSearch from "@/app/_components/categories-search";
import CategoriesTable from "@/app/_components/categories-table";
import Filtrar from "@/app/_components/filter-button";
import prisma from "@/app/_lib/prisma";
import buscarCategorias from "@/app/_services/categories.service";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

type SuppliersProps = {
  searchParams: Promise<{
    search?: string;
  }>;
};

async function CategoriesPage({ searchParams }: SuppliersProps) {
  const { search } = await searchParams;
  const categories = await buscarCategorias(search?.trim() ?? "");

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold text-controla-primary">
        Categorias
      </h1>

      <p className="text-controla-medium">
        Gerencie as categorias de produtos.
      </p>

      <div className="m-auto w-[95%]">
        <div className="flex items-center justify-between py-5">
          <CategoriesSearch />
          <div className="flex items-center gap-2">
            <Filtrar />
            <Link
              href="/dashboard/products/new-product"
              className="flex items-center gap-1 rounded-md p-1.5 px-3 pl-2 font-semibold text-white text-md bg-controla-medium hover:opacity-80"
            >
              <PlusIcon />
              Nova Categoria
            </Link>
          </div>
        </div>
        <CategoriesTable categories={categories} search={search} />
      </div>
    </div>
  );
}

export default CategoriesPage;
