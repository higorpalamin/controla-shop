"use client";

import * as React from "react";
import {
  BookOpen,
  ChartNoAxesCombined,
  Minus,
  Package,
  Package2,
  PackagePlus,
  PackageSearch,
  Plus,
  Search,
  Settings2,
} from "lucide-react";

import { NavMain } from "@/app/_components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/app/_components/ui/sidebar";
import NavFooter from "./nav-footer";
import NavHeader from "./nav-header";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: ChartNoAxesCombined,
    },
    {
      title: "Produtos",
      url: "#",
      icon: Package,
      items: [
        {
          title: "Consultar",
          icon2: PackageSearch,
          url: "/dashboard/products",
        },
        {
          title: "Novo",
          icon2: PackagePlus,
          url: "/dashboard/products/new-product",
        },
      ],
    },
    {
      title: "Fornecedores",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Consultar",
          icon2: Search,
          url: "/dashboard/suppliers",
        },
        {
          title: "Novo",
          icon2: Plus,
          url: "/dashboard/suppliers/add",
        },
      ],
    },
    {
      title: "Estoque",
      url: "#",
      icon: Package2,
      items: [
        {
          title: "Consultar",
          icon2: Search,
          url: "/dashboard/stock",
        },
        {
          title: "Entrada",
          icon2: Plus,
          url: "/dashboard/stock/add",
        },
        {
          title: "Saída",
          icon2: Minus,
          url: "/dashboard/stock/remove",
        },
      ],
    },

    {
      title: "Relatórios",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Consultar",
          icon2: Search,
          url: "/dashboard/reports",
        },
      ],
    },
  ],
};

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  user: {
    name: string | null;
    email: string | null;
  };
};

export function AppSidebar({ user, ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavHeader />
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>

      <SidebarFooter>
        <NavFooter user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
