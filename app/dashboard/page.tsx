import React from "react";
import {
  Package,
  Boxes,
  AlertTriangle,
  ArrowDownLeft,
  ArrowUpRight,
  CircleDollarSign,
  Calendar,
  Sparkles,
} from "lucide-react";
import { getDashboardMetrics } from "@/app/_services/dashboard.service";
import MetricCard from "@/app/_components/dashboard/metric-card";
import MonthlyEntriesChart from "@/app/_components/dashboard/monthly-entries-chart";
import TopProductsChart from "@/app/_components/dashboard/top-products-chart";
import LowStockAlert from "@/app/_components/dashboard/low-stock-alert";
import QuickActions from "@/app/_components/dashboard/quick-actions";

export const revalidate = 0; // Atualização dinâmica

export default async function DashboardPage() {
  const metrics = await getDashboardMetrics();

  const formattedDate = new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  return (
    <div className="space-y-6 p-4 md:p-6 lg:p-8">
      {/* Cabeçalho do Dashboard */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold tracking-tight text-controla-primary md:text-3xl">
              Dashboard
            </h1>
          </div>
          <p className="mt-1 text-sm text-controla-medium">
            Visão geral em tempo real do seu estoque, movimentações e
            faturamento.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs font-medium text-gray-600 shadow-2xs md:self-auto dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300">
          <Calendar className="h-4 w-4 text-controla-medium" />
          <span>{capitalize(formattedDate)}</span>
        </div>
      </div>

      {/* Ações Rápidas de Navegação */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <h1 className="text-md font-semibold tracking-tight text-controla-primary">
            Menu rápido
          </h1>
        </div>
        <QuickActions />
      </div>

      {/* 1. Grade de Cards de Métricas (6 cards principais) */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {/* Card 1: Produtos Cadastrados */}
        <MetricCard
          title="Produtos Cadastrados"
          value={metrics.totalProdutos.toLocaleString("pt-BR")}
          subtitle="Itens únicos no catálogo"
          icon={Package}
          variant="primary"
          badge={{ text: "Ativos", variant: "info" }}
        />

        {/* Card 2: Itens em Estoque */}
        <MetricCard
          title="Itens em Estoque"
          value={`${metrics.totalItensEstoque.toLocaleString("pt-BR")} un`}
          subtitle="Volume físico total"
          icon={Boxes}
          variant="medium"
          badge={{ text: "Disponível", variant: "positive" }}
        />

        {/* Card 3: Produtos com Estoque Baixo */}
        <MetricCard
          title="Estoque Baixo"
          value={metrics.produtosEstoqueBaixoCount.toString()}
          subtitle={
            metrics.produtosEstoqueBaixoCount > 0
              ? "Necessitam reposição urgente"
              : "Níveis normais"
          }
          icon={AlertTriangle}
          variant={metrics.produtosEstoqueBaixoCount > 0 ? "danger" : "green"}
          badge={
            metrics.produtosEstoqueBaixoCount > 0
              ? { text: "Crítico", variant: "negative" }
              : { text: "OK", variant: "positive" }
          }
        />

        {/* Card 4: Entradas Hoje (Valor Fake / Dinâmico) */}
        <MetricCard
          title="Entradas Hoje"
          value={`${metrics.entradasHoje.quantidade} un`}
          subtitle={metrics.entradasHoje.valor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
          icon={ArrowDownLeft}
          variant="green"
          badge={{ text: metrics.entradasHoje.variacao, variant: "positive" }}
        />

        {/* Card 5: Saídas Hoje (Valor Fake / Dinâmico) */}
        <MetricCard
          title="Saídas Hoje"
          value={`${metrics.saidasHoje.quantidade} un`}
          subtitle={metrics.saidasHoje.valor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
          icon={ArrowUpRight}
          variant="warning"
          badge={{ text: metrics.saidasHoje.variacao, variant: "warning" }}
        />

        {/* Card 6: Valor Total em Estoque */}
        <MetricCard
          title="Valor em Estoque"
          value={metrics.valorTotalEstoqueVenda.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
          subtitle={`Custo: ${metrics.valorTotalEstoqueCusto.toLocaleString(
            "pt-BR",
            { style: "currency", currency: "BRL" },
          )}`}
          icon={CircleDollarSign}
          variant="primary"
          badge={{ text: "Patrimônio", variant: "info" }}
        />
      </div>

      {/* Alerta de Produtos com Estoque Baixo */}
      <LowStockAlert products={metrics.produtosEstoqueBaixo} />

      {/* 2. Grade de Gráficos (Entradas por mês & Produtos mais vendidos) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Gráfico 1: Entradas por Mês (7 colunas em telas grandes) */}
        <div className="lg:col-span-7">
          <MonthlyEntriesChart data={metrics.entradasPorMes} />
        </div>

        {/* Gráfico 2: Produtos Mais Vendidos (5 colunas em telas grandes) */}
        <div className="lg:col-span-5">
          <TopProductsChart products={metrics.produtosMaisVendidos} />
        </div>
      </div>
    </div>
  );
}
