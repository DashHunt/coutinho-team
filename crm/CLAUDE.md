# Coutinho Team CRM — Frontend

Sistema de gestão interna da equipe de powerlifting Coutinho Team (leads, clientes/atletas, planos, blocos de treino, conquistas, feedback). React 19 + TypeScript + Vite + Tailwind CSS v4.

A especificação completa de domínio (modelo de dados, regras de negócio, roadmap) está em [`DOCUMENTATION.md`](./DOCUMENTATION.md) — leia lá antes de implementar uma feature nova. Este arquivo documenta só as convenções de código do frontend.

> Este projeto (`crm/`) é distinto de `coutinho-team-spa/` (site institucional, projeto separado, não relacionado).

## Tech Stack

| Tool | Papel |
|---|---|
| React 19 + TypeScript | UI + tipos |
| Vite | Build tool |
| Tailwind CSS v4 | Estilo |
| React Router DOM v7 | Rotas |
| TanStack React Query v5 | Data fetching/cache |
| React Hook Form + Zod | Formulários + validação |
| Zustand | Estado global (ex: sessão de auth) |
| Axios | Cliente HTTP |

## Estrutura de pastas

```
src/
├── features/
│   └── <feature>/
│       ├── pages/          # telas da feature
│       ├── components/     # componentes só usados por essa feature
│       ├── hooks/           # useQuery/useMutation da feature (ex: useLogin, useLeads)
│       ├── schemas/         # validação Zod (espelha o schema do backend)
│       └── types/
├── pages/                   # composição de rota (ex: pages/login/login.route.ts + loginPage.tsx)
├── shared/
│   ├── api/                 # instância Axios (apiClient.ts) + endpoints + queryClient
│   ├── hooks/                # hooks reaproveitáveis entre features
│   ├── layouts/               # AppLayout (shell autenticado)
│   ├── lib/                   # utilitários genéricos
│   ├── router/                # AppRouter, ProtectedRoute
│   ├── types/
│   └── ui/                    # design system (a construir)
```

Regra prática: código específico de uma feature (Leads, Clients, Plans, Achievements, Feedback) vive em `features/<feature>/`; código reaproveitado por mais de uma feature vive em `shared/`. Rotas ficam em `pages/`, que importam páginas de `features/<feature>/pages`.

## Autenticação

- Access token JWT (15min) guardado só em memória (Zustand, sem `persist` — nunca em `localStorage`, para reduzir superfície de ataque XSS).
- Refresh token (7 dias, rotativo) vive em cookie `httpOnly` — o frontend nunca lê nem escreve esse cookie diretamente; o browser envia automaticamente porque `apiClient.ts` usa `withCredentials: true`.
- `shared/api/apiClient.ts` injeta o access token via interceptor de request e renova automaticamente em 401 via interceptor de response (chama `POST /refresh-token` uma vez e repete a chamada original).
- Ao carregar o app, `shared/hooks/useBootstrapAuth.ts` tenta recuperar a sessão chamando `/refresh-token` a partir do cookie, antes de decidir se redireciona para `/login` — sem isso, um F5 derrubaria a sessão mesmo com cookie válido.
- Rotas autenticadas ficam dentro de `shared/router/ProtectedRoute.tsx`.

## Convenções

- Nomes de variáveis sempre descritivos — nunca usar letras soltas (`i`, `x`, `y`, `j`, `m`), nem em loops.
- Sem abstração prematura: não criar hook/wrapper genérico para um caso de uso único.
- Cada feature busca dados via hooks próprios em `features/<feature>/hooks/` (padrão TanStack Query), nunca chamando `axiosClient` direto de dentro de um componente.
- Schemas Zod no frontend espelham o schema Zod do backend correspondente (`api/src/modules/<feature>/<feature>.schema.ts`) — mesma forma de dado, validado nos dois lados.
