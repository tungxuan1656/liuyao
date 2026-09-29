# Web UI layout and navigation

This document owns the V1 user interface layout, information architecture, navigation hierarchy, responsive breakpoints, design tokens, component selection, and desktop/mobile adaptation for `apps/web`.

The interface uses Vietnamese labels. Any English interface labels in this document are semantic placeholders, not approved user-facing copy. See `vietnamese-language.md` for canonical terminology.

Domain behaviors, input validation, result content, reference data schemas, and diagnostics content are owned by their respective canonical documents (`reading-flow.md`, `reading-result.md`, `knowledge-browser.md`, `settings.md`). This document specifies only how those capabilities are presented and composed responsively.

---

## Visual foundation and design tokens

### Component system

- **Intended replacement:** All web routes use official **shadcn/ui** components with **Base UI** primitives and preset **`b59jufSZGa`**.
- The preset selects **Sera**, neutral base/theme/chart colors, Lucide icons, Noto Sans body text, and Noto Serif headings. Use its default radius and subtle menu accent.
- Enable the preset's pointer-cursor option. Use semantic theme tokens and built-in component variants for controls.
- Use white surfaces, neutral text, subtle borders, and consistent spacing. Avoid ornamental frames, paper textures, metallic gradients, and decorative shadows.
- Application layouts compose shadcn components. Domain renderers cover coin faces, yao symbols, and hexagram geometry.
- Base UI owns control behavior, modal focus, and keyboard interactions. Remove Radix dependencies and duplicate control implementations.
- Scope includes Home, all casting modes, results, Library, Settings, navigation, confirmations, and PWA feedback.
- This replacement is not implemented yet. The existing `new-york` controls and 3D scene are superseded implementation targets.
- Single codebase with responsive CSS utility classes (Tailwind breakpoints). Never maintain separate codebases or separate component trees for mobile and desktop.

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

---

## Information architecture and navigation hierarchy

The application organizes all product views into three distinct architectural levels:

```text
Level 0: Root Destinations (Bottom Nav on Mobile / Top Nav on Desktop)
├── Tab 1: Gieo quẻ (Phiên hiện tại) ──> Path: /
├── Tab 2: Thư viện (Tra cứu)         ──> Path: /library
└── Tab 3: Cài đặt (Chẩn đoán)        ──> Path: /settings

Level 1: Sub-Pages (Deep Reference Browsing)
└── Chi tiết thư viện (mục/quy tắc)  ──> Path: /library/:entityType/:id
    (Giữ điều hướng gốc; thanh trên cùng hiển thị [ < Quay lại thư viện ])

Level 2: Luồng tập trung (Phiên nhập liệu)
└── Luồng lập quẻ                    ──> Path: /casting
    (Ẩn điều hướng gốc; thanh trên cùng hiển thị [ Hủy ])
```

---

### Level 0 — Root destinations

Root destinations represent persistent, top-level hubs:

- **Navigation modes**:
  - **Bottom Nav (`< 768px`)**: Fixed Bottom Navigation Bar (`border-t bg-background/95 backdrop-blur z-50`).
    - Height: `h-16` plus `env(safe-area-inset-bottom)`.
    - Main scrollable content must have bottom padding accounting for `h-16 + env(safe-area-inset-bottom)` to prevent content occlusion.
  - **Top Nav (`>= 768px`)**: Fixed Top Header Navigation Bar (`h-14 border-b bg-background/95 backdrop-blur z-50`).
    - Placed horizontally with brand mark on the left, tab links in the center/right, and network status badge.
- **State preservation across root tabs**:
  - Switching between root destinations (Gieo quẻ, Thư viện, Cài đặt) must not destroy an active completed reading.
  - An active reading result is preserved in browser memory across tab switches until the user explicitly triggers `[ Lập quẻ mới ]` or reloads the application.

#### 1. Tab 1: Gieo quẻ (`/`)

Represents the primary divination workspace. Follows states defined in `reading-flow.md` and `reading-result.md`:

- **Trạng thái bắt đầu gieo quẻ** (khi chưa có kết quả trong bộ nhớ):
  - Hiển thị ô nhập câu hỏi không bắt buộc, lựa chọn phương pháp (Gieo tự động, Gieo thủ công, Nhập trực tiếp) và nút `[ Bắt đầu gieo quẻ ]` để mở luồng `/casting`.
  - **Intended composition:** Use one centered `Card`, with `CardHeader`, `CardContent`, and `CardFooter`. The content width is approximately 720px.
  - Use `FieldGroup`, `Field`, `Textarea`, and a labeled `RadioGroup`. Show one full-width primary action and one concise session-storage note.
  - Use the neutral preset for navigation and form controls. Keep the heading and optional question prominent.
- **Trạng thái kết quả** (khi có quẻ đã tính trong bộ nhớ):
  - Displays the full Hexagram Result Board (see Result Layout below).
  - Phần đầu trang hiển thị nút `[ Lập quẻ mới ]`. Nút này mở hộp thoại xác nhận trước khi thay quẻ trong bộ nhớ.

#### 2. Tab 2: Thư viện (`/library`)

The read-only knowledge reference hub (behavior defined in `knowledge-browser.md`):

- Local search input matching canonical Vietnamese names and reviewed Vietnamese aliases.
- Điều hướng danh mục bằng `Tabs`: _Quẻ_ | _Quái_ | _Thuật ngữ_ | _Quy tắc_.
- Grid/list of reference cards. Tapping any card opens its Level 1 Sub-Page.

#### 3. Tab 3: Cài đặt (`/settings`)

Diagnostics and system state (content defined in `settings.md`):

- PWA install prompt button (when supported by browser).
- Online/offline indicator and cache readiness state.
- Version stamping: web app, `@liuyao/core`, `@liuyao/knowledge`, ruleset ID `liuyao-standard-v1`.
- Legal, privacy, and licensing links.

---

### Level 1 — Trang con (Tra cứu chi tiết)

- Dùng để tra cứu từng quẻ, quái, thuật ngữ và định nghĩa quy tắc trong Thư viện.
- **Navigation state**:
  - The Bottom Navigation Bar **remains visible** on mobile so users can switch tabs at any time.
  - Thanh trên cùng có nút `[ Quay lại thư viện ]`.
  - Supports deep-linking, browser history navigation, and direct route reloads.

---

### Level 2 — Luồng tập trung: Nhập hào (`/casting`)

Used during active line input before calculation. Governed by the rules in `reading-flow.md`:

- **Navigation state**:
  - The primary Root Navigation (Bottom Nav) is **strictly hidden** to eliminate distraction and prevent accidental draft loss.
  - Thanh trên cùng có nút `[ Hủy ]` và trạng thái nhập liệu.
- **Input modes**:
  - **Sequential mode (Manual casting & Automatic coin casting)**:
    - Chỉ báo bước: `Hào 1 trên 6` đến `Hào 6 trên 6`.
    - Bottom-to-top sequence.
    - Có nút `[ Quay lại ]` để về hào trước mà không xóa dữ liệu đã nhập.
    - **Intended replacement:** Automatic and manual modes share a neutral `Card` workspace and the same coin arrangement.
    - The header contains a single-select `ToggleGroup` for three/four coins and the completed-line count. Existing draft rules control when selection is locked.
    - Desktop places the forming hexagram beside the coin area. Mobile stacks the compact hexagram above the coins.
    - Fill slots from bottom to top. Keep line names and moving markers aligned. Empty slots use placeholders distinct from completed yang lines.
    - Three coins occupy a fixed triangle: one centered above two lower coins. All three use the same neutral surface.
    - Four coins occupy a fixed square: Earth at top-left, Water at top-right, Fire at bottom-left, and Wind at bottom-right.
    - Use yellow, blue, red, and gray coin surfaces respectively. Show the labels **Địa**, **Thủy**, **Hỏa**, and **Phong** below the coins.
    - Every coin face uses a large Unicode **☀** or **☾**. Request text presentation and provide Vietnamese accessible face labels.
    - Color identifies the four weighted coins. Color never identifies heads/tails by itself. Elemental pictograms and engraved textures are removed.
    - Automatic coins flip repeatedly in place, then show the predetermined faces. Remove Three.js, WebGL, canvas textures, camera motion, and airborne trajectories.
    - **Proposed timing:** Four 300ms flip cycles, with a total duration of 1200ms. Use horizontal CSS scaling and swap glyphs at edge-on frames.
    - Keep each coin center, the stage height, the result region, and the action bar stationary throughout the flip and reveal.
    - Explicit tosses animate under reduced-motion preferences. Reset, cancel, or unmount cancels completion. Revisits show stored faces without replay.
    - Manual coins use shadcn `Button` controls. Each activation flips one face to match a physical toss. Manual input never generates random faces.
    - Manual confirmation records the line. The shared hexagram shows confirmed lines, while the current preview remains separate.
    - **Visual acceptance:** Review the actual flip, Unicode readability, both coin arrangements, and final outcomes on desktop and mobile.
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
  - **Hủy / Rời đi**: Bỏ dữ liệu hào đang nhập và về trang gieo quẻ (`/`). Nếu đã nhập hào, nút `[ Hủy ]` mở hộp thoại: _"Bỏ các hào đang nhập và quay lại trang gieo quẻ?"_.
  - **Navigation Protection**:
    - _Điều hướng trong ứng dụng_: Chặn chuyển khỏi `/casting` khi đã nhập hào và yêu cầu xác nhận.
    - _Đóng hoặc tải lại trình duyệt_: Dùng sự kiện `beforeunload` khi đã nhập hào để yêu cầu xác nhận nếu trình duyệt hỗ trợ.
  - Khi hoàn tất hào sáu hoặc chọn `[ Tính quẻ ]` ở chế độ nhập trực tiếp, ứng dụng tính quẻ và mở kết quả tại `/`.

---

## Responsive layout specifications

### Layout modes

- **Navigation modes**:
  - Bottom Nav: `< 768px` (mobile viewport with safe-area insets)
  - Top Nav: `>= 768px` (tablet and desktop viewports)
- **Result display modes**:
  - Single-pane layout: `< 900px` (full-width board with the intended bottom-anchored Base UI Sheet for contextual facts)
  - Split-pane layout: `>= 900px` (Master-Detail split view with persistent Fact Inspector, container max width `max-w-7xl mx-auto`)

---

### Reading result layout (`/`)

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

- `<YaoSymbol polarity="yin"|"yang" changing={boolean} />`: Shared CSS line geometry and SVG moving markers across casting, direct input, and result boards. Reserve a fixed 24px marker column on every line. Moving lines use dark vermilion strokes and a high-contrast white circle (yang) or cross (yin) in a vermilion badge. Keep markers separate from names and bars; never rely on color alone.
- `<HexagramBoard reading={result} onSelectLine={(lineIndex) => ...} />`: Responsive 6-line board with upper/lower trigram indicators.
- `<AutomaticCastingPanel step={step} lines={lines} tosses={tosses} onBack={...} onNext={...} onToss={...} onFinish={...} />`:
  - Shows the current line number and six-line toss progress.
  - Presents automatic outcomes with canonical names and symbols, without numeric values. Marks the current line in the forming hexagram and reveals each line only after its animation completes.
  - Provides `[ Quay lại ]`, disabled on the first line. For an already-cast line, provides `[ Tiếp theo ]`, except on the completed sixth line, where it provides `[ Tính quẻ ]`. For the next uncast line, provides `[ Gieo hào ]`.
  - Displays the outcome evidence. The casting flow provides the predetermined random outcome; animation must not determine or alter it.
- Manual coin controls show independently adjustable heads/tails faces, expose each coin's identity accessibly, and provide an explicit line-confirm action.
- `<FactInspector fact={selectedFact} />`: Ruleset-backed explanation renderer, embedded inline in split-pane views or inside the intended Base UI `Sheet` in single-pane views.
- `<AppShell />`: Master layout wrapping TopNav (desktop), BottomNav (mobile with safe area), and main scroll container.

---

## Invariants and safety rules

1. **Deterministic Rule Attribution Invariant**:
   - Every deterministic rule explanation displayed in production fact inspections must trace to at least one canonical source reference (identifying rule ID, applicable ruleset, source work, and source location when known).
   - Explanations are ruleset-backed explanations for `liuyao-standard-v1`, not personal interpretations.
2. **In-Memory Draft & Reading Safety**:
   - Any action that would discard entered casting lines or replace an active completed reading must require explicit user confirmation via an `AlertDialog`.
   - Navigating between Level 0 root tabs (Reading, Library, Settings) must preserve the active completed reading in memory.
3. **PWA Update Safety**:
   - A newly waiting service worker must display a non-blocking toast/banner.
   - The application must never trigger an automatic page reload while a casting input flow or completed reading result is active.
4. **Accessibility (a11y)**:
   - Text contrast ratios: Normal text $\ge 4.5:1$; Large text ($\ge 18\text{pt}$ or $\ge 14\text{pt}$ bold) $\ge 3:1$.
   - Relevant non-text UI boundaries and interactive component states $\ge 3:1$.
   - Minimum interactive touch target size: $\ge 44 \times 44\text{px}$.
   - Full keyboard navigation: every interactive element, line row, and badge must have visible focus rings and keyboard activation support.
