# Coutinho Team API — Arquitetura e Padrões

## Stack

| Tecnologia | Uso |
|---|---|
| **Fastify v5** | Framework HTTP |
| **Prisma** | ORM + migrations (PostgreSQL) |
| **Zod** | Validação de schemas + serialização |
| **fastify-type-provider-zod** | Integração Zod ↔ Fastify (tipos automáticos) |
| **@fastify/jwt** | Autenticação JWT |
| **@fastify/swagger + swagger-ui** | Documentação OpenAPI em `/api-docs` |

---

## Arquitetura em Camadas

Cada feature é um **módulo independente** com 5 arquivos:

```
src/modules/<nome>/
├── <nome>.schema.ts      ← Validação (Zod)
├── <nome>.model.ts       ← Acesso a dados (Prisma)
├── <nome>.controller.ts  ← Lógica de negócio
├── <nome>.routes.ts      ← Definição de rotas
└── index.ts              ← Registro do plugin Fastify
```

### Responsabilidades

| Camada | Responsabilidade |
|---|---|
| **schema** | Schemas Zod de entrada e resposta. Nunca contém lógica. |
| **model** | Funções puras que chamam `prisma.*`. Sem lógica de negócio. |
| **controller** | Classe estática. Valida existência, chama model, retorna resposta. |
| **routes** | Registra rotas com `schema` (Swagger) e `preHandler` (auth). |
| **index.ts** | Envolve as routes em `fastify-plugin` e registra no servidor. |

---

## Como Criar um Novo Módulo

### 1. Crie os arquivos do módulo

**`<nome>.schema.ts`** — schemas de validação e resposta:
```typescript
import { z } from "zod";

export const entityById = z.object({ id: z.number() });
export const createEntitySchema = z.object({ name: z.string() });
export const entityResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  created_date: z.date().nullable(),
  deleted_date: z.date().nullable(),
  modificated_date: z.date().nullable(),
});
export const notFoundSchema = z.object({ message: z.string() });
export const createdEntitySchema = z.object({ message: z.string() });
```

**`<nome>.model.ts`** — acesso a dados:
```typescript
import { prisma } from "../../../prisma/lib/prisma";

export const getEntities = async () =>
  await prisma.entity.findMany({ where: { deleted_date: null } });

export const getEntityById = async (id: number) =>
  await prisma.entity.findUnique({ where: { id } });

export const createEntity = async (name: string) =>
  await prisma.entity.create({ data: { name } });

export const softDeleteEntity = async (id: number) =>
  await prisma.entity.update({ where: { id }, data: { deleted_date: new Date() } });
```

**`<nome>.controller.ts`** — lógica de negócio:
```typescript
import { FastifyRequest, FastifyReply } from "fastify";
import { getEntities, getEntityById, createEntity } from "./entity.model";

type ByIdParams = { Params: { id: number } };
type CreateBody = { Body: { name: string } };

export class EntityController {
  public static async getAll(_req: FastifyRequest, reply: FastifyReply) {
    reply.send(await getEntities());
  }

  public static async getById(req: FastifyRequest<ByIdParams>, reply: FastifyReply) {
    const entity = await getEntityById(req.params.id);
    if (!entity) return reply.code(404).send({ message: "Entity not found" });
    reply.send(entity);
  }

  public static async create(req: FastifyRequest<CreateBody>, reply: FastifyReply) {
    await createEntity(req.body.name);
    reply.code(201).send({ message: "Entity created!" });
  }
}
```

**`<nome>.routes.ts`** — rotas:
```typescript
import z from "zod";
import { FastifyTypedInstance } from "../../shared/types/fastifyTypedInstance";
import { EntityController } from "./entity.controller";
import { authenticate } from "../../shared/utils/authHook";
import { entityById, entityResponseSchema, createEntitySchema, notFoundSchema, createdEntitySchema } from "./entity.schema";

export default async function entityRoutes(server: FastifyTypedInstance) {
  server.get("/entities", {
    preHandler: authenticate,
    schema: { tags: ["Entity"], description: "List entities", response: { 200: z.array(entityResponseSchema) } },
  }, EntityController.getAll);

  server.post("/entities", {
    preHandler: authenticate,
    schema: { tags: ["Entity"], description: "Create entity", body: createEntitySchema, response: { 201: createdEntitySchema } },
  }, EntityController.create);
}
```

**`index.ts`** — plugin:
```typescript
import fp from "fastify-plugin";
import type { FastifyInstance } from "fastify";
import entityRoutes from "./entity.routes";

async function EntityModules(fastify: FastifyInstance) {
  fastify.register(entityRoutes);
}

export default fp(EntityModules, { name: "entity-module" });
```

### 2. Registre no server.ts

```typescript
import EntityModules from "./src/modules/<nome>/index";
// ...
server.register(EntityModules);
```

---

## Convenções de Rotas

| Operação | Método | Padrão de rota |
|---|---|---|
| Listar tudo | GET | `/recursos` |
| Buscar por ID | POST | `/recurso-by-id/:id` |
| Criar | POST | `/recursos` |
| Atualizar | PATCH | `/update-recurso` (id no body) |
| Deletar | DELETE | `/recursos/:id` |
| Sub-recursos | GET/POST/PATCH/DELETE | `/recursos/:id/sub-recurso` |

### Rotas estáticas vs. dinâmicas

**Atenção:** ao adicionar rotas estáticas no mesmo nível de rotas com `:id` (ex: `GET /clients/count` e `GET /clients/:id`), registre as **estáticas primeiro** no arquivo de routes. Fastify prioriza rotas estáticas sobre dinâmicas, mas o Zod validation em `:id` retornaria 400 ao receber "count" como valor se a rota dinâmica fosse processada.

---

## Autenticação

Todas as rotas protegidas usam o hook `authenticate` de `src/shared/utils/authHook.ts`:

```typescript
server.get("/rota-protegida", {
  preHandler: authenticate,  // ← JWT obrigatório
  schema: { ... },
}, Handler);
```

O token JWT é verificado via `request.jwtVerify()`. Retorna `401 { message: "Unauthorized" }` se inválido.

---

## Soft Delete

Nunca use delete físico. Todas as entidades têm `deleted_date: DateTime?`.

```typescript
// Soft delete
await prisma.entity.update({ where: { id }, data: { deleted_date: new Date() } });

// Listar apenas ativos
await prisma.entity.findMany({ where: { deleted_date: null } });
```

---

## Transações Prisma

Use `prisma.$transaction` quando múltiplas operações devem ser atômicas:

```typescript
return await prisma.$transaction(async (transaction) => {
  const parent = await transaction.parent.create({ data: { ... } });
  await transaction.child.create({ data: { parent_id: parent.id, ... } });
  return parent;
});
```

Nomear o parâmetro de callback como `transaction` (não `tx`).

---

## Padrão de Erros

| Status | Situação | Formato |
|---|---|---|
| 400 | Dados inválidos ou regra de negócio | `{ message: "Plan not found" }` |
| 401 | Token ausente ou inválido | `{ message: "Unauthorized" }` |
| 404 | Recurso não encontrado | `{ message: "Client not found" }` |
| 201 | Criação bem-sucedida | `{ message: "Entity created!" }` |
| 200 | Sucesso | Objeto ou array de dados |

---

## Módulos Existentes

| Módulo | Prefixo | Descrição |
|---|---|---|
| `auth` | `/login` | Autenticação JWT |
| `users` | `/users` | Usuários do CRM |
| `lead` | `/leads` | Leads (pré-clientes) |
| `plans` | `/plans` | Planos de treino |
| `client` | `/clients` | Clientes ativos |
| `feedback` | `/feedbacks` | Feedbacks NPS dos clientes |

---

## Estrutura de Pastas Resumida

```
api/
├── server.ts                   ← Entry point, registro de módulos
├── prisma/
│   ├── schema.prisma           ← Schema do banco
│   ├── migrations/             ← Histórico de migrations
│   └── lib/prisma.ts           ← Client Prisma singleton
├── generated/prisma/           ← Tipos gerados (não editar)
└── src/
    ├── modules/                ← Um diretório por feature
    └── shared/
        ├── types/
        │   └── fastifyTypedInstance.ts  ← Tipo FastifyTypedInstance com ZodTypeProvider
        └── utils/
            ├── authHook.ts     ← Middleware JWT
            ├── hashPassword.ts ← bcrypt helpers
            └── mailer.ts       ← Nodemailer (emails de lead)
```
