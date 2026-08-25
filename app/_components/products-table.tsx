"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/app/_components/ui/tooltip";
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
import { deletarProduto } from "../_services/products.service";
import { useRouter } from "next/navigation";

type Product = {
  id: string;
  nome: string;
  sku: string;
  quantidade: number;
  estoqueMinimo: number;
  precoVenda: number;
  categoria: {
    nome: string;
  };
};

function ProductsTable({
  search,
  produtos,
}: {
  search?: string;
  produtos?: Product[];
}) {
  const router = useRouter();

  function onHandleDelete(produto: Product) {
    deletarProduto(produto)
      .then((resultado) => {
        if (resultado?.success) {
          toast.add({
            type: "success",
            description: resultado.message,
          });

          router.push("/dashboard/products");
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

  function onHandleEdit(produto: Product) {
    router.push(`/dashboard/products/edit-product/${produto.id}`);
  }

  return (
    <Table>
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
                Preço venda
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
                  {produto.categoria.nome}
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
                          className="size-8 cursor-pointer"
                        >
                          <MoreHorizontalIcon />
                        </Button>
                      }
                    />
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => onHandleEdit(produto)}
                      >
                        Editar
                      </DropdownMenuItem>

                      <DropdownMenuItem className="cursor-pointer">
                        Movimentar
                      </DropdownMenuItem>

                      <DropdownMenuSeparator />

                      <DropdownMenuItem
                        variant="destructive"
                        className="cursor-pointer"
                        onClick={() => onHandleDelete(produto)}
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
        <p>Não foram encontrados produtos com: &quot;{search}&quot;</p>
      )}
    </Table>
  );
}

export default ProductsTable;
