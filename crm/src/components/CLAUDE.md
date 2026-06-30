# Section Components — `src/components/`

Each file is one section of the landing page. These components own their static data (arrays at the top of each file) and compose UI primitives from `./ui/`.

Card-style content is rendered directly with `<Card>` from `./ui/Card` — there are no named card wrapper components (BenefitCard, TeamCard, etc.). See `ui/CLAUDE.md` for the Card API.

To populate with real data, replace the placeholder arrays at the top of each file.

---

## Hero

**File:** `Hero.tsx` | **Anchor:** `#topo`

Opening section with headline, subtitle, two CTAs, three stats, athlete mascot image, and skull watermark background.

**Update:** `STATS` array — real medal/athlete/coach counts.  
**Assets:** `skull-athlete-rock.png` (foreground mascote), `logo-skull-front.png` (background watermark).

---

## Sobre

**File:** `Sobre.tsx` | **Anchor:** `#sobre`

Two-column layout: institutional text + three `Card` stat blocks on the left, thinking skull image on the right.

**Card config:** `variant="elevated"` `padding="sm"` `rounded="md"` + `hover:scale-110`

**Update:** `STATS` array — national medals, state medals, active students.  
**Assets:** `skull-thinking.png`.

---

## Beneficios

**File:** `Beneficios.tsx` | **Anchor:** `#beneficios`

3×2 grid of `Card` blocks (icon + title + description). Dark elevated background.

**Card config:** `variant="base"` `hover="lift"` `padding="lg"` `rounded="lg"` + `hover:border-ember-deep`

**Update:** `BENEFITS` array — icons, titles, descriptions.

---

## Equipe

**File:** `Equipe.tsx` | **Anchor:** `#equipe`

Grid of 4 `Card` blocks (initials avatar, name, role, bio, Instagram link). 1 col → 2 col → 4 col.

**Card config:** `variant="elevated"` `hover="scale"` `padding="none"` `rounded="lg"` `className="px-[22px] py-[26px] text-center"`

**Update:** `TEAM` array — real coach names, roles, bios, Instagram handles/URLs.

---

## Atletas

**File:** `Atletas.tsx` | **Anchor:** `#atletas`

Two-column layout: text + CTA on the left, 3-column `Card` grid on the right. Dark elevated background.

**Card config:** `variant="base"` `padding="none"` `rounded="lg"` `className="p-[22px]"`

**Update:** `ATHLETES` array — real athlete names, main title, weight class/division.

---

## Planos

**File:** `Planos.tsx` | **Anchor:** `#planos`

4-column grid of `Card` blocks (pricing info + CTA button). Dark elevated background.

**Card config:** `variant="base"|"raised"` `featured={p.featured}` `padding="md"` `rounded="lg"` `className="relative flex flex-col"`  
Featured card gets ember border + glow shadow via the `featured` prop.

**Props:**

| Prop | Type | Description |
|---|---|---|
| `onSelectPlan` | `(plan: string) => void` | Opens the `Modal` with the selected plan — wired in `App.tsx` |

**Update:** `PLANOS` array — real prices, discount notes, payment conditions.

---

## Depoimentos

**File:** `Depoimentos.tsx` | **Anchor:** `#depoimentos`

3-column grid of `Card` blocks (avatar initial, name, tag, italic quote).

**Card config:** `variant="elevated"` `hover="scale"` `padding="md"` `rounded="lg"`

**Update:** `TESTIMONIALS` array — real student testimonials (name, category, quote).

---

## CtaFinal

**File:** `CtaFinal.tsx`

Full-width CTA section with an ember→dark gradient background. Two-column layout: text + CTA on the left, skull image on the right.

**Assets:** `skull-athlete-cross.png`.

---

## Footer

**File:** `Footer.tsx`

Footer with logo, social links, contact info, and copyright.

**Update:**
- `SOCIAL_LINKS` array — real Instagram, WhatsApp, and email URLs.
- Phone number and email address.
- Privacy policy URL.

---

## LeadForm

**File:** `LeadForm.tsx` | **Used by:** `Modal`

Lead capture form with name, email, phone, and experience fields. The `handleSubmit` function contains a `TODO` for backend/API integration.

| Prop | Type | Description |
|---|---|---|
| `selectedPlan` | `string` (optional) | Pre-selected plan sent as a hidden field |
| `onSuccess` | `() => void` (optional) | Called on submit — used by `Modal` to close itself |
