"use server";

import prisma from "../_lib/prisma";

export async function buscarFornecedores(search: string | undefined) {
  return prisma.fornecedor.findMany({
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
              email: {
                contains: search,
                mode: "insensitive",
              },
            },
          ],
        }
      : {},
  });
}

type CadastrarFornecedorProps = {
  nome: string;
  cnpj: string;
  ie: string;
  email: string;
  telefone: string;
  rua: string;
  cidade: string;
  bairro: string;
  estado: string;
  cep: string;
};

export async function cadastrarFornecedor(params: CadastrarFornecedorProps) {
  try {
    const CNPJTest = await prisma.fornecedor.findUnique({
      where: {
        cnpj: params.cnpj,
      },
    });

    if (CNPJTest) {
      return {
        success: false,
        message: "CNPJ já cadastrado!",
      };
    }

    await prisma.fornecedor.create({
      data: {
        nome: params.nome,
        cnpj: params.cnpj,
        ie: params.ie,
        email: params.email,
        telefone: params.telefone,
        rua: params.rua,
        cidade: params.cidade,
        bairro: params.bairro,
        estado: params.estado,
        cep: params.cep,
      },
    });

    return {
      success: true,
      message: "Fornecedor cadastrado com sucesso!",
    };
  } catch (err) {
    console.error(err);

    return {
      success: false,
      message: "Erro ao cadastrar o fornecedor",
    };
  }
}

export async function deletarFornecedor({ id }: { id: string }) {
  try {
    await prisma.fornecedor.delete({
      where: {
        id: id,
      },
    });

    return {
      success: true,
      message: "Fornecedor deletado!",
    };
  } catch (err) {
    console.error(err);
  }
}
