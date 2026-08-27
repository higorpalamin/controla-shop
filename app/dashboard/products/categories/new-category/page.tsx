import NewProductForm from "@/app/_components/new-product-form";
import prisma from "@/app/_lib/prisma";

export default async function NewCategory() {
  const categories = await prisma.categoria.findMany();
  const suppliers = await prisma.fornecedor.findMany();

  return (
    <div className="p-4">
      <div>
        <h1 className="mb-4 text-2xl font-bold text-controla-primary">
          Cadastrar categoria
        </h1>

        <p className="text-controla-medium">Preencha todos os campos abaixo.</p>
      </div>
      <div className="w-250 m-auto mt-10">
        <NewProductForm categories={categories} suppliers={suppliers} />
      </div>
    </div>
  );
}
