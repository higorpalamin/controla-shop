"use client";

import React, { useState } from "react";
import { ArrowUpRight, Calendar, TrendingUp } from "lucide-react";

interface MonthlyData {
  mes: string;
  mesCurto: string;
  quantidade: number;
  valor: number;
}

interface MonthlyEntriesChartProps {
  data: MonthlyData[];
}

export default function MonthlyEntriesChart({ data }: MonthlyEntriesChartProps) {
  const [activeMetric, setActiveMetric] = useState<"quantidade" | "valor">("quantidade");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Cálculos de máximos e médias
  const values = data.map((d) => (activeMetric === "quantidade" ? d.quantidade : d.valor));
  const maxValue = Math.max(...values, 1);
  const total = values.reduce((acc, v) => acc + v, 0);
  const media = Math.round(total / (data.length || 1));

  // Identifica o mês de pico
  const peakIndex = values.indexOf(maxValue);
  const peakMonth = data[peakIndex];

  const formatValue = (val: number) => {
    if (activeMetric === "valor") {
      return val.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
        maximumFractionDigits: 0,
      });
    }
    return `${val.toLocaleString("pt-BR")} un`;
  };

  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-gray-200/80 bg-white p-6 shadow-xs dark:border-gray-800 dark:bg-gray-900">
      {/* Header do Gráfico */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Entradas por Mês
            </h3>
            <span className="inline-flex items-center gap-1 rounded-full bg-controla-primary/10 px-2.5 py-0.5 text-xs font-semibold text-controla-primary">
              <TrendingUp className="h-3 w-3" />
              Fluxo Anual
            </span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Acompanhamento de volume e reposição de estoque
          </p>
        </div>

        {/* Toggle de Métricas */}
        <div className="inline-flex rounded-lg border border-gray-200 bg-gray-50 p-1 text-xs dark:border-gray-700 dark:bg-gray-800">
          <button
            type="button"
            onClick={() => setActiveMetric("quantidade")}
            className={`cursor-pointer rounded-md px-3 py-1 font-medium transition-all ${
              activeMetric === "quantidade"
                ? "bg-white text-controla-primary shadow-xs dark:bg-gray-900 dark:text-white"
                : "text-gray-600 hover:text-gray-900 dark:text-gray-300"
            }`}
          >
            Quantidade
          </button>
          <button
            type="button"
            onClick={() => setActiveMetric("valor")}
            className={`cursor-pointer rounded-md px-3 py-1 font-medium transition-all ${
              activeMetric === "valor"
                ? "bg-white text-controla-primary shadow-xs dark:bg-gray-900 dark:text-white"
                : "text-gray-600 hover:text-gray-900 dark:text-gray-300"
            }`}
          >
            Valor (R$)
          </button>
        </div>
      </div>

      {/* Destaque de Métricas Resumidas */}
      <div className="mb-6 grid grid-cols-3 gap-3 rounded-xl bg-gray-50/80 p-3 dark:bg-gray-800/40">
        <div>
          <span className="text-[11px] font-medium text-gray-500 dark:text-gray-400">
            Total do Ano
          </span>
          <p className="text-sm font-bold text-gray-900 dark:text-white">
            {formatValue(total)}
          </p>
        </div>
        <div>
          <span className="text-[11px] font-medium text-gray-500 dark:text-gray-400">
            Média Mensal
          </span>
          <p className="text-sm font-bold text-gray-900 dark:text-white">
            {formatValue(media)}
          </p>
        </div>
        <div>
          <span className="text-[11px] font-medium text-gray-500 dark:text-gray-400">
            Mês de Pico
          </span>
          <p className="text-sm font-bold text-controla-primary dark:text-blue-400">
            {peakMonth?.mesCurto} ({formatValue(maxValue)})
          </p>
        </div>
      </div>

      {/* Gráfico de Barras com SVG / Flex Layout Responsivo */}
      <div className="relative flex flex-1 items-end gap-2 pt-8 pb-2" style={{ minHeight: "200px" }}>
        {/* Linhas de Grade de Fundo */}
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-between opacity-30">
          <div className="border-b border-dashed border-gray-300 dark:border-gray-700" />
          <div className="border-b border-dashed border-gray-300 dark:border-gray-700" />
          <div className="border-b border-dashed border-gray-300 dark:border-gray-700" />
          <div className="border-b border-gray-300 dark:border-gray-700" />
        </div>

        {data.map((item, index) => {
          const val = activeMetric === "quantidade" ? item.quantidade : item.valor;
          const heightPercent = Math.max(Math.round((val / maxValue) * 100), 8);
          const isHovered = hoveredIndex === index;
          const isPeak = index === peakIndex;

          return (
            <div
              key={item.mes}
              className="group relative flex flex-1 flex-col items-center h-full justify-end"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Tooltip Flutuante */}
              {isHovered && (
                <div className="absolute -top-12 z-20 whitespace-nowrap rounded-lg bg-gray-900 px-2.5 py-1.5 text-xs text-white shadow-xl dark:bg-gray-800 animate-in fade-in zoom-in-95">
                  <div className="font-semibold text-gray-200">{item.mes}</div>
                  <div className="text-emerald-400 font-bold">
                    {formatValue(val)}
                  </div>
                  {activeMetric === "quantidade" && (
                    <div className="text-[10px] text-gray-400">
                      R$ {item.valor.toLocaleString("pt-BR")}
                    </div>
                  )}
                  {/* Triângulo indicador */}
                  <div className="absolute left-1/2 -bottom-1 -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-gray-800" />
                </div>
              )}

              {/* Barra do Gráfico */}
              <div className="w-full flex justify-center items-end" style={{ height: "100%" }}>
                <div
                  style={{ height: `${heightPercent}%` }}
                  className={`w-full max-w-[28px] rounded-t-md transition-all duration-300 cursor-pointer ${
                    isHovered
                      ? "bg-controla-primary scale-105 shadow-md shadow-controla-primary/20"
                      : isPeak
                      ? "bg-gradient-to-t from-controla-medium to-controla-primary"
                      : "bg-gradient-to-t from-blue-200 to-controla-medium/80 dark:from-blue-950 dark:to-blue-600"
                  }`}
                />
              </div>

              {/* Rótulo do Mês */}
              <span
                className={`mt-2 text-[11px] font-medium transition-colors ${
                  isHovered || isPeak
                    ? "font-bold text-controla-primary dark:text-blue-400"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                {item.mesCurto}
              </span>
            </div>
          );
        })}
      </div>

      {/* Rodapé Informativo */}
      <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3 text-xs text-gray-500 dark:border-gray-800 dark:text-gray-400">
        <span className="flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5 text-gray-400" />
          Janeiro a Dezembro
        </span>
        <span className="flex items-center gap-1 text-controla-primary font-medium dark:text-blue-400">
          Atualizado em tempo real <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </div>
  );
}
