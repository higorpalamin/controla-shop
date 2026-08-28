import {
  BookOpen,
  ChartNoAxesCombined,
  List,
  Minus,
  Package,
  Package2,
  PackagePlus,
  PackageSearch,
  Plus,
  Search,
  Settings2,
} from "lucide-react";

export const data = {
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
          title: "Pesquisar",
          icon2: PackageSearch,
          url: "/dashboard/products",
        },
        {
          title: "Novo Produto",
          icon2: PackagePlus,
          url: "/dashboard/products/new-product",
        },
        {
          title: "Categorias",
          icon2: List,
          url: "/dashboard/products/categories",
        },
      ],
    },
    {
      title: "Fornecedores",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Pesquisar",
          icon2: Search,
          url: "/dashboard/suppliers",
        },
        {
          title: "Novo Fornecedor",
          icon2: Plus,
          url: "/dashboard/suppliers/new-supplier",
        },
      ],
    },
    {
      title: "Estoque",
      url: "#",
      icon: Package2,
      items: [
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
          title: "Pesquisar",
          icon2: Search,
          url: "/dashboard/reports",
        },
      ],
    },
  ],
};
