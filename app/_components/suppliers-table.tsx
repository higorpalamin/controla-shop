"use client";

import { Button } from "@/app/_components/ui/button";
import { toast } from "@/app/_components/ui/toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import { MoreHorizontalIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { deletarFornecedor } from "../_services/suppliers.service";

type Supplier = {
  id: string;
  nome: string;
  cnpj: string | null;
  ie: string;
  email: string;
  telefone: string;
  rua: string;
  cidade: string;
  bairro: string;
  estado: string;
  cep: string;
};

function SuppliersTable({
  search,
  suppliers,
}: {
  search?: string;
  suppliers?: Supplier[];
}) {
  const router = useRouter();

  function onHandleDelete(supplier: Supplier) {
    deletarFornecedor({ id: supplier.id })
      .then((resultado) => {
        if (resultado?.success) {
          toast.add({
            type: "success",
            description: resultado.message,
          });

          router.push("/dashboard/suppliers");
        } else {
          toast.add({
            type: "error",
            description: resultado?.message,
          });
        }
      })
      .catch((error) => {
        console.error(error);
        toast.add({
          type: "error",
          description: error.message,
        });
      });
  }
  return (
    <Table>
      {suppliers && suppliers.length > 0 ? (
        <>
          <TableCaption>
            {search
              ? `Resultados para "${search}"`
              : "Todos os fornecedores cadastrados"}
          </TableCaption>

          <TableHeader>
            <TableRow className="uppercase border-controla-green hover:bg-white">
              <TableHead className="w-max text-controla-green font-semibold">
                <span>Fornecedor</span>
              </TableHead>
              <TableHead className="w-80 text-controla-green font-semibold text-center">
                <span>CNPJ</span>
              </TableHead>
              <TableHead className="w-80 text-controla-green font-semibold text-center">
                <span>IE</span>
              </TableHead>
              <TableHead className="w-40 text-controla-green font-semibold text-center">
                <span>Telefone</span>
              </TableHead>
              <TableHead className="w-80 text-controla-green font-semibold text-center">
                <span>Email</span>
              </TableHead>
              <TableHead className="w-80 text-controla-green font-semibold text-center">
                <span>Endereço</span>
              </TableHead>
              <TableHead className="w-40 text-controla-green font-semibold text-center">
                <span>Ações</span>
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {suppliers.map((supplier) => (
              <TableRow key={supplier.id} className="border-controla-green">
                <TableCell className="font-medium uppercase">
                  <span>{supplier.nome}</span>
                </TableCell>
                <TableCell className="text-center">
                  <span>{supplier.cnpj ?? "-"}</span>
                </TableCell>
                <TableCell className="text-center">
                  <span>{supplier.ie ?? "-"}</span>
                </TableCell>
                <TableCell className="text-center">
                  <span>{supplier.telefone ?? "-"}</span>
                </TableCell>

                <TableCell className="text-center">
                  <span>{supplier.email ?? "-"}</span>
                </TableCell>

                <TableCell className="text-center">
                  {supplier.rua ? (
                    <span>
                      {supplier.rua}, {supplier.cidade}, {supplier.bairro},{" "}
                      {supplier.estado} - {supplier.cep}
                    </span>
                  ) : (
                    <span>-</span>
                  )}
                </TableCell>

                <TableCell className="text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8 cursor-pointer"
                        >
                          <MoreHorizontalIcon />
                        </Button>
                      }
                    />
                    <DropdownMenuContent>
                      <DropdownMenuItem className="cursor-pointer">
                        Editar
                      </DropdownMenuItem>

                      <DropdownMenuItem className="cursor-pointer">
                        Movimentar
                      </DropdownMenuItem>

                      <DropdownMenuSeparator />

                      <DropdownMenuItem
                        variant="destructive"
                        className="cursor-pointer"
                        onClick={() => onHandleDelete(supplier)}
                      >
                        Deletar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </>
      ) : (
        <p>Não foram encontrados fornecedores com: &quot;{search}&quot;</p>
      )}
    </Table>
  );
}

export default SuppliersTable;
