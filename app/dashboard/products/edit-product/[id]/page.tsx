import ProductCard from "@/app/_components/product-card";
import prisma from "@/app/_lib/prisma";
import { buscarProdutoPorId } from "@/app/_services/products.service";
import { notFound } from "next/navigation";

type EditProductProps = {
  params: Promise<{
    id: string;
  }>;
};

async function EditProduct({ params }: EditProductProps) {
  const { id } = await params;

  const produto = await buscarProdutoPorId(id);
  if (!produto) {
    notFound();
  }
  const suppliers = await prisma.fornecedor.findMany();
  const categories = await prisma.categoria.findMany();

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold text-controla-primary">Produto</h1>

      <p className="text-controla-medium">Detalhes do produto selecionado.</p>
      <p className="text-controla-medium">
        Aqui você pode{" "}
        <span className="font-semibold">visualizar e editar</span> informações
        como nome, código de barras, preço de compra e venda, e outras
        características relevantes do produto.
      </p>

      <div className="w-250 m-auto mt-10">
        <ProductCard
          produto={produto}
          suppliers={suppliers}
          categories={categories}
        />
      </div>
    </div>
  );
}

export default EditProduct;
