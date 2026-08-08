"use client";

import * as React from "react";
import {
  BookOpen,
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
      title: "Produtos",
      url: "#",
      icon: Package,
      items: [
        {
          title: "Consultar",
          icon2: PackageSearch,
          url: "#",
        },
        {
          title: "Novo",
          icon2: PackagePlus,
          url: "#",
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
          url: "#",
        },
        {
          title: "Entrada",
          icon2: Plus,
          url: "#",
        },
        {
          title: "Saída",
          icon2: Minus,
          url: "#",
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
          url: "#",
        },
        {
          title: "Novo",
          icon2: Plus,
          url: "#",
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
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavHeader />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavFooter />
      </SidebarFooter>
    </Sidebar>
  );
}
