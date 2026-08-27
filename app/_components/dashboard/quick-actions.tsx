"use client";

import React from "react";
import Link from "next/link";
import {
  FileText,
  PackagePlus,
  PlusCircle,
  MinusCircle,
  Truck,
  Layers,
} from "lucide-react";

export default function QuickActions() {
  const actions = [
    {
      title: "Nova Entrada",
      href: "/dashboard/stock/add",
      icon: PlusCircle,
      desc: "Registrar chegada",
      variant: "green",
    },
    {
      title: "Nova Saída",
      href: "/dashboard/stock/remove",
      icon: MinusCircle,
      desc: "Baixa de produto",
      variant: "rose",
    },
    {
      title: "Novo Produto",
      href: "/dashboard/products/new-product",
      icon: PackagePlus,
      desc: "Cadastrar catálogo",
      variant: "primary",
    },
    {
      title: "Fornecedores",
      href: "/dashboard/suppliers",
      icon: Truck,
      desc: "Gerenciar parceiros",
      variant: "medium",
    },
    {
      title: "Categorias",
      href: "/dashboard/products/categories",
      icon: Layers,
      desc: "Organizar grupos",
      variant: "neutral",
    },
    {
      title: "Relatórios",
      href: "/dashboard/reports",
      icon: FileText,
      desc: "Exportar dados",
      variant: "neutral",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
      {actions.map((act) => {
        const Icon = act.icon;
        let colorClasses = "text-gray-700 bg-gray-50 border-gray-200 hover:border-gray-300";
        if (act.variant === "primary") {
          colorClasses = "text-controla-primary bg-controla-primary/5 border-controla-primary/20 hover:border-controla-primary/40";
        } else if (act.variant === "green") {
          colorClasses = "text-emerald-700 bg-emerald-50 border-emerald-200 hover:border-emerald-300 dark:bg-emerald-950/30 dark:border-emerald-900";
        } else if (act.variant === "rose") {
          colorClasses = "text-rose-700 bg-rose-50 border-rose-200 hover:border-rose-300 dark:bg-rose-950/30 dark:border-rose-900";
        } else if (act.variant === "medium") {
          colorClasses = "text-controla-medium bg-controla-medium/5 border-controla-medium/20 hover:border-controla-medium/40";
        }

        return (
          <Link
            key={act.title}
            href={act.href}
            className={`group flex flex-col items-center justify-center rounded-xl border p-3 text-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xs dark:bg-gray-900 ${colorClasses}`}
          >
            <Icon className="mb-1.5 h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
            <span className="text-xs font-bold">{act.title}</span>
            <span className="text-[10px] text-gray-500 dark:text-gray-400">
              {act.desc}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
