# Web UI layout and navigation

This document owns the V1 user interface layout, information architecture, navigation hierarchy, responsive breakpoints, design tokens, component selection, and desktop/mobile adaptation for `apps/web`.

The interface uses Vietnamese labels. Any English interface labels in this document are semantic placeholders, not approved user-facing copy. See `vietnamese-language.md` for canonical terminology.

Domain behaviors, input validation, result content, reference data schemas, and diagnostics content are owned by their respective canonical documents (`reading-flow.md`, `reading-result.md`, `knowledge-browser.md`, `settings.md`). This document specifies only how those capabilities are presented and composed responsively.

---

## Visual foundation and design tokens

### Component system

- The web routes use official **shadcn/ui** components with **Base UI** primitives and preset **`b59jumGwPA`**.
- The preset selects **Sera**: neutral base, taupe theme, neutral charts, Lucide icons, Noto Sans body text, Noto Serif headings, and a square radius. Use its subtle menu accent. Verify the installed values with `pnpm dlx shadcn@latest preset resolve`.
- Enable the preset's pointer-cursor option. Use semantic theme tokens and built-in component variants for controls.
- Use the installed preset surfaces, typography, borders, and spacing. Avoid ornamental frames, paper textures, metallic gradients, and decorative shadows.
- Application layouts compose shadcn components. Domain renderers cover coin faces, yao symbols, and hexagram geometry.
- Base UI owns control behavior, modal focus, and keyboard interactions. Remove Radix dependencies and duplicate control implementations.
- Scope includes Home, all casting modes, results, Library, Settings, navigation, confirmations, and PWA feedback.
- The rules below describe the target interface. Audit the implementation against them; do not treat a documented target as proof that it is implemented.
- Single codebase with responsive CSS utility classes (Tailwind breakpoints). Never maintain separate codebases or separate component trees for mobile and desktop.

### Bento composition and responsive layout

The main routes arrange task-relevant shadcn `Card` components in an asymmetric grid. A wider card holds the current action or primary evidence; narrower cards provide context, related links, or status. Cards may have different natural heights. Do not add empty cells, decorative data, fixed heights, or nested full-inset cards merely to complete a rectangle.

- Use `CardHeader`, `CardTitle`, `CardDescription`, `CardAction`, `CardContent`, and `CardFooter` according to each card's content. Keep their installed inset, border, shadow, radius, and type treatment.
- Use `Button`, `Badge`, `Field`, `InputGroup`, `RadioGroup`, `Tabs`, `ToggleGroup`, `Alert`, `Empty`, `Separator`, and `Sheet` through their installed APIs. Preserve the Sera preset and semantic color tokens. Custom CSS is reserved for route grids, the result breakpoint, and Liu Yao domain graphics.
- The content wrapper is centered at 1280px maximum, with 16px mobile and 24px desktop gutters. Use a single column on mobile. Desktop grids use twelve columns where the task needs a wider primary card and a narrower companion; reference results use two or three columns when their content fits.
- Use 24px between major sibling cards, 16px in compact lists, and component-owned spacing within cards. Do not override button or field dimensions to align a screenshot.
- Headers use one semantic page heading. Add descriptions or badges only when they provide information that the main content does not show.
- At 320px and wider, keep all content within the viewport. Library tabs use two rows on narrow mobile screens. Rule filters wrap.

| Route                                       | Card arrangement                                                                                                                                                                                               |
| ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Home (`/`)                                  | Primary form or current-reading card spans the larger desktop column. Process and Library cards occupy the companion column; the privacy note follows.                                                         |
| Casting (`/casting`)                        | The shared casting workspace remains the primary card. A progress card occupies the companion column only on wide screens. Direct input retains six vertical line rows.                                        |
| Result (`/result`)                          | Summary, primary and changed hexagram boards, and line facts form the main column. The ruleset-backed fact inspector is a persistent companion at 900px and wider, and a bottom `Sheet` below that breakpoint. |
| Library (`/library`)                        | A search and category card leads, with a compact category-context card beside it. Reference records form a one-, two-, or three-column grid by available width.                                                |
| Library detail (`/library/:entityType/:id`) | Overview, related figures, applicable rules, and sources occupy separate content cards. Long source lists flow naturally.                                                                                      |
| Settings (`/settings`)                      | System state, versions, conventions, and privacy occupy cards sized by content.                                                                                                                                |

### Typography

- **Headings & Hexagram Names**: `Noto Serif` (`font-serif`) with complete Vietnamese diacritic coverage.
- **Body, Data, & Form Controls**: `Noto Sans` (`font-sans`) with complete Vietnamese diacritic coverage.
- **Language**: Render Vietnamese only. Do not add Han-character text or a CJK font fallback for knowledge content; see `vietnamese-language.md`.
- **Brand / Decorative Latin Text**:
  - **Intended:** Use Noto Serif for the brand title. Remove the Cinzel asset and declaration after its final consumer migrates.
- **Font Delivery & Offline Requirement**:
  - All fonts must be bundled and self-hosted locally within the application distribution.
  - No external Google Fonts, CDN links, or remote network requests are allowed at runtime.
  - Keep only the locally bundled fonts required for the Vietnamese interface. Do not bundle CJK-only fonts.

### Yao line symbol rendering

- **Production rendering**: All line glyphs in the UI must be rendered via dedicated SVG or CSS in the `<YaoSymbol>` component, guaranteeing crisp pixel alignment, uniform stroke weight, and responsive scaling independent of font metrics.
- **Unicode text fallback**: Characters `▅▅▅▅▅` (Yang) and `▅▅ ▅▅` (Yin) serve as documentation and plain-text fallbacks only.
- **Moving indicators**:
  - **Old Yin / 6**: `✕` — Yin changing to Yang.
  - **Old Yang / 9**: `○` — Yang changing to Yin.
  - Keep the marker beside the stroke in a reserved column. Do not put either marker in a solid black square or weaken the completed line's strokes to emphasize the marker.
  - Draw compact, centered glyphs with a shared 1.5px stroke inside the 24px marker slot. Keep the muted red accent and rounded stroke ends. Do not use a heavy, control-like outline.
- **Forming hexagram geometry (`/casting`)**: Keep six compact rows with columns for the position number and symbol. Show canonical names through accessible row labels, not repeated visible text. Target a 72px stroke width, with responsive compression to 52px at 320px. Keep the 6px stroke height, 10px yin gap, 24px moving-marker column, and 4px marker gap. Static and moving lines use identical stroke widths. Size each row to its number, symbol, and marker slot, not the full casting column. Highlight the current row without weakening completed strokes. Preserve bottom-to-top order, value mapping, and quiet empty placeholders. Scope geometry overrides to the forming hexagram.

---

## Information architecture and navigation hierarchy

The three root destinations are Gieo quẻ (`/`), Thư viện (`/library`), and Cài đặt (`/settings`). `/casting` and `/result` belong to Gieo quẻ; `/library/:entityType/:id` belongs to Thư viện.

- Below 768px, the top bar shows a Home-linked brand on root destinations and a contextual back link on casting, result, and Library detail. Library and Settings icon links sit on the right with Vietnamese accessible names and 44px targets. There is no bottom tab bar or reserved tab-bar space.
- At 768px and wider, the top header shows the brand and three destination links. There is no application back link in this header. The header stays in document flow.
- Connection status appears in Settings, not in the global header.
- The current root destination is indicated with `aria-current="page"` in both navigation variants. In-app navigation during an unfinished cast remains protected by the confirmation behavior in `reading-flow.md`.
- Route changes scroll to the beginning of the new page. A completed reading persists across root-destination navigation within the browser session. Reloading the application can clear it.
- Library details support direct links and browser history. On mobile their top-bar back link leads to the Library root; on desktop users navigate through the top header or browser history.

### Root destination content

- Home offers optional question input, the three casting methods, and a primary action. A completed reading replaces the form with the current hexagram and an explicit confirmed new-reading action.
- Library offers local search, category tabs, optional rule filters, and reference record cards. Each record has a clear detail link.
- Settings presents browser state, PWA install/update availability, package and ruleset versions, casting conventions, privacy, and product links.

### Level 2 — Luồng tập trung: Nhập hào (`/casting`)

Used during active line input before calculation. Governed by the rules in `reading-flow.md`:

- **Navigation state**:
  - Mobile header navigation remains available. The route displays a separate cancel action; the method badge appears only on desktop. Leaving an unfinished cast still requires confirmation.
  - The desktop header retains the root destinations; it has no back action.
- **Input modes**:
  - **Sequential mode (Manual casting & Automatic coin casting)**:
    - Chỉ báo bước: `Hào 1 trên 6` đến `Hào 6 trên 6`.
    - Bottom-to-top sequence.
    - Có nút `[ Quay lại ]` để về hào trước mà không xóa dữ liệu đã nhập.
    - **Intended replacement:** Automatic and manual modes share one neutral `Card` workspace composition: the same route heading, card header, forming-hexagram column, coin stage, result region, action bar, and reset placement. Do not give manual mode a separate step heading, nested card, boxed coin buttons, or detached navigation card.
    - The header contains one row with a single-select `ToggleGroup` labeled `3 xu` / `4 xu` and one completed-line count. Existing draft rules control when selection is locked.
    - Both mobile and desktop place the forming hexagram beside the coin area. One shared outcome row appears below them, followed by the action bar. Do not add inner frames or separate result cards.
    - Fill slots from bottom to top. Each position reserves columns for its number, line geometry, and moving marker. Keep completed strokes high contrast, including moving lines; keep the marker outside the line strokes. Empty slots use a quiet placeholder distinct from completed yang lines, with the current empty slot distinguishable from later slots.
    - Remove the visible forming-hexagram heading, per-row names, transformation legend, and coin-face transcript. Accessible labels retain this information. Show the latest canonical name once, beside its line position.
    - Keep the hexagram, coins, latest outcome, and primary action visible together at 320×568 and 390×664 without a question. Long questions, text zoom, and shorter viewports can scroll.
    - Use 44px icon buttons for previous-line navigation and reset. Preserve their accessible names and reset confirmation. Mobile can show `Gieo tiếp` / `Xác nhận` with the full action names available accessibly.
    - Make the forming hexagram large enough to read its yin gap and moving markers on a 320px viewport. Keep row heights, line stroke widths, marker width, and label alignment identical for completed slots. Do not use a black marker tile or tiny placeholder strokes in completed slots.
    - Three coins occupy a fixed triangle: one centered above two lower coins. All three use the same neutral surface. Automatic and manual stages use the same centers and face size.
    - Four coins occupy a fixed two-column, two-row square: Earth at top-left, Water at top-right, Fire at bottom-left, and Wind at bottom-right. Automatic and manual stages use the same square and order; never shrink four coins to force them into a single row.
    - Use yellow, blue, red, and gray coin surfaces respectively. Show the labels **I**, **II**, **III**, and **IV** below the coins in both automatic and manual casting.
    - Every coin face uses a large Unicode **☀** or **☾**. Request text presentation and provide Vietnamese accessible face labels.
    - Color identifies the four weighted coins. Color never identifies heads/tails by itself. Elemental pictograms and engraved textures are removed.
    - Target a 64px coin face for both methods; keep at least 12px clear space between adjacent coin faces and leave room below for the identity label. Shrink the surrounding stage before shrinking a coin. Keep coin and label text legible at 320px.
    - Automatic coins flip repeatedly in place, then show the predetermined faces. Remove Three.js, WebGL, canvas textures, camera motion, and airborne trajectories.
    - **Proposed timing:** Four 300ms flip cycles, with a total duration of 1200ms. Use horizontal CSS scaling and swap glyphs at edge-on frames.
    - Keep each coin center, the stage height, the result region, and the action bar stationary throughout the flip and reveal. Reserve a 184px shared visualization row and a 28px outcome row. Two 64px coin faces, 6px label gaps, 16px labels, and a 12px row gap determine the visualization height.
    - Keep the stage and result region compact but stable across states: waiting, flipping, revealed, and revisiting a saved line. Do not use a tall, empty desktop stage as the default visual composition.
    - Explicit tosses animate under reduced-motion preferences. Reset, cancel, or unmount cancels completion. Revisits show stored faces without replay.
    - Manual coins use shadcn `Button` controls with the same 64px faces, centers, labels, and surrounding stage as automatic coins. Each activation flips one face to match a physical toss; the click target and focus state remain clear without boxing the coin and label. Manual input never generates random faces.
    - Manual confirmation appears in the shared action bar, at the position of automatic `[ Gieo hào ]`. Before confirmation, the current line preview appears in the shared result region and remains editable. Confirmation locks its coin faces and records the line in the forming hexagram. Back/next navigation preserves confirmed lines; the reset confirmation clears them.
    - **Visual acceptance:** Review the actual flip, Unicode readability, both coin arrangements, and final outcomes on desktop and mobile.
    - The action bar labels the first toss `[ Gieo hào ]`, the next uncast toss `[ Gieo hào tiếp ]`, saved-line navigation `[ Tiếp theo ]`, and completion `[ Tính quẻ ]`. `reading-flow.md` owns their transitions and evidence preservation.
  - **Direct-entry mode**:
    - All six line positions are available on one page, without a step-by-step wizard. Small viewports can scroll vertically.
    - Presented visually in board orientation from Line 6 (top) down to Line 1 (bottom), while keeping canonical domain state in bottom-to-top order (1 to 6).
    - **Intended, user-selected layout:** Use six vertical rows, never a two-column list of line positions. All rows remain mounted on one scrollable page.
    - Each row uses a single-select `ToggleGroup`. Desktop places its four choices across the row. Mobile uses a two-by-two choice grid.
    - Show the shared yao symbol, canonical name, and a short static/moving label. Place the transformation explanation in one shared legend.
    - Keep the selected state, focus ring, and moving marker distinct. Do not compress labels or allow symbols to overlap adjacent choices.
    - Each position offers four explicit named choices: **Lão âm**, **Thiếu dương**, **Thiếu âm**, and **Lão dương**. Show the yao symbol and canonical name; omit numeric values from visible and accessible copy.
    - Nút chính `[ Tính quẻ ]` bị vô hiệu hóa cho đến khi cả sáu vị trí có giá trị hợp lệ từ `6` đến `9`.
- **Navigation safety semantics**:
  - **Quay lại**: Về bước nhập trước trong luồng tuần tự và giữ các hào đã nhập.
  - **Xóa các hào**: Xóa toàn bộ hào đã nhập nhưng giữ nguyên phương pháp lập quẻ.
  - **Hủy / Rời đi**: Bỏ dữ liệu hào đang nhập và về trang gieo quẻ (`/`). Nút `[ Hủy ]` mở hộp thoại xác nhận: _"Bỏ các hào đang nhập và rời khỏi phiên gieo quẻ?"_ khi đã nhập hào, hoặc _"Bỏ câu hỏi và phương pháp gieo quẻ rồi rời khỏi phiên gieo quẻ?"_ khi chỉ có câu hỏi hoặc phương pháp.
  - **Navigation Protection**:
    - _Điều hướng trong ứng dụng_: Chặn chuyển khỏi `/casting` khi đã nhập hào và yêu cầu xác nhận.
    - _Đóng hoặc tải lại trình duyệt_: Dùng sự kiện `beforeunload` khi đã nhập hào để yêu cầu xác nhận nếu trình duyệt hỗ trợ.
  - Khi hoàn tất hào sáu hoặc chọn `[ Tính quẻ ]` ở chế độ nhập trực tiếp, ứng dụng tính quẻ và mở kết quả tại `/result`.

---

## Responsive layout specifications

### Layout modes

- **Navigation modes**:
  - Mobile top bar and Bottom Nav: `< 768px` (with safe-area insets)
  - Desktop Top Nav: `>= 768px`
- **Result display modes**:
  - Single-pane layout: `< 900px` (full-width board with the intended bottom-anchored Base UI Sheet for contextual facts)
  - Split-pane layout: `>= 900px` (Master-Detail split view with persistent Fact Inspector, container max width `max-w-7xl mx-auto`)

---

### Reading result layout (`/result`)

The result view presents deterministic facts separated from explanatory prose, matching `reading-result.md`:

#### 1. Split-pane result layout (`>= 900px` Master-Detail):

- **Left pane (7 / 12 columns) — Hexagram Board**:
  - **Hexagram summary header**:
    - Tên Quẻ chính (`Noto Serif`), tên Ngoại quái và Nội quái.
    - Tên Cung và Ngũ hành của cung.
    - Tên Quẻ biến, Ngoại quái và Nội quái khi có hào động. Không hiển thị quẻ biến nếu không có hào động.
  - **6-Line Board**:
    - Xếp dọc từ Hào sáu ở trên đến Hào một ở dưới.
    - Each line row displays:
      - Vị trí hào từ `6` đến `1`.
      - Ký hiệu âm/dương qua `<YaoSymbol>`.
      - Dấu hào động: `✕` cho giá trị `6` hoặc `○` cho giá trị `9`, cùng mũi tên chỉ âm dương sau biến đổi.
      - Thiên can và địa chi theo phép Nạp Giáp.
      - Ngũ hành của địa chi.
      - Nhãn Lục thân: Huynh đệ, Tử tôn, Thê tài, Quan quỷ hoặc Phụ mẫu.
      - Dấu hào Thế hoặc hào Ứng.
- **Right pane (5 / 12 columns) — Fact Inspector Panel**:
  - Sticky container (`<FactInspector>`).
  - Displays the documented, ruleset-backed explanation and source reference for the currently selected item.
  - Interaction contract:
    - **Click / Tap / Keyboard Enter**: Selects the fact and makes it persistently active in the inspector.
    - **Keyboard Tab / Focus**: Focuses the line or fact badge; pressing Enter/Space selects it.
    - **Hover**: Optional transient preview; does not override an explicitly clicked/selected fact.
  - Footer shows `Xem trong thư viện: <fact label>` only when the selected fact has an explicit canonical Library entity target (such as a hexagram or trigram). Facts without a direct entity target have no footer link; their linked rules remain accessible in the inspector.

#### 2. Single-pane result layout (`< 900px` Board + Adaptive Sheet):

- **Main viewport**:
  - Hiển thị bảng quẻ toàn chiều rộng với hàng gọn và nhãn Nội quái/Ngoại quái rõ ràng.
  - Minimum touch target height for each line row is `48px`.
- **Fact inspection via Sheet**:
  - **Intended replacement:** Selecting a fact button opens a shadcn Base UI `Sheet` with `side="bottom"`.
  - Displays the exact same documented explanation and source reference as the desktop panel.
  - **Dismissal requirements**:
    - The visible `[ Đóng ]` button has `aria-label="Đóng phần giải thích dữ kiện"`.
    - `Escape` key press.
    - Clicking the scrim.
    - Keep keyboard focus inside the drawer while open, and restore focus to the triggering element upon close.
    - Swipe or drag dismissal is not implemented.

---

## Component inventory

### shadcn/ui components

- **Intended inventory:** Install components from the official `@shadcn` registry using the Base UI configuration. Add only components with actual consumers.
- `Button`: Primary actions, manual coin controls, step navigation, and router-link actions through `render`.
- `Card`: Home form, hexagram overview, casting workspace, Library records, and Settings sections.
- `Badge`: Shi/Ying markers, Five Element badges, ruleset indicators.
- `RadioGroup`: Home method selection.
- `ToggleGroup`: Coin-count selection, direct-line choices, and Library rule filters.
- `Tabs`: Library category switcher.
- `Sheet`: Base UI bottom sheet for compact-screen fact inspection.
- `AlertDialog`: Destructive confirmation modals (canceling casting flow, replacing existing reading draft).
- `Field`, `Textarea`: Optional question and labeled form structure.
- `InputGroup`: Library search and its clear action.
- `Alert`, `Empty`: PWA feedback, errors, and empty states.
- `Separator`: Structural section dividers.

### Custom domain components

- `<YaoSymbol polarity="yin"|"yang" changing={boolean} />`: Shared CSS line geometry and SVG moving markers across casting, direct input, and result boards. Reserve a fixed 24px marker column on every line. Draw moving markers as high-contrast `○` (yang) or `✕` (yin) on the same neutral surface as the strokes; do not enclose them in solid tiles or dim the strokes. Keep markers separate from names and bars; never rely on color alone.
- `<HexagramBoard result={result} changed={boolean} trigramIds={{ upper, lower }} select={selectFact} />`: Responsive 6-line board with upper/lower trigram indicators.
- `<AutomaticCastingPanel step={step} tosses={tosses} method={method} busy={busy} onMethodChange={...} onBack={...} onNext={...} onToss={...} onFinish={...} onAnimationComplete={...} onReset={...} />`:
  - Shows the current line number and six-line toss progress.
  - Presents automatic outcomes with canonical names and symbols, without numeric values. Marks the current line in the forming hexagram and reveals each line only after its animation completes.
  - Provides `[ Quay lại ]`, disabled on the first line. For a newly revealed line with an uncast successor, provides `[ Gieo hào tiếp ]` and begins the next toss with that activation. For a revisited line whose successor is already cast, provides `[ Tiếp theo ]` to show saved evidence without another toss. The first uncast slot provides `[ Gieo hào ]`; the completed sixth slot provides `[ Tính quẻ ]`.
  - Displays the outcome evidence. The casting flow provides the predetermined random outcome; animation must not determine or alter it.
- Manual coin controls show independently adjustable heads/tails faces, expose each coin's identity accessibly, and provide an explicit line-confirm action.
- `<FactInspector fact={selectedFact} />`: Ruleset-backed explanation renderer, embedded inline in split-pane views or inside the intended Base UI `Sheet` in single-pane views.
- `<AppShell />`: Master layout wrapping responsive header navigation and the main content.

---

## Invariants and safety rules

1. **Deterministic Rule Attribution Invariant**:
   - Every deterministic rule explanation displayed in production fact inspections must trace to at least one canonical source reference (identifying rule ID, applicable ruleset, source work, and source location when known).
   - Explanations are ruleset-backed explanations for `liuyao-standard-v1`, not personal interpretations.
2. **In-Memory Draft & Reading Safety**:
   - Any action that would discard entered casting lines or replace an active completed reading must require explicit user confirmation via an `AlertDialog`.
   - Navigating between root destinations (Reading, Library, Settings) must preserve the active completed reading in memory.
3. **PWA Update Safety**:
   - A newly waiting service worker must display a non-blocking toast/banner.
   - The application must never trigger an automatic page reload while a casting input flow or completed reading result is active.
4. **Accessibility (a11y)**:
   - Text contrast ratios: Normal text $\ge 4.5:1$; Large text ($\ge 18\text{pt}$ or $\ge 14\text{pt}$ bold) $\ge 3:1$.
   - Relevant non-text UI boundaries and interactive component states $\ge 3:1$.
   - Minimum interactive touch target size: $\ge 44 \times 44\text{px}$.
   - Full keyboard navigation: every interactive element, line row, and badge must have visible focus rings and keyboard activation support.
