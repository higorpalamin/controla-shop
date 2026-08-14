import { Button } from "@/app/_components/ui/button";
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
import { FilterIcon, MoreHorizontalIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import Search from "@/app/_components/search";
import { buscarProdutos } from "@/app/_services/produto.service";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/app/_components/ui/tooltip";
import Filtrar from "@/app/_components/filtrar-button";

type ProductsProps = {
  searchParams: Promise<{
    search?: string;
  }>;
};

export default async function Products({ searchParams }: ProductsProps) {
  const params = await searchParams;

  const search = params.search?.trim() ?? "";

  const produtos = await buscarProdutos(params.search);

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
        <Table className="">
          {produtos && produtos.length > 0 ? (
            <>
              <TableCaption>
                {search
                  ? `Resultados para "${search}"`
                  : "Todos os produtos cadastrados"}
              </TableCaption>

              <TableHeader>
                <TableRow className="uppercase border-controla-green hover:bg-white">
                  <TableHead className="w-max text-controla-green font-semibold">
                    Produto
                  </TableHead>
                  <TableHead className="w-30 text-controla-green font-semibold text-center">
                    SKU
                  </TableHead>
                  <TableHead className="w-40 text-controla-green font-semibold text-center">
                    Categoria
                  </TableHead>
                  <TableHead className="w-15 text-controla-green font-semibold text-center">
                    Estoque
                  </TableHead>
                  <TableHead className="w-25 text-controla-green font-semibold text-center">
                    Preço
                  </TableHead>
                  <TableHead className="w-15 text-controla-green font-semibold text-center">
                    Ações
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {produtos.map((produto) => (
                  <TableRow key={produto.id} className="border-controla-green">
                    <TableCell className="font-medium uppercase">
                      {produto.nome}
                    </TableCell>

                    <TableCell className="text-center">{produto.sku}</TableCell>

                    <TableCell className="text-center">
                      {produto.categoriaId}
                    </TableCell>

                    <Tooltip>
                      <TooltipTrigger
                        render={
                          <TableCell className="text-center">
                            {produto.quantidade < produto.estoqueMinimo ? (
                              <>
                                <span className="bg-red-200 px-2 p-1 rounded-md">
                                  {produto.quantidade}
                                </span>
                                <TooltipContent>
                                  <p>Estoque abaixo do mínimo!</p>
                                </TooltipContent>
                              </>
                            ) : (
                              <span>{produto.quantidade}</span>
                            )}
                          </TableCell>
                        }
                      />
                    </Tooltip>

                    <TableCell className="text-center">
                      <span>R$ </span>
                      {String(produto.precoVenda.toFixed(2))}
                    </TableCell>

                    <TableCell className="text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          render={
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-8"
                            >
                              <MoreHorizontalIcon />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          }
                        />

                        <DropdownMenuContent>
                          <DropdownMenuItem>Editar</DropdownMenuItem>

                          <DropdownMenuItem>Movimentar</DropdownMenuItem>

                          <DropdownMenuSeparator />

                          <DropdownMenuItem variant="destructive">
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
            <p>Não foram encontrados produtos com: &quot;{search}&quot;</p>
          )}
        </Table>
      </div>
    </div>
  );
}
