import prisma from "@/app/_lib/prisma";

export async function buscarProdutos(search?: string) {
  return prisma.produto.findMany({
    where: search
      ? {
          OR: [
            {
              nome: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              codigoBarras: {
                contains: search,
                mode: "insensitive",
              },
            },
          ],
        }
      : undefined,
    include: { categoria: true },
    orderBy: {
      nome: "asc",
    },
  });
}
