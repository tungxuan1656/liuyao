# Web UI layout and navigation

This document owns the V1 user interface layout, information architecture, navigation hierarchy, responsive breakpoints, and visual design tokens for `apps/web`.

## Visual foundation

### Component system

- Built on **shadcn/ui** with the **`new-york`** style.
- Visual properties: subtle borders (`border-border`), restrained corner radii (`rounded-md`, 4–6px), high typographic contrast, and minimal decorative shadows.
- Single codebase with responsive utility classes. Never maintain separate codebases for mobile and desktop.

### Typography

- **Display & Headings**: `Cinzel` (`font-serif`).
  - Conveys the dignity, timelessness, and philosophical weight of traditional I Ching literature.
  - Used for application branding, page headers, hexagram titles, and section headlines.
- **Body & Data**: `Noto Sans` (`font-sans`).
  - Ensures complete Unicode coverage for Vietnamese diacritics, Sino-Vietnamese Hanzi (乾, 坤, 震, 巽, etc.), and mathematical/astrological notation without glyph fallback or text clipping.
  - Used for line details, glossary terms, rule explanations, form controls, and body prose.
- **Line Glyphs**:
  - Yang: `▅▅▅▅▅` (solid bar).
  - Yin: `▅▅ ▅▅` (broken bar with a central gap).
  - Moving indicators: `○` (Old Yin / 6) and `✕` (Old Yang / 9).

---

## Information architecture and navigation hierarchy

The application organizes all views into three distinct levels:

```text
Level 0: Root Destinations (Bottom Tabs on Mobile / Top Nav on Desktop)
├── Tab 1: Reading (Active Session)  ──> Path: /
├── Tab 2: Library (Knowledge Base)  ──> Path: /library
└── Tab 3: Settings (Diagnostics)    ──> Path: /settings

Level 1: Sub-Pages (Deep Content Browsing)
└── Library Detail (Hexagram/Term)   ──> Path: /library/:entityType/:id
    (Bottom Tabs remain visible; Top Bar displays [ < Back to Library ])

Level 2: Focused Flows (Modal Workflows)
└── 6-Line Casting Flow              ──> Path: /casting
    (Bottom Tabs are strictly HIDDEN; Top Bar displays [ Cancel / Reset ])
```

### Level 0 — Root destinations

Root destinations are accessible through primary navigation controls:

- **Mobile (`< 768px`)**: Fixed Bottom Navigation Bar (`h-16 border-t bg-background/95 backdrop-blur`). Placed within comfortable thumb reach.
- **Desktop (`>= 768px`)**: Fixed Top Header Navigation Bar (`h-14 border-b bg-background/95 backdrop-blur`).

#### 1. Tab 1: Reading (`/`)

Manages the active Liu Yao divination session in memory:

- **State A (Initial / Idle)**:
  - Displayed when no calculated reading exists in memory.
  - Provides optional question input and the 3 casting method selectors (Automatic, Manual, Direct).
  - Primary CTA: `[ Start Casting ]` $\rightarrow$ navigates to Level 2 (`/casting`).
- **State B (Calculated Result)**:
  - Displayed when a calculated reading is present in memory.
  - Renders the full Hexagram Result Board.
  - Header displays a clear `[ New Reading ]` action. Clicking it prompts for confirmation before wiping the in-memory draft and returning to State A.

#### 2. Tab 2: Library (`/library`)

The read-only knowledge reference hub:

- Search input supporting Vietnamese, Hanzi, and romanized aliases.
- Category filters using shadcn `Tabs`: _64 Hexagrams_ | _8 Trigrams_ | _Terms_ | _Rules_.
- Grid/list of entity cards. Tapping any card opens its Level 1 Sub-Page.

#### 3. Tab 3: Settings (`/settings`)

Diagnostics and system state:

- PWA install prompt button (when supported by browser).
- Online/offline indicator and cache readiness status.
- Version stamping: web app version, `@liuyao/core` version, `@liuyao/knowledge` version, ruleset ID `liuyao-standard-v1`.
- Legal, privacy, and licensing links.

---

### Level 1 — Sub-pages (Browse details)

- Used for exploring individual hexagrams, trigrams, terms, and rule definitions from the Library.
- **Navigation state**:
  - The Bottom Navigation Bar **remains visible** on mobile so users can switch tabs at any time.
  - The header provides a clear `[ < Back to Library ]` navigation action.
  - Supports direct deep-linking and browser back/forward buttons.

---

### Level 2 — Focused flows (Casting session)

- Used during the active sequential casting flow (`/casting`).
- **Navigation state**:
  - The Bottom Navigation Bar is **strictly hidden** (or disabled) to prevent accidental loss of in-progress line inputs.
  - The header displays a step indicator (`Line X of 6`) and a prominent `[ Cancel / Exit ]` button.
  - Clicking `[ Cancel ]` displays a confirmation dialog: _"Canceling will discard entered lines. Do you want to exit?"_
  - Upon completing line 6, the engine calculates the reading and navigates directly to the Result state (`/`).

---

## Responsive layouts & screen specifications

### Breakpoint definitions

- **Mobile (`< 768px`)**: Single-column vertical stack, full-width touch cards, thumb-driven Bottom Navigation, bottom sheets (Drawers) for inspections.
- **Tablet (`768px .. 1023px`)**: Top Header navigation, 2-column casting/library grids.
- **Desktop (`>= 1024px`)**: Top Header navigation, Master-Detail split views (max container width: `1400px` / `max-w-7xl mx-auto`).

---

### Reading result screen (`/result`)

The result screen separates primary board facts from explanatory prose:

#### Desktop view (`>= 1024px` Master-Detail):

- **Left pane (7 / 12 columns)**:
  - Header: Primary Hexagram name (`Cinzel`), Eight Palace name, Palace element, and Changed Hexagram name (when moving lines exist).
  - 6-Line Board: Stacked from Line 6 (top) down to Line 1 (bottom).
  - Each line row displays:
    - Position number (`6` to `1`).
    - Visual Yin/Yang bar glyph (`YaoSymbol`).
    - Moving marker (`○` / `✕`) with directional indicator $\rightarrow$ changed line state.
    - Na Jia Heavenly Stem & Earthly Branch.
    - Branch Five Element.
    - Six Relative badge (e.g., _Parent_, _Officer/Ghost_).
    - Shi (Self) or Ying (Other) marker badge.
- **Right pane (5 / 12 columns)**:
  - Sticky **Fact Inspector Panel** (`<FactInspector />`).
  - Clicking or hovering over any line row, element badge, or hexagram title immediately displays its authoritative rule explanation and source attribution in this panel without modal occlusion.
  - Includes a secondary action: `[ Open Full Article in Library ]` to transition to Level 1 reference if deeper study is desired.

#### Mobile view (`< 1024px` Board + Adaptive Drawer):

- **Main viewport**:
  - Displays the compact, full-width Hexagram Board with high-contrast rows.
  - Minimum touch target height for each line row is `48px`.
- **Inspection interaction**:
  - Tapping any line row or badge opens an interactive **Bottom Sheet** (Vaul `<Drawer />`).
  - The drawer displays the exact same fact definition and source reference without navigating away from the board.
  - Dismissible with a simple downward swipe gesture.

---

### Component inventory

#### shadcn/ui components

- `Button`: Navigation, primary actions, method selection.
- `Card`: Hexagram cards, casting panels, library items.
- `Badge`: Shi/Ying markers, Five Element tags, ruleset badges.
- `Tabs`: Casting method selector, library category switcher.
- `Drawer` (Vaul): Bottom Sheet for mobile fact inspection.
- `Dialog`: Desktop modals for destructive confirmation (e.g., reset reading).
- `Input`: Question draft, library search bar.
- `Separator`: Section dividers.

#### Custom domain components

- `<YaoSymbol value={6|7|8|9} size="sm"|"md"|"lg" />`: Pure SVG/CSS rendering of solid, broken, and moving lines.
- `<HexagramBoard reading={result} onSelectLine={(lineIndex) => ...} />`: Responsive 6-line board.
- `<CoinTossStage onTossComplete={(value) => ...} />`: Animated 3-coin toss stage with cryptographically random outcomes.
- `<AdaptiveFactInspector fact={selectedFact} isOpen={open} onClose={...} />`: Automatically renders a right-side sticky panel on desktop or a Bottom Drawer on mobile.
- `<AppShell />`: Master layout wrapping TopNav (desktop), BottomNav (mobile), and main content area.

---

## Safety and transition rules

1. **In-Memory Draft Safety**:
   - A draft reading exists only in browser memory.
   - Any action that could wipe the draft (`[ New Reading ]` or `[ Cancel Casting ]`) must require explicit user confirmation.
2. **PWA Update Safety**:
   - When a new service worker version is detected, display a non-blocking toast/banner.
   - Never trigger an automatic window reload while a casting flow or result draft is active.
3. **Accessibility (a11y)**:
   - All interactive buttons must pass WCAG AA contrast standards ($\ge 4.5:1$).
   - Touch targets on mobile must be at least $44 \times 44$ pixels.
   - Visual line bars must include accessible text (`aria-label="Line 5: Yang, Officer Horse Fire"`).
