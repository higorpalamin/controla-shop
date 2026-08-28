"use server";

import prisma from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";

export async function buscarProdutosParaEntrada(search?: string) {
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
              sku: {
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
    include: {
      categoria: true,
      fornecedor: true,
    },
    orderBy: {
      nome: "asc",
    },
  });
}

type DarEntradaParams = {
  produtoId: string;
  quantidade: number;
  observacao?: string;
  novoPrecoCompra?: number;
};

export async function darEntradaEstoque({
  produtoId,
  quantidade,
  observacao,
  novoPrecoCompra,
}: DarEntradaParams) {
  try {
    if (!produtoId) {
      return {
        success: false,
        message: "ID do produto inválido.",
      };
    }

    if (!quantidade || quantidade <= 0) {
      return {
        success: false,
        message: "A quantidade informada deve ser maior que zero.",
      };
    }

    const produtoExistente = await prisma.produto.findUnique({
      where: { id: produtoId },
    });

    if (!produtoExistente) {
      return {
        success: false,
        message: "Produto não encontrado no sistema.",
      };
    }

    await prisma.$transaction(async (tx) => {
      // 1. Atualiza quantidade e opcionalmente preço de compra
      await tx.produto.update({
        where: { id: produtoId },
        data: {
          quantidade: {
            increment: quantidade,
          },
          ...(novoPrecoCompra && novoPrecoCompra > 0
            ? { precoCompra: novoPrecoCompra }
            : {}),
        },
      });

      // 2. Registra histórico da movimentação
      await tx.movimentacao.create({
        data: {
          produtoId: produtoId,
          tipo: "ENTRADA",
          quantidade: quantidade,
          observacao: observacao?.trim() || "Entrada de estoque avulsa",
        },
      });
    });

    revalidatePath("/dashboard/stock/add");
    revalidatePath("/dashboard/stock/remove");
    revalidatePath("/dashboard/products");
    revalidatePath("/dashboard");

    return {
      success: true,
      message: `Entrada de ${quantidade} ${
        quantidade === 1 ? "unidade registrada" : "unidades registradas"
      } com sucesso!`,
    };
  } catch (error) {
    console.error("Erro ao registrar entrada de estoque:", error);
    return {
      success: false,
      message: "Erro interno ao registrar entrada de estoque.",
    };
  }
}

type DarSaidaParams = {
  produtoId: string;
  quantidade: number;
  observacao?: string;
};

export async function darSaidaEstoque({
  produtoId,
  quantidade,
  observacao,
}: DarSaidaParams) {
  try {
    if (!produtoId) {
      return {
        success: false,
        message: "ID do produto inválido.",
      };
    }

    if (!quantidade || quantidade <= 0) {
      return {
        success: false,
        message: "A quantidade informada deve ser maior que zero.",
      };
    }

    const produtoExistente = await prisma.produto.findUnique({
      where: { id: produtoId },
    });

    if (!produtoExistente) {
      return {
        success: false,
        message: "Produto não encontrado no sistema.",
      };
    }

    if (produtoExistente.quantidade < quantidade) {
      return {
        success: false,
        message: `Estoque insuficiente! Saldo disponível atual: ${produtoExistente.quantidade} unidades.`,
      };
    }

    await prisma.$transaction(async (tx) => {
      // 1. Decrementa quantidade
      await tx.produto.update({
        where: { id: produtoId },
        data: {
          quantidade: {
            decrement: quantidade,
          },
        },
      });

      // 2. Registra histórico da movimentação de saída
      await tx.movimentacao.create({
        data: {
          produtoId: produtoId,
          tipo: "SAIDA",
          quantidade: quantidade,
          observacao: observacao?.trim() || "Saída de estoque avulsa",
        },
      });
    });

    revalidatePath("/dashboard/stock/remove");
    revalidatePath("/dashboard/stock/add");
    revalidatePath("/dashboard/products");
    revalidatePath("/dashboard");

    return {
      success: true,
      message: `Saída de ${quantidade} ${
        quantidade === 1 ? "unidade registrada" : "unidades registradas"
      } com sucesso!`,
    };
  } catch (error) {
    console.error("Erro ao registrar saída de estoque:", error);
    return {
      success: false,
      message: "Erro interno ao registrar saída de estoque.",
    };
  }
}
