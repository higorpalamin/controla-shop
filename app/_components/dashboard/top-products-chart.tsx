"use client";

import React, { useState } from "react";
import { Award, DollarSign, PackageCheck, ShoppingBag } from "lucide-react";

interface TopProduct {
  id: string;
  nome: string;
  categoria: string;
  quantidadeVendida: number;
  receitaTotal: number;
  estoqueAtual: number;
  porcentagem: number;
}

interface TopProductsChartProps {
  products: TopProduct[];
}

export default function TopProductsChart({ products }: TopProductsChartProps) {
  const [viewMode, setViewMode] = useState<"quantidade" | "receita">("quantidade");

  const totalVendido = products.reduce((acc, p) => acc + p.quantidadeVendida, 0);
  const totalReceita = products.reduce((acc, p) => acc + p.receitaTotal, 0);

  // Calcula percentuais baseados no total ou no item líder
  const maxQtd = Math.max(...products.map((p) => p.quantidadeVendida), 1);
  const maxRec = Math.max(...products.map((p) => p.receitaTotal), 1);

  const getRankBadge = (index: number) => {
    switch (index) {
      case 0:
        return {
          bg: "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950 dark:text-amber-300",
          label: "1º",
        };
      case 1:
        return {
          bg: "bg-slate-200 text-slate-800 border-slate-300 dark:bg-slate-800 dark:text-slate-200",
          label: "2º",
        };
      case 2:
        return {
          bg: "bg-orange-100 text-orange-800 border-orange-300 dark:bg-orange-950 dark:text-orange-300",
          label: "3º",
        };
      default:
        return {
          bg: "bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300",
          label: `${index + 1}º`,
        };
    }
  };

  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-gray-200/80 bg-white p-6 shadow-xs dark:border-gray-800 dark:bg-gray-900">
      {/* Header do Gráfico */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Produtos Mais Vendidos
            </h3>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              <Award className="h-3 w-3" />
              Top Performance
            </span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Itens com maior demanda e faturamento
          </p>
        </div>

        {/* Toggle de Visualização */}
        <div className="inline-flex rounded-lg border border-gray-200 bg-gray-50 p-1 text-xs dark:border-gray-700 dark:bg-gray-800">
          <button
            type="button"
            onClick={() => setViewMode("quantidade")}
            className={`cursor-pointer rounded-md px-3 py-1 font-medium transition-all ${
              viewMode === "quantidade"
                ? "bg-white text-controla-primary shadow-xs dark:bg-gray-900 dark:text-white"
                : "text-gray-600 hover:text-gray-900 dark:text-gray-300"
            }`}
          >
            Qtd. Saídas
          </button>
          <button
            type="button"
            onClick={() => setViewMode("receita")}
            className={`cursor-pointer rounded-md px-3 py-1 font-medium transition-all ${
              viewMode === "receita"
                ? "bg-white text-controla-primary shadow-xs dark:bg-gray-900 dark:text-white"
                : "text-gray-600 hover:text-gray-900 dark:text-gray-300"
            }`}
          >
            Faturamento
          </button>
        </div>
      </div>

      {/* Destaque Resumo */}
      <div className="mb-4 flex items-center justify-between rounded-xl bg-gray-50/80 px-4 py-2.5 dark:bg-gray-800/40">
        <div className="flex items-center gap-2">
          <ShoppingBag className="h-4 w-4 text-controla-medium" />
          <span className="text-xs text-gray-600 dark:text-gray-300">
            Total comercializado:{" "}
            <strong className="text-gray-900 dark:text-white">
              {totalVendido} un
            </strong>
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <DollarSign className="h-4 w-4 text-emerald-600" />
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
            {totalReceita.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
        </div>
      </div>

      {/* Lista / Barras Horizontais com Ranking */}
      <div className="space-y-4 pt-1">
        {products.map((product, index) => {
          const rank = getRankBadge(index);
          const percent =
            viewMode === "quantidade"
              ? Math.max(Math.round((product.quantidadeVendida / maxQtd) * 100), 10)
              : Math.max(Math.round((product.receitaTotal / maxRec) * 100), 10);

          return (
            <div
              key={product.id || index}
              className="group rounded-xl p-2 transition-colors hover:bg-gray-50/80 dark:hover:bg-gray-800/50"
            >
              <div className="flex items-center justify-between gap-3 text-sm">
                {/* Posicionamento e Nome */}
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border text-xs font-bold ${rank.bg}`}
                  >
                    {rank.label}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-gray-900 group-hover:text-controla-primary dark:text-white dark:group-hover:text-blue-400">
                      {product.nome}
                    </p>
                    <span className="text-[11px] text-gray-500 dark:text-gray-400">
                      {product.categoria} • Estoque atual: {product.estoqueAtual} un
                    </span>
                  </div>
                </div>

                {/* Métricas Principais */}
                <div className="text-right shrink-0">
                  <div className="font-bold text-gray-900 dark:text-white">
                    {viewMode === "quantidade"
                      ? `${product.quantidadeVendida} un`
                      : product.receitaTotal.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                  </div>
                  <div className="text-[11px] text-gray-500 dark:text-gray-400">
                    {viewMode === "quantidade"
                      ? product.receitaTotal.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })
                      : `${product.quantidadeVendida} un vendidas`}
                  </div>
                </div>
              </div>

              {/* Barra de Progresso / Proporção */}
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                <div
                  style={{ width: `${percent}%` }}
                  className={`h-full rounded-full transition-all duration-500 ${
                    index === 0
                      ? "bg-gradient-to-r from-controla-medium to-controla-primary"
                      : index === 1
                      ? "bg-gradient-to-r from-blue-400 to-controla-medium"
                      : index === 2
                      ? "bg-gradient-to-r from-teal-400 to-emerald-500"
                      : "bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-600"
                  }`}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Rodapé Informativo */}
      <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3 text-xs text-gray-500 dark:border-gray-800 dark:text-gray-400">
        <span className="flex items-center gap-1.5">
          <PackageCheck className="h-3.5 w-3.5 text-emerald-500" />
          Baseado nas saídas registradas
        </span>
        <span className="font-medium text-gray-700 dark:text-gray-300">
          5 principais produtos
        </span>
      </div>
    </div>
  );
}
