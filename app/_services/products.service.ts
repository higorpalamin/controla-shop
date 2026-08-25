"use server";

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

type CadastrarProdutoProps = {
  nome: string;
  sku_produto: string;
  cod_barra_produto: string;
  categoria_Id: string;
  fornecedor_Id: string;
  desc_produto: string;
  preco_compra: number;
  preco_venda: number;
  qtd_produto: number;
  estoque_minimo: number;
};

export async function cadastrarProduto(params: CadastrarProdutoProps) {
  try {
    const codBarTest = await prisma.produto.findUnique({
      where: {
        codigoBarras: params.cod_barra_produto,
      },
    });

    if (codBarTest) {
      return {
        success: false,
        message: "Código de barras já cadastrado!",
      };
    }

    await prisma.produto.create({
      data: {
        nome: params.nome,
        sku: params.sku_produto,
        codigoBarras: params.cod_barra_produto,
        categoriaId: params.categoria_Id,
        fornecedorId: params.fornecedor_Id,
        descricao: params.desc_produto,
        precoCompra: params.preco_compra,
        precoVenda: params.preco_venda,
        quantidade: params.qtd_produto,
        estoqueMinimo: params.estoque_minimo,
      },
    });

    return {
      success: true,
      message: "Produto criado com sucesso!",
    };
  } catch (err) {
    console.error(err);

    return {
      success: false,
      message: "Erro ao criar o produto",
    };
  }
}

type deletarProdutoProps = {
  id: string;
};

export async function deletarProduto(produto: deletarProdutoProps) {
  try {
    await prisma.produto.delete({
      where: {
        id: produto.id,
      },
    });

    return {
      success: true,
      message: "Produto deletado!",
    };
  } catch (err) {
    console.error(err);
  }
}

export async function buscarProdutoPorId(id: string) {
  return prisma.produto.findFirst({
    where: {
      id: id,
    },
    include: { categoria: true },
  });
}

type atualizarProdutoProps = {
  params: {
    nome: string;
    sku_produto: string;
    cod_barra_produto: string;
    categoria_Id: string;
    fornecedor_Id: string;
    desc_produto: string;
    preco_compra: number;
    preco_venda: number;
    qtd_produto: number;
    estoque_minimo: number;
  };
  id: string;
};

export async function atualizarProduto({ id, params }: atualizarProdutoProps) {
  try {
    const produtoAtualizado = await prisma.produto.updateMany({
      where: {
        id: id,
      },
      data: {
        nome: params.nome,
        sku: params.sku_produto,
        codigoBarras: params.cod_barra_produto,
        categoriaId: params.categoria_Id,
        fornecedorId: params.fornecedor_Id,
        descricao: params.desc_produto,
        precoCompra: params.preco_compra,
        precoVenda: params.preco_venda,
        quantidade: params.qtd_produto,
        estoqueMinimo: params.estoque_minimo,
      },
    });

    if (produtoAtualizado) {
      return {
        success: true,
        message: "Produto atualizado com sucesso!",
      };
    }
  } catch (err) {
    console.error(err);
    return {
      success: false,
      message: "Erro ao atualizar o produto",
    };
  }
}
