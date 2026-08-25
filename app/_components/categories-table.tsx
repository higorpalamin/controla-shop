"use client";

import { MoreHorizontalIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Button } from "./ui/button";

function CategoriesTable({
  categories,
  search,
}: {
  categories: { id: string; nome: string }[];
  search?: string;
}) {
  return categories.length > 0 ? (
    <Table className="w-lg m-auto">
      <TableCaption>
        {search
          ? `Resultados para "${search}"`
          : "Todas as categorias cadastradas"}
      </TableCaption>

      <TableHeader>
        <TableRow className="uppercase border-controla-green hover:bg-white">
          <TableHead className="w-max text-controla-green font-semibold">
            Nome
          </TableHead>
          <TableHead className="w-50 text-controla-green text-center font-semibold">
            Ações
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {categories.map((category) => (
          <TableRow key={category.id} className="border-controla-green">
            <TableCell className="font-medium uppercase">
              {category.nome}
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
                  <DropdownMenuItem
                    variant="destructive"
                    className="cursor-pointer"
                    /* onClick={() => onHandleDelete(produto)} */
                  >
                    Deletar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ) : (
    <p className="text-sm ">Não foram encontradas categorias com: &quot;{search}&quot;</p>
  );
}

export default CategoriesTable;
