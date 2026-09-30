Tôi sẽ chốt thành **một skill duy nhất**, đủ cứng để agent không tự chế UI nhưng vẫn không trói tay phần layout. Có thể dùng nguyên văn dưới đây.

```md
---
name: shadcn-ui
description: Build application UI by composing the project's existing shadcn/ui design system. Preserve the active shadcn preset and minimize custom visual styling.
---

# shadcn/ui Design System Skill

## Goal

This project uses **shadcn/ui as the authoritative design system**, not merely
as a collection of reusable components.

The primary rule is:

> COMPOSE SHADCN. DO NOT RECREATE OR RESTYLE SHADCN.

Prefer composition of existing shadcn components and slots over custom
Tailwind styling.

The active project preset and the local `components/ui/*` implementations are
the source of truth.

---

# 1. Source of truth

Use this priority order:

1. Existing project-specific shared component
2. Existing local shadcn component in `components/ui`
3. Official shadcn component/pattern
4. Composition of multiple shadcn primitives
5. Tailwind for macro layout
6. Custom application component composed from shadcn
7. Custom visual styling only as a last resort

Never start by styling arbitrary `<div>` elements.

---

# 2. Inspect local shadcn components first

Before using or modifying a shadcn component, inspect its local implementation.

Examples:

- `components/ui/card.tsx`
- `components/ui/button.tsx`
- `components/ui/field.tsx`
- `components/ui/item.tsx`
- `components/ui/table.tsx`

Do not guess:

- padding
- gap
- radius
- border
- typography
- variants
- supported slots

The local implementation overrides assumptions from upstream shadcn examples.

Do not modify files inside `components/ui/*` unless explicitly requested.

---

# 3. Preserve the preset

The current shadcn preset owns:

- component padding
- internal spacing
- typography
- radius
- borders
- shadows
- colors
- component heights
- interaction states
- variants

Do not locally change these simply to make a screen "look better".

If a design-system-wide visual change is needed, change the shared design
system rather than patching individual screens.

---

# 4. Use semantic shadcn composition

Always use the intended component structure.

Preferred:

```tsx
<Card>
  <CardHeader>
    <CardTitle>Primary Hexagram</CardTitle>
    <CardDescription>Current reading</CardDescription>
  </CardHeader>

  <CardContent>
    ...
  </CardContent>

  <CardFooter>
    ...
  </CardFooter>
</Card>
```

Avoid:

```tsx
<Card className="p-6">
  <div className="mb-4">
    <h2 className="text-lg font-semibold">
      Primary Hexagram
    </h2>

    <p className="mt-1 text-sm text-muted-foreground">
      Current reading
    </p>
  </div>

  ...
</Card>
```

Do not recreate:

- `CardHeader`
- `CardTitle`
- `CardDescription`
- `CardAction`
- `CardContent`
- `CardFooter`

with arbitrary divs and spacing utilities.

---

# 5. Card rule

A normal Card should be composed from shadcn Card slots.

Default structure:

```tsx
<Card>
  <CardHeader>
    <CardTitle />
    <CardDescription />
  </CardHeader>

  <CardContent />
</Card>
```

Optional:

```tsx
<CardAction />
<CardFooter />
```

Do not normally add:

```text
p-*
px-*
py-*
m-*
mt-*
mb-*
rounded-*
border-*
shadow-*
```

to:

```text
Card
CardHeader
CardContent
CardFooter
```

unless there is a concrete product requirement that cannot be achieved through
normal component composition.

---

# 6. Macro layout vs micro layout

Follow this boundary strictly:

> Tailwind controls layout BETWEEN modules.
> shadcn controls layout INSIDE components.

Tailwind is appropriate for:

- grid
- flex
- gap
- columns
- responsive spans
- width constraints
- height constraints
- positioning
- overflow
- visibility
- responsive behavior

Example:

```tsx
<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
  <Card className="md:col-span-2">
    ...
  </Card>

  <Card>
    ...
  </Card>

  <Card>
    ...
  </Card>
</div>
```

This is good.

Avoid using margins on individual cards to construct page layout:

```tsx
<Card className="mb-4 mr-4" />
```

Use parent `grid`, `flex`, and `gap` instead.

---

# 7. Use shadcn primitives inside cards

Do not automatically solve internal structure with nested divs.

Before creating a custom structure, consider whether one of these fits:

- Item
- ItemGroup
- Field
- FieldGroup
- FieldSet
- Label
- Separator
- Table
- Tabs
- Accordion
- Collapsible
- Badge
- Alert
- Progress
- Skeleton
- ScrollArea
- Button
- Input
- Textarea
- Select
- Checkbox
- RadioGroup
- Switch
- Tooltip
- Popover
- DropdownMenu
- Dialog
- Sheet
- Drawer

Prefer:

```tsx
<CardContent>
  <ItemGroup>
    <Item>...</Item>
    <Item>...</Item>
    <Item>...</Item>
  </ItemGroup>
</CardContent>
```

over inventing repeated rows such as:

```tsx
<CardContent>
  <div className="space-y-4">
    <div className="flex justify-between py-3">...</div>
    <div className="flex justify-between py-3">...</div>
    <div className="flex justify-between py-3">...</div>
  </div>
</CardContent>
```

---

# 8. Avoid unnecessary wrappers

Every wrapper element must have a structural purpose.

Avoid:

```tsx
<CardContent>
  <div className="px-2">
    <div className="space-y-4">
      <div>
        ...
      </div>
    </div>
  </div>
</CardContent>
```

Prefer direct component composition.

Do not add wrapper divs solely to create padding or margins already provided by
the component.

---

# 9. Do not default to `space-y-*`

Do not use `space-y-*` as the default solution for vertical structure.

For semantic groups prefer:

- ItemGroup
- FieldGroup
- Separator
- Table
- Accordion
- Card slots

Use `gap-*` when the container is genuinely a generic flex/grid layout.

Repeated arbitrary:

```text
space-y-1
space-y-2
space-y-3
space-y-4
```

throughout feature code is a design-system smell.

---

# 10. Theme tokens only

Use semantic theme tokens whenever possible.

Preferred:

```text
bg-background
bg-card
bg-muted
bg-accent

text-foreground
text-muted-foreground

border-border
```

Avoid hardcoded palettes:

```text
bg-white
bg-zinc-100
bg-gray-50

text-gray-500
text-zinc-600

border-slate-200
```

unless the product specification explicitly requires a fixed non-theme color.

---

# 11. Avoid arbitrary Tailwind values

Do not use arbitrary values by default.

Avoid:

```text
p-[18px]
gap-[13px]
rounded-[11px]
text-[15px]
w-[347px]
mt-[7px]
```

Prefer:

1. shadcn defaults
2. project design tokens
3. Tailwind's standard scale
4. responsive layout

Arbitrary values require a concrete reason.

---

# 12. Typography

Use the typography already defined by shadcn components.

Do not manually reproduce semantic component typography.

Avoid:

```tsx
<h3 className="text-lg font-semibold tracking-tight">
```

when:

```tsx
<CardTitle>
```

already represents the semantic role.

Likewise, prefer:

```tsx
<CardDescription>
```

rather than recreating muted descriptive text manually.

Custom typography is acceptable for domain-specific display elements that have
no equivalent shadcn semantic component.

---

# 13. Component variants

Use existing component variants before custom styling.

Preferred:

```tsx
<Button variant="outline" size="sm">
```

Avoid:

```tsx
<Button className="border bg-transparent px-3 py-1 text-sm">
```

Preferred:

```tsx
<Badge variant="secondary">
```

Avoid styling a generic span to imitate a Badge.

---

# 14. Do not recreate shadcn components

Never manually rebuild an existing shadcn primitive using HTML + Tailwind.

Examples of prohibited recreation:

```tsx
<div className="rounded-md border p-4">
```

instead of `Card`.

```tsx
<button className="...">
```

instead of `Button`.

```tsx
<div className="h-px bg-border">
```

instead of `Separator`.

```tsx
<span className="rounded-md bg-muted px-2 py-1 text-xs">
```

instead of `Badge`.

```tsx
<input className="...">
```

instead of `Input`.

Use the existing component.

---

# 15. Add shadcn before inventing custom UI

If a suitable shadcn component exists but has not yet been added to the
project, prefer adding the official component rather than recreating it.

Do not invent a custom primitive simply because the component is not currently
present in `components/ui`.

---

# 16. Shared application components

Domain-specific components are encouraged when they represent reusable product
concepts.

Examples:

```text
HexagramCard
ReadingSummary
LiuYaoBoard
ReadingMetadata
RuleSource
HexagramLine
```

These components should themselves be composed from shadcn primitives.

Example:

```tsx
function HexagramCard(...) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{...}</CardTitle>
        <CardDescription>{...}</CardDescription>
      </CardHeader>

      <CardContent>
        ...
      </CardContent>
    </Card>
  )
}
```

Do not create a parallel visual system inside domain components.

---

# 17. Approved Card archetypes

Prefer a small number of predictable card structures.

## Information Card

```tsx
<Card>
  <CardHeader>
    <CardTitle />
    <CardDescription />
  </CardHeader>

  <CardContent />
</Card>
```

## Action Card

```tsx
<Card>
  <CardHeader>
    <CardTitle />
    <CardDescription />

    <CardAction>
      <Button />
    </CardAction>
  </CardHeader>

  <CardContent />
</Card>
```

## List/Data Card

```tsx
<Card>
  <CardHeader>
    <CardTitle />
  </CardHeader>

  <CardContent>
    <ItemGroup>
      <Item />
      <Item />
    </ItemGroup>
  </CardContent>
</Card>
```

## Footer Action Card

```tsx
<Card>
  <CardHeader />
  <CardContent />

  <CardFooter>
    <Button />
  </CardFooter>
</Card>
```

Before inventing another card structure, verify that these patterns are
insufficient.

---

# 18. Styling budget

Feature code should contain as little visual customization as possible.

Custom Tailwind should primarily describe:

```text
layout
responsive behavior
grid placement
sizing
positioning
overflow
visibility
```

When a shadcn component accumulates multiple visual overrides such as:

```text
padding
radius
border
shadow
background
font size
font weight
color
```

stop and reconsider the composition.

This usually means the implementation is fighting the design system.

---

# 19. `className` test

Before adding `className` to a shadcn component, ask:

1. Is this needed for page/grid layout?
2. Is it needed for responsive behavior?
3. Is it needed for sizing or spanning?
4. Is it needed for positioning/overflow?
5. Is the requirement impossible through existing shadcn composition or
   variants?

If all answers are no, do not add the class.

Good:

```tsx
<Card className="md:col-span-2">
```

Good:

```tsx
<div className="grid gap-4 lg:grid-cols-3">
```

Suspicious:

```tsx
<Card className="p-4">
```

Suspicious:

```tsx
<CardContent className="px-3 py-2">
```

Suspicious:

```tsx
<Button className="rounded-full px-7">
```

Suspicious:

```tsx
<CardTitle className="text-[19px] font-bold">
```

---

# 20. Page architecture

For dashboard-style screens prefer:

```tsx
<Page>
  <PageHeader />

  <div className="grid gap-4 ...">
    <Card>
      <CardHeader />
      <CardContent />
    </Card>

    <Card>
      <CardHeader />
      <CardContent />
    </Card>
  </div>
</Page>
```

The page/grid owns macro geometry.

Cards own their internal geometry.

Do not manually position content inside each card to compensate for page
layout.

---

# 21. Workflow for every UI task

Before coding:

### Step 1 — Inspect

Inspect:

- relevant existing feature components
- `components/ui/*`
- current design patterns in the repository

### Step 2 — Map to shadcn

Determine which shadcn components represent each UI concept.

Do not begin with HTML elements.

### Step 3 — Choose composition

Define the semantic component tree first.

Example:

```text
Card
├── CardHeader
│   ├── CardTitle
│   ├── CardDescription
│   └── CardAction
└── CardContent
    └── ItemGroup
        ├── Item
        ├── Item
        └── Item
```

### Step 4 — Define macro layout

Only after the component tree exists, define:

```text
grid
columns
gap
responsive spans
width/height constraints
```

### Step 5 — Implement with defaults

Render using default shadcn styling first.

Do not immediately customize the result.

### Step 6 — Add minimum exceptions

Only add custom classes required by actual layout or product requirements.

### Step 7 — Audit

Remove styling that duplicates shadcn defaults.

---

# 22. Mandatory UI audit

Before completing a UI task, search the changed code for:

```text
className=
p-
px-
py-
m-
mx-
my-
mt-
mb-
ml-
mr-
space-y-
rounded-
border-
shadow-
bg-
text-
font-
[...]
```

For every visual utility, ask whether:

- shadcn already supplies it
- an existing variant supplies it
- a semantic component eliminates it
- a wrapper can be removed
- the styling belongs in the parent layout instead

Remove unnecessary overrides.

---

# 23. Do not optimize by screenshot imitation

When implementing a reference design, reproduce its:

- information hierarchy
- card arrangement
- grid proportions
- responsive behavior
- component selection

Do NOT imitate every pixel by overriding shadcn internals.

The project design system has higher priority than pixel-perfect recreation of
a reference screenshot unless explicitly requested otherwise.

---

# 24. Exceptions

Custom visual styling is allowed when:

- the domain has no suitable shadcn primitive
- the element is intentionally bespoke
- data visualization requires it
- the product specification explicitly requires it
- the shared design system itself is being intentionally extended

When an exception is necessary, keep it isolated in a reusable component
rather than scattering overrides throughout feature code.

---

# 25. Definition of Done

A UI task is complete only when:

- existing project components were reused where applicable
- local shadcn implementations were inspected when relevant
- shadcn primitives were used wherever suitable
- semantic slots were used correctly
- Card internal spacing remains owned by Card components
- layout between cards uses grid/flex/gap
- unnecessary margins are absent
- unnecessary wrapper divs are absent
- existing variants are used before custom styles
- semantic theme tokens are used
- arbitrary Tailwind values are minimized
- the active shadcn preset remains visually intact
- no shadcn primitive has been manually recreated
- feature code does not establish a second design system
```