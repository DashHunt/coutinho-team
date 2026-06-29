# UI Primitives — `src/components/ui/`

Reusable, domain-agnostic building blocks. No business logic or hardcoded content here — all data is passed via props.

---

## CarouselComponent

**File:** `Carousel.tsx`

Carrossel scroll-snap nativo (sem biblioteca externa). Mostra um card centralizado com peek de ~10% dos cards adjacentes em cada lado. Suporta swipe tátil e navegação por setas/dots.

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | — | Cards ou slides (qualquer ReactNode) |
| `initialIndex` | `number` | `0` | Índice do card a exibir no mount (sem animação) |

```tsx
<CarouselComponent initialIndex={PLANOS.findIndex(p => p.featured)}>
  {PLANOS.map(p => <Card key={p.id}>...</Card>)}
</CarouselComponent>
```

**Como funciona o peek:** container com `px-[10%]` + cada slide com `w-[80%]` → os 10% de cada lado expõem os cards vizinhos.

---

## Card

**File:** `Card.tsx`

Base container for all card-style UI blocks. Used directly by section components — there are no named card wrappers (BenefitCard, TeamCard, etc.).

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'base' \| 'elevated' \| 'raised'` | `'base'` | Background token |
| `hover` | `'scale' \| 'lift' \| 'border' \| 'none'` | `'none'` | Hover effect |
| `padding` | `'sm' \| 'md' \| 'lg' \| 'none'` | `'md'` | Internal padding preset — use `'none'` + `className` for custom values |
| `rounded` | `'md' \| 'lg'` | `'lg'` | Border radius — `md`=10px, `lg`=14px |
| `featured` | `boolean` | `false` | Ember border + glow shadow + slight upward translate (used by the featured plan in `Planos`) |
| `className` | `string` | — | Extra classes appended last (escape hatch) |
| `children` | `ReactNode` | — | Card content |

**Padding presets:** `sm`=`px-5 py-4` · `md`=`px-6 py-7` · `lg`=`px-[26px] py-[30px]`

**Hover presets:**
- `scale` → `transition-transform duration-300 hover:scale-102`
- `lift` → `transition-all duration-200 hover:-translate-y-1`
- `border` → `transition-all duration-200 hover:border-ember-deep`

```tsx
<Card variant="elevated" hover="scale" padding="md" rounded="lg">
  ...content...
</Card>

<Card variant="base" featured padding="md" rounded="lg" className="relative flex flex-col">
  ...featured plan content...
</Card>
```

---

## Button / ButtonLink

**File:** `Button.tsx`

Two exports sharing identical visual styles. `Button` renders a `<button>`, `ButtonLink` renders an `<a>`.

### Shared props

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'ember' \| 'ghost' \| 'outline-ember'` | `'ember'` | Visual style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size |
| `className` | `string` | — | Extra classes (appended, no conflict resolution) |

`Button` also accepts all `<button>` HTML attributes (`type`, `onClick`, `disabled`, etc.).  
`ButtonLink` also accepts all `<a>` HTML attributes (`href`, `target`, `rel`, etc.).

### Variants

| Variant | Use case |
|---|---|
| `ember` | Primary CTA (solid orange) |
| `ghost` | Secondary action (translucent border) |
| `outline-ember` | Tertiary action (ember border, transparent fill) |

```tsx
<Button variant="ember" size="lg" type="submit">Salvar</Button>
<ButtonLink href="#planos" variant="ghost" size="lg">Ver planos</ButtonLink>
<Button variant="outline-ember" onClick={handler}>Escolher plano</Button>
```

---

## Modal

**File:** `Modal.tsx`

Overlay dialog containing the lead form. Closes on outside click, `Escape` key, or the `×` button. Locks body scroll while open.

| Prop | Type | Description |
|---|---|---|
| `isOpen` | `boolean` | Visibility toggle |
| `selectedPlan` | `string` | Pre-selected plan name passed to the form |
| `onClose` | `() => void` | Close callback |

Modal state lives in `App.tsx` and is opened by `Planos` via `onSelectPlan`.

---

## Navbar

**File:** `Navbar.tsx`

Sticky header with logo, anchor nav links, desktop CTA, and a mobile hamburger menu. Manages its own `isOpen` state for the mobile dropdown.

To add or remove nav items, edit the `NAV_LINKS` array at the top of the file.
