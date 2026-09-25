# Web UI layout and navigation

This document owns the V1 user interface layout, information architecture, navigation hierarchy, responsive breakpoints, design tokens, component selection, and desktop/mobile adaptation for `apps/web`.

Domain behaviors, input validation, result content, reference data schemas, and diagnostics content are owned by their respective canonical documents (`reading-flow.md`, `reading-result.md`, `knowledge-browser.md`, `settings.md`). This document specifies only how those capabilities are presented and composed responsively.

---

## Visual foundation and design tokens

### Component system

- V1 web UI will use **shadcn/ui** with the **`new-york`** style.
- Visual properties: subtle borders (`border-border`), restrained corner radii (`rounded-md`, 4–6px), high typographic discipline, and minimal decorative elevation.
- Single codebase with responsive CSS utility classes (Tailwind breakpoints). Never maintain separate codebases or separate component trees for mobile and desktop.

### Typography

- **Headings & Hexagram Names**: `Noto Serif` (`font-serif`).
  - Provides full, balanced diacritics coverage for Vietnamese titles (e.g., _Thuần Càn_, _Thiên Phong Cấu_, _Hỏa Thiên Đại Hữu_) without glyph clipping or mismatched font fallbacks.
- **Body, Data, & Form Controls**: `Noto Sans` (`font-sans`).
  - Provides crisp, neutral legibility for line details, glossary terms, rule explanations, and UI controls.
- **Han Characters (Hán tự)**:
  - Explicit fallback: `Noto Serif CJK` for headings and `Noto Sans CJK` for body/data.
  - Ensures glyphs such as 乾, 坤, 震, 巽, 坎, 離, 艮, 兌 render harmoniously without falling back to system OS default fonts.
- **Brand / Decorative Latin Text**:
  - `Cinzel` is restricted exclusively to the Latin-only logo mark, brand title, and decorative Roman numbers. It must not be used for general Vietnamese headings.
- **Font Delivery & Offline Requirement**:
  - All fonts must be bundled and self-hosted locally within the application distribution.
  - No external Google Fonts, CDN links, or remote network requests are allowed at runtime.

### Yao line symbol rendering

- **Production rendering**: All line glyphs in the UI must be rendered via dedicated SVG or CSS in the `<YaoSymbol>` component, guaranteeing crisp pixel alignment, uniform stroke weight, and responsive scaling independent of font metrics.
- **Unicode text fallback**: Characters `▅▅▅▅▅` (Yang) and `▅▅ ▅▅` (Yin) serve as documentation and plain-text fallbacks only.
- **Moving indicators**:
  - **Old Yin / 6**: `✕` — Yin changing to Yang.
  - **Old Yang / 9**: `○` — Yang changing to Yin.

---

## Information architecture and navigation hierarchy

The application organizes all product views into three distinct architectural levels:

```text
Level 0: Root Destinations (Bottom Nav on Mobile / Top Nav on Desktop)
├── Tab 1: Reading (Active Session)  ──> Path: /
├── Tab 2: Library (Reference Hub)   ──> Path: /library
└── Tab 3: Settings (Diagnostics)    ──> Path: /settings

Level 1: Sub-Pages (Deep Reference Browsing)
└── Library Detail (Entity/Rule)     ──> Path: /library/:entityType/:id
    (Root navigation remains visible; Top Bar displays [ < Back to Library ])

Level 2: Focused Flows (Modal Input Session)
└── Reading Input Flow               ──> Path: /casting
    (Root navigation is strictly HIDDEN; Top Bar displays [ Cancel / Exit ])
```

---

### Level 0 — Root destinations

Root destinations represent persistent, top-level hubs:

- **Mobile / Compact (`< 768px`)**: Fixed Bottom Navigation Bar (`border-t bg-background/95 backdrop-blur z-50`).
  - Height: `h-16` plus `env(safe-area-inset-bottom)`.
  - Main scrollable content must have bottom padding accounting for `h-16 + env(safe-area-inset-bottom)` to prevent content occlusion.
- **Tablet & Desktop (`>= 768px`)**: Fixed Top Header Navigation Bar (`h-14 border-b bg-background/95 backdrop-blur z-50`).
  - Placed horizontally with brand mark on the left, tab links in the center/right, and network status badge.

#### 1. Tab 1: Reading (`/`)

Represents the primary divination workspace. Follows states defined in `reading-flow.md` and `reading-result.md`:

- **Reading entry state** (when no calculated reading exists in memory):
  - Displays optional question input, casting method selector (Automatic, Manual, Direct), and primary CTA: `[ Start Casting ]` $\rightarrow$ navigates to Level 2 (`/casting`).
- **Reading result state** (when active calculated reading exists in memory):
  - Displays the full Hexagram Result Board (see Result Layout below).
  - Header displays a clear `[ New Reading ]` action. Clicking it triggers an `AlertDialog` confirming draft replacement before wiping in-memory state.

#### 2. Tab 2: Library (`/library`)

The read-only knowledge reference hub (behavior defined in `knowledge-browser.md`):

- Local search input matching Vietnamese names, Hanzi, and romanized aliases.
- Category navigation using shadcn `Tabs`: _64 Hexagrams_ | _8 Trigrams_ | _Terms_ | _Rules_.
- Grid/list of reference cards. Tapping any card opens its Level 1 Sub-Page.

#### 3. Tab 3: Settings (`/settings`)

Diagnostics and system state (content defined in `settings.md`):

- PWA install prompt button (when supported by browser).
- Online/offline indicator and cache readiness state.
- Version stamping: web app, `@liuyao/core`, `@liuyao/knowledge`, ruleset ID `liuyao-standard-v1`.
- Legal, privacy, and licensing links.

---

### Level 1 — Sub-pages (Browse details)

- Used for exploring individual hexagrams, trigrams, terms, and rule definitions from the Library.
- **Navigation state**:
  - The Bottom Navigation Bar **remains visible** on mobile so users can switch tabs at any time.
  - The top bar provides an explicit `[ < Back to Library ]` button.
  - Supports deep-linking, browser history navigation, and direct route reloads.

---

### Level 2 — Focused flow: Reading input (`/casting`)

Used during active line input before calculation. Governed by the rules in `reading-flow.md`:

- **Navigation state**:
  - The primary Root Navigation (Bottom Nav) is **strictly hidden** to eliminate distraction and prevent accidental draft loss.
  - Top bar provides an explicit `[ Cancel ]` button and input status indicator.
- **Input modes**:
  - **Sequential mode (Manual casting & Automatic coin casting)**:
    - Step indicator: `Line 1 of 6` through `Line 6 of 6`.
    - Bottom-to-top sequence.
    - Provides a `[ < Back ]` button to return to the previous line without clearing prior lines.
  - **Direct-entry mode**:
    - All 6 line positions are visible simultaneously on one screen.
    - Presented visually in board orientation from Line 6 (top) down to Line 1 (bottom), while keeping canonical domain state in bottom-to-top order (1 to 6).
    - Primary CTA: `[ Calculate ]` (disabled until all 6 positions contain valid `6..9` values).
- **Navigation safety semantics**:
  - **Back**: Returns to the previous input step within the sequential flow; preserves all entered lines.
  - **Reset**: Clears all entered lines while remaining inside the current casting mode.
  - **Cancel / Exit**: Discards active input lines and returns to the Reading destination (`/`). When entered lines exist, clicking `[ Cancel ]` triggers an `AlertDialog`: _"Discard active lines and return to reading setup?"_.
  - **Browser Back / Navigation Protection**: Intercept browser history or page unload events when entered lines exist, displaying the same confirmation prompt.
  - Upon completing line 6 (or clicking Calculate in direct mode), the engine calculates the reading and navigates to the Reading destination (`/`) in its Result state.

---

## Responsive layout specifications

### Breakpoint definitions

- **Mobile (`< 768px`)**: Single-column vertical layout, thumb-zone controls, fixed Bottom Navigation with safe-area padding, Drawers for contextual facts.
- **Tablet (`768px .. 1023px`)**: Top Header navigation, 2-column casting and library grids.
- **Desktop (`>= 1024px`)**: Top Header navigation, Master-Detail split views (max container width: `max-w-7xl mx-auto`).

---

### Reading result layout (`/`)

The result view presents deterministic facts separated from explanatory prose, matching `reading-result.md`:

#### 1. Wide result layout (`>= 1024px` Master-Detail):

- **Left pane (7 / 12 columns) — Hexagram Board**:
  - **Hexagram summary header**:
    - Primary Hexagram name (`Noto Serif`), Upper Trigram name/symbol, Lower Trigram name/symbol.
    - Eight Palace identity and Palace Five Element.
    - Changed Hexagram name, Upper Trigram, Lower Trigram (rendered only when moving lines exist; omitted entirely when all lines are static).
  - **6-Line Board**:
    - Stacked vertically from Line 6 (top) down to Line 1 (bottom).
    - Each line row displays:
      - Line position number (`6` to `1`).
      - Visual Yin/Yang bar glyph (`<YaoSymbol>`).
      - Moving line indicator: `✕` (6 / Old Yin) or `○` (9 / Old Yang) with direction arrow to changed polarity.
      - Na Jia Heavenly Stem & Earthly Branch.
      - Branch Five Element.
      - Six Relative badge (e.g., _Parent_, _Officer/Ghost_).
      - Shi (Self) or Ying (Other) marker badge.
- **Right pane (5 / 12 columns) — Fact Inspector Panel**:
  - Sticky container (`<FactInspector>`).
  - Displays the documented, ruleset-backed explanation and source reference for the currently selected item.
  - Interaction contract:
    - **Click / Tap / Keyboard Enter**: Selects the fact and makes it persistently active in the inspector.
    - **Keyboard Tab / Focus**: Focuses the line or fact badge; pressing Enter/Space selects it.
    - **Hover**: Optional transient preview; does not override an explicitly clicked/selected fact.
  - Action footer: includes `[ View in Library ]` linking to canonical Level 1 reference for deeper reading.

#### 2. Compact result layout (`< 1024px` Board + Adaptive Drawer):

- **Main viewport**:
  - Displays the full-width Hexagram Board with compact rows and clear Upper/Lower Trigram headers.
  - Minimum touch target height for each line row is `48px`.
- **Fact inspection via Drawer**:
  - Tapping any line row or badge opens a bottom-anchored `Drawer`.
  - Displays the exact same documented explanation and source reference as the desktop panel.
  - **Dismissal requirements**:
    - Downward drag/swipe gesture.
    - Explicit, visible `[ Close ]` button with `aria-label="Close fact details"`.
    - `Escape` key press.
    - Proper focus trapping inside the drawer while open, restoring focus to the triggering element upon close.

---

## Component inventory

### shadcn/ui components

- `Button`: Primary actions, method selector, step navigation.
- `Card`: Hexagram overview, casting stages, library browsing cards.
- `Badge`: Shi/Ying markers, Five Element badges, ruleset indicators.
- `Tabs`: Casting method selector, library category switcher.
- `Drawer`: shadcn/ui Drawer for compact-screen fact inspection.
- `AlertDialog`: Destructive confirmation modals (canceling casting flow, replacing existing reading draft).
- `Input`: Question draft, library search bar.
- `Separator`: Structural section dividers.

### Custom domain components

- `<YaoSymbol value={6|7|8|9} size="sm"|"md"|"lg" />`: Pure SVG/CSS rendering of solid, broken, and moving line symbols.
- `<HexagramBoard reading={result} onSelectLine={(lineIndex) => ...} />`: Responsive 6-line board with upper/lower trigram indicators.
- `<CoinTossStage onTossComplete={(value) => ...} />`: Animated 3-coin toss stage using cryptographic randomness.
- `<FactInspector fact={selectedFact} />`: Authoritative explanation renderer, embedded inline on wide screens or inside `<Drawer>` on compact screens.
- `<AppShell />`: Master layout wrapping TopNav (desktop), BottomNav (mobile with safe area), and main scroll container.

---

## Invariants and safety rules

1. **Deterministic Rule Attribution Invariant**:
   - Every deterministic rule explanation displayed in production fact inspections must trace to at least one canonical source reference (identifying rule ID, ruleset, source work, and location).
   - Explanations are ruleset-backed explanations for `liuyao-standard-v1`, not personal interpretations.
2. **In-Memory Draft Safety**:
   - Any action that would discard entered casting lines or replace an active completed reading must require explicit user confirmation via an `AlertDialog`.
3. **PWA Update Safety**:
   - A newly waiting service worker must display a non-blocking toast/banner.
   - The application must never trigger an automatic page reload while a casting input flow or completed reading result is active.
4. **Accessibility (a11y)**:
   - Text contrast ratios: Normal text $\ge 4.5:1$; Large text ($\ge 18\text{pt}$ or $\ge 14\text{pt}$ bold) $\ge 3:1$.
   - Relevant non-text UI boundaries and interactive component states $\ge 3:1$.
   - Minimum interactive touch target size: $\ge 44 \times 44\text{px}$.
   - Full keyboard navigation: every interactive element, line row, and badge must have visible focus rings and keyboard activation support.
