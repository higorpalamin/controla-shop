import Filtrar from "@/app/_components/filtrar-button";
import SupplierSearch from "@/app/_components/supplier-search";
import SuppliersTable from "@/app/_components/suppliers-table";
import { buscarFornecedores } from "@/app/_services/suppliers.service";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

type SuppliersProps = {
  searchParams: Promise<{
    search?: string;
  }>;
};

export default async function Suppliers({ searchParams }: SuppliersProps) {
  const params = await searchParams;

  const search = params.search?.trim() ?? "";

  const suppliers = (await buscarFornecedores(params.search)).map(
    (supplier) => ({
      id: supplier.id,
      nome: supplier.nome,
      cnpj: supplier.cnpj,
      ie: supplier.ie ?? "",
      email: supplier.email ?? "",
      telefone: supplier.telefone ?? "",
      rua: supplier.rua ?? "",
      cidade: supplier.cidade ?? "",
      bairro: supplier.bairro ?? "",
      estado: supplier.estado ?? "",
      cep: supplier.cep ?? "",
    }),
  );

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold text-controla-primary">
        Fornecedores
      </h1>

      <p className="text-controla-medium">
        Gerencie os fornecedores cadastrados no sistema.
      </p>

      <div className="m-auto w-[95%]">
        <div className="flex items-center justify-between py-5">
          <SupplierSearch />
          <div className="flex items-center gap-2">
            <Filtrar />
            <Link
              href="/dashboard/suppliers/new-supplier"
              className="flex items-center gap-1 rounded-md p-1.5 px-3 pl-2 font-semibold text-white text-md bg-controla-medium hover:opacity-80"
            >
              <PlusIcon />
              Cadastrar fornecedor
            </Link>
          </div>
        </div>
        <SuppliersTable search={search} suppliers={suppliers} />
      </div>
    </div>
  );
}
