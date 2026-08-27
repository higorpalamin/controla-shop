"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleReset(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) {
      setError("Por favor, digite seu email.");
      return;
    }
    setError("");
    setSuccess(true);
  }

  return (
    <div className="flex items-center justify-center mt-30">
      <div className="mx-20 bg-white rounded-xl px-10 py-5 border border-controla-primary">
        <p className="text-center text-3xl">
          <span className="text-controla-primary font-bold">Controla</span>{" "}
          <span className="text-controla-green">Shop</span>
        </p>
        <p className="text-sm text-center mt-3">Redefinir senha.</p>
        {error && (
          <p className="mt-2 text-center text-xs font-semibold text-rose-600">
            {error}
          </p>
        )}
        {success && (
          <p className="mt-2 text-center text-xs font-semibold text-emerald-600">
            Código enviado com sucesso para o email!
          </p>
        )}
        <form onSubmit={handleReset} className="flex flex-col">
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
