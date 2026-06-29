<div align="center">

# 🏋️ Coutinho Team

### Plataforma full stack para captação e gestão de atletas de Powerlifting

[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![Fastify](https://img.shields.io/badge/Fastify-5-000000?style=flat&logo=fastify&logoColor=white)](https://fastify.dev/)
[![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?style=flat&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=flat&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](#-licença)

</div>

---

## 📖 Sobre o projeto

**Coutinho Team** é uma plataforma full stack desenvolvida para a Coutinho Team, equipe de Powerlifting que precisava digitalizar dois processos que hoje vivem em planilhas e WhatsApp: **captação de novos alunos** e **gestão de atletas ativos**.

O monorepo reúne três aplicações que conversam entre si através de uma API central:

| Produto | Descrição |
|---|---|
| 🌐 **Landing Page Institucional** | Site público da equipe, com formulário de captação de leads integrado à API |
| 📊 **CRM Coutinho Team** | Painel interno para gestão de leads e clientes ativos — planos, pagamentos, blocos de treino e conquistas em competições. Inspirado em ferramentas como o LiveClin, adaptado para a realidade de uma equipe de Powerlifting |
| ⚙️ **API** | Backend que centraliza toda a regra de negócio, autenticação e persistência de dados dos dois produtos acima |

> A landing page já está no ar e pode ser vista em ação — formulário de lead criando registros direto no CRM em tempo real.

---

## 🧠 Sobre o processo de desenvolvimento

Esse projeto foi construído com apoio do **Claude Code** como ferramenta de produtividade, dentro de um fluxo de **Spec-Driven Development (SDD)**: specs e regras de negócio foram definidas antes da implementação, e cada decisão de arquitetura, modelagem de dados e trade-off técnico foi **validada, revisada e ajustada manualmente** — não é um projeto "vibe coded".

Na prática, isso significou:
- Specs e contratos de API definidos antes do código
- Modelagem de banco revisada camada por camada (relações, enums, histórico de dados sensível a regra de negócio)
- Decisões de segurança (rate limiting, validação de payload, autorização em rotas públicas) pensadas e implementadas deliberadamente, não geradas por padrão
- Uso de IA como acelerador de implementação — não como substituto de raciocínio de engenharia

---

## 🏗️ Arquitetura

O projeto é um **monorepo** dividido em três aplicações independentes que compartilham padrões arquiteturais entre si:

```
coutinho-team/
├── api/                    # Backend (Fastify + TypeScript + Prisma)
├── coutinho-team-spa/      # Landing page institucional (React + TS)
└── crm/                    # CRM interno (React + TS)
```

> Ajuste os nomes acima conforme a estrutura real das pastas do seu repositório.

### Backend — Feature-Based + Layered Architecture

A API é organizada por **módulos de domínio** (feature-based), e cada módulo é dividido em camadas com responsabilidade única:

```
src/
├── modules/
│   ├── auth/
│   ├── client/
│   ├── lead/
│   │   ├── lead.routes.ts        # Definição de rotas e schemas do Fastify
│   │   ├── lead.controller.ts    # Orquestração da requisição/resposta
│   │   ├── lead.model.ts         # Acesso a dados (Prisma)
│   │   ├── lead.schema.ts        # Validação (Zod)
│   │   └── index.ts
│   ├── plans/
│   └── users/
├── shared/
│   ├── types/
│   └── utils/
│       ├── authHook.ts           # Hook de autenticação/autorização (JWT)
│       ├── hashPassword.ts        # Hash de senha (bcrypt)
│       └── mailer.ts             # Envio de emails (Nodemailer)
└── server.ts
```

**Por que essa separação?** Cada módulo é autocontido (rotas, controller, acesso a dados e validação vivem juntos), o que facilita localizar e isolar o impacto de uma mudança, e mantém testabilidade alta — cada camada tem uma única responsabilidade e pode ser testada isoladamente.

### Frontend — Composition + Feature-Based Architecture

Os dois frontends (landing page e CRM) seguem o mesmo padrão: composição de componentes por feature, com camadas de acesso a dados isoladas da UI.

```
src/
├── api/
│   ├── apiClient.ts        # Instância configurada do Axios
│   ├── endpoints.ts        # Mapeamento centralizado de endpoints
│   └── queryClient.ts      # Configuração do React Query
├── components/
│   ├── ui/                 # Componentes de UI reutilizáveis e agnósticos de domínio
│   └── *.tsx                # Componentes de feature (Hero, Planos, LeadForm, etc.)
├── lib/
├── queries/                 # Hooks de query/mutation (React Query) por domínio
├── services/                 # Camada de serviço que conversa com a API
├── App.tsx
└── main.tsx
```

**Por que essa separação?** UI de domínio (`components`) fica desacoplada da camada de comunicação com a API (`services`/`queries`), e o estado de servidor (React Query) é tratado separadamente do estado de cliente (Zustand) — evitando a armadilha comum de misturar os dois.

---

## 🛠️ Stack tecnológica

### Backend (`/api`)

| Categoria | Tecnologia |
|---|---|
| Runtime/Linguagem | Node.js + TypeScript |
| Framework HTTP | [Fastify](https://fastify.dev/) — alta performance e baixo overhead |
| ORM | [Prisma](https://www.prisma.io/) com adapter nativo `@prisma/adapter-pg` |
| Banco de dados | PostgreSQL |
| Validação | [Zod](https://zod.dev/) integrado via `fastify-type-provider-zod` |
| Autenticação | JWT (`@fastify/jwt`) + hash de senha com `bcrypt` |
| Segurança | `@fastify/rate-limit`, `@fastify/cors` |
| Documentação de API | `@fastify/swagger` + `@fastify/swagger-ui` (OpenAPI) |
| Emails | `nodemailer` |
| Infraestrutura | Docker + Docker Compose |

### Frontend (`coutinho-team-spa` e `crm`)

| Categoria | Tecnologia |
|---|---|
| Framework | [React 19](https://react.dev/) + TypeScript |
| Build tool | [Vite](https://vitejs.dev/) |
| Estilização | [Tailwind CSS 4](https://tailwindcss.com/) + [Material Tailwind](https://www.material-tailwind.com/) |
| Componentes de UI | [Headless UI](https://headlessui.com/) + [Heroicons](https://heroicons.com/) + [Lucide](https://lucide.dev/) |
| Data fetching / cache | [TanStack Query (React Query)](https://tanstack.com/query) |
| Cliente HTTP | [Axios](https://axios-http.com/) |
| Formulários | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) |
| Roteamento | [React Router](https://reactrouter.com/) |
| Estado global de cliente | [Zustand](https://zustand-demo.pmnd.rs/) |

> **Por que essa combinação?** React Query cuida de cache, revalidação e estado de servidor; Zustand cuida só do estado de UI/cliente — sem sobreposição de responsabilidade entre as duas libs. React Hook Form + Zod compartilha o mesmo schema de validação usado no backend, reduzindo duplicação de regra de negócio entre as camadas.

---

## 🔐 Segurança

Pontos implementados deliberadamente por se tratar de rotas e dados sensíveis (captação pública de leads, dados de clientes e autenticação):

- Rate limiting em rotas públicas sensíveis a abuso (ex: criação de leads)
- Validação estrita de payload com Zod em toda borda de entrada da API
- Autenticação via JWT com hook de autorização centralizado (`authHook.ts`)
- Hash de senha com `bcrypt`, nunca texto plano
- Campos sensíveis de regra de negócio (ex: status) nunca aceitos diretamente do client — sempre definidos no backend
- CORS configurado explicitamente, sem wildcard em produção

---

## 🚀 Como rodar o projeto

### Pré-requisitos

- Node.js 20+
- PostgreSQL (ou Docker, para rodar via `docker-compose`)
- npm

### 1. Clone o repositório

```bash
git clone https://github.com/<seu-usuario>/coutinho-team.git
cd coutinho-team
```

### 2. Backend (API)

```bash
cd api
cp .example.env .env   # configure as variáveis de ambiente
npm install
npx prisma migrate dev
npm run dev
```

Ou, via Docker:

```bash
docker-compose up --build
```

A documentação interativa da API (Swagger UI) fica disponível em `/api-docs` após o servidor subir.

### 3. Frontend (Landing Page ou CRM)

```bash
cd coutinho-team-spa   # ou cd crm
npm install
npm run dev
```

### Variáveis de ambiente

Veja `.example.env` em cada aplicação para a lista completa. No mínimo, a API espera:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/coutinho_team
JWT_SECRET=
SMTP_HOST=
SMTP_USER=
SMTP_PASS=
```

---

## 📂 Estrutura completa do monorepo

<details>
<summary>Clique para expandir</summary>

```
coutinho-team/
├── api/
│   ├── src/
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   ├── client/
│   │   │   ├── lead/
│   │   │   ├── plans/
│   │   │   └── users/
│   │   └── shared/
│   │       ├── types/
│   │       └── utils/
│   ├── prisma.config.ts
│   ├── docker-compose.yml
│   ├── Dockerfile
│   └── server.ts
├── coutinho-team-spa/
│   └── src/
│       ├── api/
│       ├── components/
│       ├── queries/
│       ├── services/
│       └── App.tsx
└── crm/
    └── src/ (mesmo padrão arquitetural do front institucional)
```

</details>

---

## 🗺️ Roadmap

- [ ] CAPTCHA / proteção anti-bot no formulário público de leads
- [ ] Testes automatizados (Vitest, React Testing Library, Pytest/Supertest)
- [ ] Pipeline de CI/CD
- [ ] Dashboard de métricas no CRM (conversão de lead, retenção de cliente)

---

## 📬 Contato

**Arthur Coutinho**
Founder & Software Engineer

- LinkedIn: https://www.linkedin.com/in/dev-coutinho/
- GitHub: @DashHunt
- Email: arthurlopescoutinho@hotmail.com

<div align="center">

Feito com 🦴 e muita disciplina técnica pela **Coutinho Team**

</div>
