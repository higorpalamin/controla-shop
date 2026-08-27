"use client";

import React from "react";
import Link from "next/link";
import { AlertTriangle, ArrowRight, PlusCircle } from "lucide-react";

interface LowStockItem {
  id: string;
  nome: string;
  quantidade: number;
  estoqueMinimo: number;
  categoriaNome: string;
}

interface LowStockAlertProps {
  products: LowStockItem[];
}

export default function LowStockAlert({ products }: LowStockAlertProps) {
  if (!products || products.length === 0) {
    return (
      <div className="flex items-center justify-between rounded-2xl border border-emerald-200 bg-emerald-50/50 p-5 dark:border-emerald-900/50 dark:bg-emerald-950/20">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-semibold text-emerald-900 dark:text-emerald-200">
              Estoque Saudável
            </h4>
            <p className="text-xs text-emerald-700 dark:text-emerald-400">
              Nenhum produto está abaixo do limite mínimo de segurança no momento.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-amber-200/90 bg-amber-50/40 p-5 shadow-xs dark:border-amber-900/40 dark:bg-amber-950/20">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300">
            <AlertTriangle className="h-4 w-4" />
          </div>
          <div>
            <h4 className="font-bold text-amber-950 dark:text-amber-200">
              Atenção: {products.length} {products.length === 1 ? "produto precisa" : "produtos precisam"} de reposição
            </h4>
            <p className="text-xs text-amber-800/80 dark:text-amber-400">
              Itens que atingiram ou estão abaixo do estoque mínimo configurado
            </p>
          </div>
        </div>

        <Link
          href="/dashboard/stock/add"
          className="inline-flex items-center gap-1.5 rounded-lg bg-amber-600 px-3 py-1.5 text-xs font-semibold text-white shadow-xs transition hover:bg-amber-700 dark:bg-amber-600 dark:hover:bg-amber-500"
        >
          <PlusCircle className="h-3.5 w-3.5" />
          Repor Estoque
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-2.5 pt-2 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <div
            key={p.id}
            className="flex items-center justify-between rounded-xl border border-amber-200/70 bg-white p-3 shadow-2xs dark:border-amber-900/30 dark:bg-gray-900"
          >
            <div className="min-w-0 flex-1 pr-2">
              <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                {p.nome}
              </p>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">
                {p.categoriaNome} • Mínimo: {p.estoqueMinimo} un
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-rose-100 px-2 py-0.5 text-xs font-bold text-rose-800 dark:bg-rose-950 dark:text-rose-300">
                {p.quantidade} un
              </span>
              <Link
                href={`/dashboard/products/edit-product/${p.id}`}
                className="rounded p-1 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                title="Editar produto"
              >
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
