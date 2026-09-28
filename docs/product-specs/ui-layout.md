# Web UI layout and navigation

This document owns the V1 user interface layout, information architecture, navigation hierarchy, responsive breakpoints, design tokens, component selection, and desktop/mobile adaptation for `apps/web`.

The interface uses Vietnamese labels. Any English interface labels in this document are semantic placeholders, not approved user-facing copy. See `vietnamese-language.md` for canonical terminology.

Domain behaviors, input validation, result content, reference data schemas, and diagnostics content are owned by their respective canonical documents (`reading-flow.md`, `reading-result.md`, `knowledge-browser.md`, `settings.md`). This document specifies only how those capabilities are presented and composed responsively.

---

## Visual foundation and design tokens

### Component system

- V1 web UI will use **shadcn/ui** with the **`new-york`** style.
- Visual properties: subtle borders (`border-border`), restrained corner radii (`rounded-md`, 4–6px), high typographic discipline, and minimal decorative elevation.
- Single codebase with responsive CSS utility classes (Tailwind breakpoints). Never maintain separate codebases or separate component trees for mobile and desktop.

### Typography

- **Headings & Hexagram Names**: `Noto Serif` (`font-serif`) with complete Vietnamese diacritic coverage.
- **Body, Data, & Form Controls**: `Noto Sans` (`font-sans`) with complete Vietnamese diacritic coverage.
- **Language**: Render Vietnamese only. Do not add Han-character text or a CJK font fallback for knowledge content; see `vietnamese-language.md`.
- **Brand / Decorative Latin Text**:
  - `Cinzel` is restricted exclusively to the Latin-only logo mark, brand title, and decorative Roman numbers. It must not be used for general Vietnamese headings.
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
    - Automatic mode has one explicit three-coin toss action per line. Show its generated outcome before moving to the next line; revisiting a completed line must preserve its original toss. Reset discards the complete automatic draft before any new tosses.
  - **Direct-entry mode**:
    - All 6 line positions are visible simultaneously on one screen.
    - Presented visually in board orientation from Line 6 (top) down to Line 1 (bottom), while keeping canonical domain state in bottom-to-top order (1 to 6).
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
  - Single-pane layout: `< 900px` (full-width board with bottom-anchored Drawer for contextual facts)
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
  - Chân trang có nút `[ Xem trong thư viện ]` để mở mục tra cứu tương ứng.

#### 2. Single-pane result layout (`< 900px` Board + Adaptive Drawer):

- **Main viewport**:
  - Hiển thị bảng quẻ toàn chiều rộng với hàng gọn và nhãn Nội quái/Ngoại quái rõ ràng.
  - Minimum touch target height for each line row is `48px`.
- **Fact inspection via Drawer**:
  - Selecting a fact button opens a bottom-anchored `Drawer`.
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
- `<AutomaticCastingPanel step={step} lines={lines} tosses={tosses} onBack={...} onNext={...} onToss={...} onFinish={...} />`:
  - Shows the current line number and six-line toss progress.
  - Once the current line has been cast, announces its value and three coin bits in a live status; the most recently cast line is marked as such.
  - Provides `[ Quay lại ]`, disabled on the first line. For an already-cast line, provides `[ Tiếp theo ]`, except on the completed sixth line, where it provides `[ Tính quẻ ]`. For the next uncast line, provides `[ Gieo hào ]`.
  - Displays toss evidence without a claimed coin animation. Randomness is provided by the casting flow, not owned by this panel.
- `<FactInspector fact={selectedFact} />`: Ruleset-backed explanation renderer, embedded inline in split-pane views or inside `<Drawer>` in single-pane views.
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
