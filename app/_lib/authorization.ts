import { auth } from "@/auth"

export async function requireAuth() {
  const session = await auth()

  if (!session) {
    throw new Error("Não autenticado")
  }

  return session
}

export async function requireAdmin() {
  const session = await requireAuth()

  if (session.user.role !== "ADMIN") {
    throw new Error("Sem permissão")
  }

  return session
}