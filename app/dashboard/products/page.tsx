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
import { MoreHorizontalIcon } from "lucide-react";
import Link from "next/link";
import Search from "@/app/_components/search";
import { buscarProdutos } from "@/app/_services/produto.service";

type ProductsProps = {
  searchParams: Promise<{
    search?: string;
  }>;
};

export default async function Products({ searchParams }: ProductsProps) {
  const params = await searchParams;

  const search = params.search?.trim() ?? "";

  const produtos = await buscarProdutos(params.search)

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold text-controla-primary">Produtos</h1>

      <p className="text-controla-medium">Gerencie os produtos cadastrados no estoque.</p>

      <div className="flex items-center justify-between p-5">
        <Search />
        <Link
          href="/dashboard/products/new-product"
          className="rounded-xl p-2 px-3 font-bold text-white bg-controla-primary"
        >
          Cadastrar produto
        </Link>
      </div>

      <div className="m-auto w-[95%]">
        <Table>
          {produtos && produtos.length > 0 ? (
            <>
              <TableCaption>
            {search
              ? `Resultados para "${search}"`
              : "Todos os produtos cadastrados"}
          </TableCaption>

          <TableHeader>
            <TableRow>
              <TableHead className="w-50">Produto</TableHead>
              <TableHead className="w-30">SKU</TableHead>
              <TableHead className="w-50">Categoria</TableHead>
              <TableHead className="w-15">Estoque</TableHead>
              <TableHead className="w-25">Preço R$</TableHead>
              <TableHead className="w-15">Ações</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {produtos.map((produto) => (
              <TableRow key={produto.id}>
                <TableCell className="font-medium uppercase">
                  {produto.nome}
                </TableCell>

                <TableCell>{produto.sku}</TableCell>

                <TableCell>{produto.categoriaId}</TableCell>

                <TableCell>{produto.quantidade}</TableCell>

                <TableCell>{String(produto.precoVenda)}</TableCell>

                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={
                        <Button variant="ghost" size="icon" className="size-8">
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
