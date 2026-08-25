import prisma from "../_lib/prisma";

export default async function buscarCategorias(search?: string) {
  const categorias = await prisma.categoria.findMany({
    where: {
      nome: {
        contains: search,
        mode: "insensitive",
      },
    },
  });

  return categorias;
}
