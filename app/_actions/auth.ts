"use server"

import bcrypt from "bcryptjs"
import prisma from "../_lib/prisma"

export async function criarUsuario(
  nome: string,
  email: string,
  password: string
) {
  const usuarioExistente = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (usuarioExistente) {
    throw new Error("Usuário já existe")
  }

  const passwordHash = await bcrypt.hash(password, 10)

  const usuario = await prisma.user.create({
    data: {
      name: nome,
      email,
      password: passwordHash,
    },
  })

  return usuario
}