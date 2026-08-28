# 📦 Controla Shop - Gestão e Controle de Estoque

> Micro SaaS moderno, ágil e intuitivo para controle de estoque, gestão de catálogo de produtos, fornecedores e análise de movimentações financeiras em tempo real.

---

## 🚀 Sobre o Projeto

O **Controla Shop** é uma plataforma desenvolvida para simplificar a gestão de estoque de pequenas e médias empresas. Com uma interface moderna, responsiva e focada em produtividade. O sistema oferece controle de ponta a ponta sobre mercadorias, fornecedores, entradas/saídas e alertas de reposição.

---

## ✨ Principais Funcionalidades

### 📊 1. Painel de Controle (Dashboard)

- **Cards de Métricas em Tempo Real**:
  - **Produtos Cadastrados**: Total de itens únicos catalogados.
  - **Itens em Estoque**: Quantidade física global disponível.
  - **Estoque Baixo**: Alerta imediato para produtos que atingiram o limite mínimo de segurança.
  - **Entradas e Saídas do Dia**: Indicadores diários de fluxo e variações percentuais.
  - **Valor Total em Estoque**: Patrimônio total a preço de venda e custo de aquisição.
- **Gráficos Interativos**:
  - **Entradas por Mês**: Histórico anual de compras/reposição com toggle entre volume físico e valor monetário.
  - **Produtos Mais Vendidos**: Ranking visual de demanda com faturamento gerado e nível de estoque atual.
- **Ações Rápidas**: Acesso direto para registrar novas entradas, saídas, produtos e fornecedores.

### 📦 2. Gestão de Produtos

- Cadastro com nome, SKU, código de barras EAN-13, descrição, fornecedor e categoria.
- Definição de preço de compra, preço de venda e margem.
- Controle de quantidade atual e estoque mínimo de segurança.
- Busca em tempo real e filtros dinâmicos.
- Edição detalhada e exclusão de itens.

### 🏷️ 3. Categorias

- Segmentação e agrupamento de catálogo.
- Organização para relatórios e pesquisas rápidas.

### 🚚 4. Fornecedores

- Cadastro completo com Razão Social/Nome Fantasia, CNPJ, Inscrição Estadual (IE).
- Dados de contato (email, telefone) e endereço completo.
- Vinculação direta com os produtos fornecidos.

### 🔄 5. Movimentação de Estoque

- Registro de **Entradas** (compras, devoluções, reposição).
- Registro de **Saídas** (vendas, baixas, perdas).
- Histórico auditável por data e observações.

### 🔒 6. Autenticação e Segurança

- Autenticação via **NextAuth (Auth.js v5)** com credenciais seguras e senhas criptografadas (`bcryptjs`).
- Controle de acesso baseado em funções (Admin e Colaboradores).
- Proteção automática de rotas via Middleware/Server Components.

---

## 🛠️ Tecnologias Utilizadas

| **Framework** | [Next.js 16.3] (App Router & Server Components)
| **Biblioteca UI** | [React 19]
| **Estilização** | [Tailwind CSS v4]
| **Componentes Base** | [Base UI] & [Lucide Icons]
| **Banco de Dados & ORM** | [PostgreSQL] & [Prisma ORM 7.9]
| **Formulários & Validação** | [React Hook Form] & [Zod]
| **Autenticação** | [NextAuth.js v5 (Beta)]
| **Linguagem** | [TypeScript 5]

## ⚙️ Como Executar o Projeto Localmente

### 1. Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 20 ou superior)
- Gerenciador de pacotes `npm` (ou `pnpm` / `yarn`)
- Instância de banco de dados PostgreSQL (local ou em nuvem como [Neon](https://neon.tech/))

### 2. Clonar o repositório

```bash
git clone https://github.com/higorpalamin/controla-shop.git
cd controla-shop
```

### 3. Instalar as dependências

```bash
npm install
```

### 4. Configurar as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes chaves:

```env
DATABASE_URL="postgresql://USUARIO:SENHA@HOST:PORTA/NOME_BANCO?sslmode=require"
AUTH_SECRET="sua_chave_secreta_aqui"
```

> **Dica**: Você pode gerar um `AUTH_SECRET` seguro rodando `npx auth secret` ou `openssl rand -base64 32`.

### 5. Executar as migrações e seed do banco

```bash
# Executar as migrações do Prisma
npx prisma migrate dev

# (Opcional) Popular o banco com dados de teste
npx tsx prisma/seed.ts
```

### 6. Iniciar o servidor de desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no seu navegador para utilizar a aplicação.

---

## 🧪 Scripts Disponíveis

- `npm run dev`: Inicia o servidor Next.js em modo de desenvolvimento.
- `npm run build`: Cria a build otimizada para produção.
- `npm run start`: Inicia o servidor em modo de produção.
- `npm run lint`: Executa a verificação estática de código com o ESLint.
