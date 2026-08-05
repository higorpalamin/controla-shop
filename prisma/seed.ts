import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

async function main() {
  // Categoria
  const categoria = await prisma.categoria.create({
    data: {
      nome: "Periféricos",
    },
  });

  // Fornecedor
  const fornecedor = await prisma.fornecedor.create({
    data: {
      nome: "Redragon Brasil",
      email: "contato@redragon.com",
      telefone: "(11) 99999-9999",
    },
  });

  // Produto
  await prisma.produto.createMany({
    data: [
      {
        nome: "Mouse Gamer Redragon Cobra M711",
        sku: "MOU-0001",
        codigoBarras: "7891234567001",
        descricao: "Mouse gamer RGB com sensor óptico de 10000 DPI.",
        precoCompra: 85.9,
        precoVenda: 149.9,
        estoqueMinimo: 5,
        quantidade: 20,
        categoriaId: categoria.id,
        fornecedorId: fornecedor.id,
      },
      {
        nome: "Teclado Mecânico Redragon Kumara K552",
        sku: "TEC-0001",
        codigoBarras: "7891234567002",
        descricao: "Teclado mecânico switch Blue ABNT2.",
        precoCompra: 165.5,
        precoVenda: 249.9,
        estoqueMinimo: 5,
        quantidade: 15,
        categoriaId: categoria.id,
        fornecedorId: fornecedor.id,
      },
      {
        nome: "Monitor LG UltraGear 24'' Full HD 144Hz",
        sku: "MON-0001",
        codigoBarras: "7891234567003",
        descricao: "Monitor gamer IPS 24 polegadas Full HD.",
        precoCompra: 820.0,
        precoVenda: 1099.9,
        estoqueMinimo: 2,
        quantidade: 8,
        categoriaId: categoria.id,
        fornecedorId: fornecedor.id,
      },
      {
        nome: "SSD Kingston NV3 1TB NVMe",
        sku: "SSD-0001",
        codigoBarras: "7891234567004",
        descricao: "SSD M.2 NVMe PCIe 4.0 de 1TB.",
        precoCompra: 285.0,
        precoVenda: 399.9,
        estoqueMinimo: 10,
        quantidade: 35,
        categoriaId: categoria.id,
        fornecedorId: fornecedor.id,
      },
      {
        nome: "Memória RAM Kingston Fury Beast 16GB DDR4",
        sku: "MEM-0001",
        codigoBarras: "7891234567005",
        descricao: "Memória DDR4 3200MHz CL16.",
        precoCompra: 210.0,
        precoVenda: 299.9,
        estoqueMinimo: 8,
        quantidade: 25,
        categoriaId: categoria.id,
        fornecedorId: fornecedor.id,
      },
      {
        nome: "Fonte Corsair CV650 650W 80 Plus Bronze",
        sku: "FON-0001",
        codigoBarras: "7891234567006",
        descricao: "Fonte ATX 650W certificação 80 Plus Bronze.",
        precoCompra: 330.0,
        precoVenda: 459.9,
        estoqueMinimo: 5,
        quantidade: 12,
        categoriaId: categoria.id,
        fornecedorId: fornecedor.id,
      },
      {
        nome: "Placa de Vídeo RTX 4060 ASUS Dual 8GB",
        sku: "GPU-0001",
        codigoBarras: "7891234567007",
        descricao: "Placa de vídeo NVIDIA GeForce RTX 4060 8GB GDDR6.",
        precoCompra: 1980.0,
        precoVenda: 2499.9,
        estoqueMinimo: 2,
        quantidade: 6,
        categoriaId: categoria.id,
        fornecedorId: fornecedor.id,
      },
      {
        nome: "Processador AMD Ryzen 5 5600",
        sku: "CPU-0001",
        codigoBarras: "7891234567008",
        descricao: "Processador AMD Ryzen 5 5600 6 núcleos 12 threads.",
        precoCompra: 620.0,
        precoVenda: 849.9,
        estoqueMinimo: 4,
        quantidade: 14,
        categoriaId: categoria.id,
        fornecedorId: fornecedor.id,
      },
      {
        nome: "Placa-Mãe ASUS PRIME B550M-A",
        sku: "MB-0001",
        codigoBarras: "7891234567009",
        descricao: "Placa-mãe AMD AM4 chipset B550 micro ATX.",
        precoCompra: 510.0,
        precoVenda: 699.9,
        estoqueMinimo: 3,
        quantidade: 10,
        categoriaId: categoria.id,
        fornecedorId: fornecedor.id,
      },
      {
        nome: "Headset HyperX Cloud Stinger 2",
        sku: "HST-0001",
        codigoBarras: "7891234567010",
        descricao: "Headset gamer com áudio estéreo e microfone.",
        precoCompra: 180.0,
        precoVenda: 279.9,
        estoqueMinimo: 6,
        quantidade: 18,
        categoriaId: categoria.id,
        fornecedorId: fornecedor.id,
      },
    ],
  });

  console.log("✅ Seed executada com sucesso!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
