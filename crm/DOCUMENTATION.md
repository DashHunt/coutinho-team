# Coutinho Team CRM — Especificação Técnica

**Versão:** 1.0
**Autor:** Arthur Coutinho
**Status:** Aprovado para início de desenvolvimento
**Última atualização:** julho/2026

---

## 1. Visão Geral

O **Coutinho Team CRM** é o sistema de gestão interna da equipe de powerlifting Coutinho Team. Ele centraliza todo o ciclo de vida do relacionamento com atletas: da captação de Leads no site institucional até a gestão de clientes ativos (planos, blocos de treino, conquistas e feedback).

O CRM **substitui** o fluxo manual atual baseado em planilha (`ORGANIZADOR DE PLANILHAS`), mantendo a mesma lógica de negócio (bloco/semana de treino, planos, status de pagamento por fora) mas com estrutura relacional, histórico e auditoria.

**Referência de mercado:** Liveclin (principal sistema de gestão de pacientes/atletas do meio do powerlifting) — usado como benchmark de funcionalidades, não de arquitetura técnica.

### 1.1 Fora de escopo (MVP)
- Site institucional (já pronto, não será alterado).
- Controle financeiro/faturas (pagamento é gerenciado por plataforma externa).
- Portal do cliente/atleta (login do aluno).
- Editor de treino interno (substituição da planilha do Sheets).
- Cadastro de novos treinadores via UI (feito via seed).
- Pipeline de CI/CD.
- Containerização do frontend.

---

## 2. Arquitetura

### 2.1 Princípios
- **Feature-first / feature-based**: cada funcionalidade é uma unidade vertical autocontida (rotas, controller, service, model/repository, schema de validação, tipos), reduzindo acoplamento entre domínios.
- **Clean Code + SOLID**: funções pequenas, single responsibility por camada, injeção de dependência simples (sem necessidade de DI container), nomes de domínio (PT-BR nos dados de negócio, EN no código).
- **Escalabilidade vertical**: a estrutura deve permitir adicionar uma nova feature sem tocar em features existentes (Open/Closed).
- **Camadas por módulo:** `routes → controller → service → repository (Prisma)`, com `schemas/` (Zod) para validação de entrada/saída e `types/` para contratos TS.

### 2.2 Estrutura de pastas — Backend (`api/`)

```
api/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── src/
│   ├── @types/                  # tipos globais (ex: Fastify augmentation p/ JWT)
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── auth.routes.ts
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.schema.ts    # Zod
│   │   │   └── auth.model.ts     # já existente
│   │   ├── team/                 # NOVO
│   │   ├── users/                # treinadores
│   │   ├── lead/
│   │   ├── client/
│   │   ├── plans/
│   │   ├── client-plan-history/
│   │   ├── client-info/
│   │   ├── achievements/
│   │   ├── feedback/
│   │   └── dashboard/
│   └── shared/
│       ├── middlewares/
│       │   ├── authHook.ts       # já existente (renomear p/ preHandler de auth)
│       │   └── error-handler.ts
│       ├── utils/
│       │   ├── hashPassword.ts   # já existente
│       │   ├── pagination.ts     # NOVO
│       │   └── date.ts           # cálculo de expiration_date
│       ├── errors/               # EmailNotFound, InvalidCredentials, etc. (já existente)
│       └── types/
├── docker-compose.yml
├── Dockerfile
└── server.ts
```

Cada módulo de feature segue o mesmo esqueleto, garantindo previsibilidade (bate com o padrão já usado em `auth/`).

### 2.3 Estrutura de pastas — Frontend (`crm/`)

```
crm/src/
├── features/
│   ├── auth/                    # login, contexto de refresh token
│   ├── dashboard/
│   ├── leads/
│   ├── clients/
│   ├── plans/
│   ├── achievements/
│   └── feedback/
│       └── <feature>/
│           ├── pages/
│           ├── components/
│           ├── hooks/            # useLeads, useCreateLead, etc. (TanStack Query)
│           ├── schemas/          # Zod (mesma forma do back, adaptado)
│           └── types/
└── shared/
    ├── api/                      # instância Axios + interceptors (refresh token)
    ├── hooks/
    ├── layouts/                  # AppLayout (sidebar/topbar autenticado)
    ├── lib/
    ├── router/                   # rotas protegidas por role
    ├── types/
    └── ui/                       # componentes de design system
```

---

## 3. Modelo de Dados (Prisma)

### 3.1 Alterações aprovadas em relação ao schema atual

**Novo: multi-tenancy estrutural (Equipe/Treinador)**
Decisão: criar a entidade `Team` e vincular `Users` a ela com `role`, mas **sem** escopar ainda os dados de negócio (`Lead`, `Client`, `Plans`, etc.) por `team_id`. Justificativa: hoje existe uma única equipe operando; a estrutura fica pronta para multi-tenant completo no futuro (bastaria adicionar `team_id` nas tabelas de negócio e um middleware de escopo), sem gerar complexidade agora.

```prisma
enum Role {
  ADMIN
  COACH
}

model Team {
  id               Int       @id @default(autoincrement())
  name             String
  created_date     DateTime  @default(now())
  deleted_date     DateTime?
  modificated_date DateTime  @updatedAt
  users            Users[]
}

model Users {
  id               Int       @id @default(autoincrement())
  name             String
  email            String    @unique
  password         String
  role             Role      @default(COACH)
  team_id          Int
  team             Team      @relation(fields: [team_id], references: [id])
  refreshTokens    RefreshToken[]
  created_date     DateTime  @default(now())
  deleted_date     DateTime?
  modificated_date DateTime  @updatedAt
}

model RefreshToken {
  id               Int       @id @default(autoincrement())
  token_hash       String    @unique
  user_id          Int
  user             Users     @relation(fields: [user_id], references: [id])
  expires_at       DateTime
  revoked          Boolean   @default(false)
  created_date     DateTime  @default(now())
}
```

**Lead ↔ Client — histórico de conversão**
```prisma
model Lead {
  id               Int        @id @default(autoincrement())
  name             String
  email            String     @unique
  telephone_number String
  history          String?
  selected_plan    String?     // texto livre vindo do site institucional
  status           LeadStatus @default(CRIADO)
  created_date     DateTime   @default(now())
  deleted_date     DateTime?
  modificated_date DateTime   @updatedAt
  client           Client?     // relação inversa (1:1, opcional)
}

model Client {
  // ...campos já existentes
  lead_id          Int?       @unique
  lead             Lead?      @relation(fields: [lead_id], references: [id])
  public_token     String     @unique @default(uuid()) // NOVO — usado no link público de feedback
}
```
> `lead_id` fica nulo se o cliente for cadastrado diretamente (sem passar por Lead).

**Achievements — visibilidade no site**
```prisma
model ClientAchievements {
  // ...campos já existentes
  show_on_website  Boolean   @default(false) // NOVO — controla exibição em "Depoimentos"
}
```

**Feedback — preenchido pelo próprio cliente**
O `ClientFeedback` continua igual estruturalmente. O acesso é feito via rota pública `POST /public/clients/:public_token/feedback` (sem JWT), usando o `public_token` do `Client` — não expõe o `id` numérico incremental.

### 3.2 Regras de cálculo
- `ClientPlanHistory.expiration_date = purchased_date + Plans.duration` (dias), calculado no backend na criação/renovação — nunca enviado pelo client.
- Renovação de plano **sempre cria um novo registro** em `ClientPlanHistory` (nunca dá update no anterior); o registro antigo é marcado `status = INATIVO` na criação do novo.
- Um cliente possui **no máximo um** `ClientPlanHistory` com `status = ATIVO` por vez (regra de negócio validada no service, não no banco).

---

## 4. Autenticação

- **JWT de acesso** (curta duração, ex: 15min) + **Refresh Token** (longa duração, ex: 7 dias), padrão rotação de refresh token a cada uso, armazenado com hash na tabela `RefreshToken` (permite revogação/logout).
- Frontend: `AuthContext`/hook compartilhado (`shared/hooks/useAuth`) + interceptor Axios que renova o access token automaticamente em 401.
- Autorização por `role` (`ADMIN`/`COACH`) desde já na estrutura de rotas do backend (`preHandler` de auth + verificação de role), mesmo com um único usuário hoje.
- Sem tela de cadastro de usuário — criação via **seed** (`prisma/seed.ts`), incluindo criação do `Team` inicial.
- Rota pública de feedback (`/public/clients/:public_token/feedback`) **não passa** pelo hook de autenticação.

---

## 5. Módulos e Regras de Negócio

### 5.1 Leads
- CRUD completo (criação já vem do site institucional via rota pública já existente — não mexer).
- Listagem com paginação (10/página), busca por nome/email, filtro por `status`.
- Ação **"Converter em Cliente"**: abre formulário pré-preenchido com dados do Lead + campos faltantes de `Client` (data de nascimento, gênero, documento). Ao salvar: cria `Client` vinculado ao `lead_id`, Lead permanece no banco (histórico).
- Soft delete com reativação.

### 5.2 Clients
- CRUD completo + sub-telas/abas para: `ClientInfo`, `ClientPlanHistory`, `ClientAchievements`, `ClientFeedback`.
- Listagem com paginação, busca, filtro (ex: plano ativo/vencido).
- Ação "Reativar" para registros com `deleted_date`.

### 5.3 Plans
- CRUD dos planos "modelo" (mensal, trimestral, semestral — conforme planilha atual).
- Ao vincular um plano a um cliente (`ClientPlanHistory`), backend calcula `expiration_date` automaticamente.
- Ação de renovação: cria novo `ClientPlanHistory`, inativa o anterior.

### 5.4 ClientInfo (bloco de treino)
- Campos `block` / `block_week` / `previous_block` seguem o padrão observado na planilha (`BLOCO N`, `SEMANA N` de 1 a 4). Mantidos como `String` livre no banco (flexibilidade), mas o **frontend** oferece select controlado (Bloco 1–N, Semana 1–4) para evitar erro de digitação.
- `sheet_link`: campo de URL simples (link externo para a planilha atual de treino do aluno).

### 5.5 Achievements
- CRUD de conquistas por cliente.
- Toggle `show_on_website`: quando `true`, o registro fica disponível para consumo futuro pelo site institucional (endpoint público de leitura, fora do escopo deste MVP, mas o campo já é modelado).
- Usado também para métricas/gráficos no Dashboard (ex: conquistas por nível de evento).

### 5.6 Feedback (NPS)
- Preenchido pelo **cliente**, via link público com `public_token` (sem autenticação).
- Treinador visualiza listagem/histórico de feedbacks por cliente no CRM (somente leitura para o treinador).

### 5.7 Dashboard
Métricas prioritárias (ordem de prioridade confirmada):
1. MRR (soma de `monthly_value` dos planos com `ClientPlanHistory.status = ATIVO`).
2. Atletas ativos vs. finalizados (contagem por status de plano).
3. Planos vencendo (próximos 7/15 dias — `expiration_date`).
4. Aniversariantes do mês (`Client.birth_date`).

---

## 6. Padrões de API

- Documentação automática via **Swagger/Swagger UI** (já plugado) — todo endpoint novo deve declarar `schema` (tags, description, body, response) seguindo o padrão já usado em `/update-user`.
- Validação de entrada com **Zod**, schemas compartilhados via adaptador (`fastify-type-provider-zod` ou equivalente) para tipagem end-to-end.
- Paginação padrão em todas as listagens: `?page=1&limit=10` (10 registros por página, conforme definido), retornando `{ data, total, page, totalPages }`.
- Erros de domínio via classes já existentes (`EmailNotFound`, `InvalidCredentialsError`, `NotFoundError`, etc.), tratados por `error-handler` central.
- Rotas autenticadas usam `preHandler: authenticate` (hook já existente em `authHook.ts`) + verificação de `role` quando aplicável.

---

## 7. Testes

- **Backend:** Vitest (unitário — services/utils) + Supertest (integração — rotas, com banco de teste isolado/transacional).
- **Frontend:** Vitest + React Testing Library (componentes e hooks de feature).
- Cobertura prioritária: regras de negócio críticas (cálculo de `expiration_date`, conversão Lead→Client, unicidade de plano ativo, geração/validação de refresh token).

---

## 8. Não-funcionais

| Item | Definição |
|---|---|
| Soft delete | Todas as entidades com `deleted_date`; UI com ação "Reativar" |
| Paginação | Obrigatória em todas listagens, 10 registros/página |
| Docker | `docker-compose.yml` com API + Postgres (frontend roda fora do compose) |
| CI/CD | Fora de escopo por ora |
| Portal do cliente | Fora de escopo (somente treinador acessa o CRM) |

---

## 9. Roadmap de Desenvolvimento

1. **Fundação:** `Team`/`Role`/`RefreshToken` no schema + migration, middleware de auth com `preHandler`, seed inicial (Team + treinador admin).
2. **Leads:** CRUD + paginação/busca/filtro + soft delete/reativação.
3. **Clients:** CRUD + conversão de Lead + abas de `ClientInfo`/`ClientPlanHistory`.
4. **Plans:** CRUD de planos + lógica de vínculo/renovação com cálculo de `expiration_date`.
5. **Achievements & Feedback:** CRUD de conquistas (com toggle de visibilidade) + rota pública de feedback.
6. **Dashboard:** métricas (MRR, ativos/finalizados, vencimentos, aniversariantes).
7. **Testes:** cobertura incremental acompanhando cada módulo (não deixar para o final).

---

## 10. Itens em aberto (fora do MVP, mas mapeados na arquitetura)

- Escopo de dados por `team_id` em `Lead`/`Client`/`Plans` (multi-tenancy completo).
- Endpoint público de leitura de `ClientAchievements` para o site institucional (seção "Depoimentos").
- Editor de treino interno substituindo o `sheet_link`.
- Cadastro de treinadores via UI.
- Controle financeiro/faturas dentro do CRM.
- Portal do cliente/atleta.