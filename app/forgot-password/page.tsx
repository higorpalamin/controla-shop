"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Email ou senha inválidos");
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="flex items-center justify-center mt-30">
      <div className="mx-20 bg-white rounded-xl px-10 py-5 border border-controla-primary">
        <p className="text-center text-3xl">
          <span className="text-controla-primary font-bold">Controla</span>{" "}
          <span className="text-controla-green">Shop</span>
        </p>
        <p className="text-sm text-center mt-3">Redefinir senha.</p>
        <form onSubmit={handleLogin} className="flex flex-col">
          <label className="mt-5 p-1">Insira seu email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
            className="border-2 border-controla-medium p-2 rounded-xl"
          />

          <button
            type="submit"
            className="border-2 border-controla-medium p-2 mt-5 rounded-xl bg-controla-medium text-white font-bold hover:opacity-90 cursor-pointer"
          >
            Enviar código
          </button>
          <Link href={"/"} className="text-center border-2 border-controla-medium p-2 mt-5 rounded-xl bg-white text-controla-medium font-bold hover:opacity-90">
          Voltar</Link>
        </form>
      </div>
    </div>
  );
}
