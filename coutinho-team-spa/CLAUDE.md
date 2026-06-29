# Coutinho Team SPA

Landing page institucional da **Coutinho Team Powerlifting** — React 19 + TypeScript + Tailwind CSS v4 + Vite.

## Tech Stack

| Tool | Version | Role |
|---|---|---|
| React + TypeScript | 19 / 6 | UI + type safety |
| Tailwind CSS v4 | 4.3 | Styling (no config file — uses `@theme` in CSS) |
| Vite | 8 | Build tool |
| React Router DOM | 7 | Routing (installed, not yet implemented) |
| React Hook Form + Zod | 7 / 4 | Forms + validation (installed, not yet wired) |
| TanStack React Query | 5 | Data fetching (installed, not yet wired) |
| Zustand | 5 | Global state (installed, not yet wired) |
| Lucide React / HeroIcons | — | Icon libraries (available) |

## Design System

Tokens are defined in `src/index.css` inside the `@theme` block. The IDE may show an "Unknown at rule @theme" warning — this is a CSS validator false positive; Tailwind v4 processes it correctly.

### Colors

| Token | Hex | Tailwind class |
|---|---|---|
| `--color-base` | `#0b0b0b` | `bg-base`, `text-base` |
| `--color-elevated` | `#17140f` | `bg-elevated` |
| `--color-raised` | `#1f1a14` | `bg-raised` |
| `--color-bone` | `#f5dcc0` | `text-bone`, `border-bone` |
| `--color-ember` | `#ff5a2e` | `text-ember`, `bg-ember`, `border-ember` |
| `--color-ember-deep` | `#b8311a` | `bg-ember-deep`, `border-ember-deep` |
| `--color-cream` | `#f3f1ec` | `text-cream` |

Use opacity modifiers for translucent values: `border-bone/12`, `text-cream/80`, `bg-base/85`.

### Typography

| Token | Stack | Class |
|---|---|---|
| `--font-display` | Anton, Archivo Black | `font-display` |
| `--font-body` | Inter, system-ui | `font-body` |

Base `h1–h6` use `font-display` + `uppercase` from `@layer base`. Override with `font-body normal-case` when needed.

## Project Structure

```
src/
├── assets/              # Static images (logos, mascots)
├── components/
│   ├── ui/              # Reusable primitives (Button, Card, Navbar, Modal)
│   │   ├── CLAUDE.md    # UI primitives documentation
│   │   ├── Card.tsx     # Base card container — used directly by section components
│   │   ├── Button.tsx
│   │   ├── Navbar.tsx
│   │   └── Modal.tsx
│   ├── CLAUDE.md        # Section components documentation
│   ├── Hero.tsx
│   ├── Sobre.tsx
│   ├── Beneficios.tsx
│   ├── Equipe.tsx
│   ├── Atletas.tsx
│   ├── Planos.tsx
│   ├── Depoimentos.tsx
│   ├── CtaFinal.tsx
│   ├── Footer.tsx
│   └── LeadForm.tsx
├── lib/
│   └── utils.ts         # cn() helper
├── App.tsx              # Root: modal state + page composition
├── index.css            # Design tokens + base styles
└── main.tsx             # React entry point
```

## Patterns

### Container
All sections use `max-w-[1180px] mx-auto px-6` inline — no custom container class.

### Section backgrounds
- Default (dark base): `py-[90px]`
- Elevated (slightly lighter): `py-[90px] bg-elevated border-t border-b border-bone/12`

### Static data
Each section holds its own data in a typed array at the top of the file (e.g., `BENEFITS`, `TEAM`, `PLANOS`). To integrate a real API, replace the array with a React Query hook.

### Modal flow
Modal state lives in `App.tsx`:
```tsx
const [modal, setModal] = useState<{ isOpen: boolean; plan: string }>({ isOpen: false, plan: '' });
```
`Planos` receives `onSelectPlan` → opens modal with selected plan name → `Modal` passes it to `LeadForm` as a hidden field.

### Utility
`cn(...classes)` in `src/lib/utils.ts` — simple class concatenation, no conflict resolution. Avoid passing conflicting Tailwind classes for the same CSS property.

## TODOs

- [ ] `LeadForm.tsx` — connect `handleSubmit` to API / WhatsApp / email service
- [ ] `Footer.tsx` — replace `href="#"` with real social media and privacy policy URLs
- [ ] Contact info — update phone and email in `Footer.tsx`
- [ ] Athlete/coach data — replace all placeholder arrays with real content
- [ ] Stats — update `+00` placeholders with real medal/athlete counts
- [ ] Pricing — update `R$ 000` with real plan prices
