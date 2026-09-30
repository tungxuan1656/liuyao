---
name: shadcn-ui
description: >-
  Build or review application UI in an existing shadcn/ui project by reusing
  components, slots, and variants thoroughly. Preserve the project's design
  system and prevent arbitrary spacing, sizing, and visual overrides. Use when
  composing screens or correcting unnecessary custom styling; not for choosing
  a new design system or changing the project's preset.
---

# Compose shadcn UI

Use the project's shadcn components as the default design system. Exhaust suitable
components, slots, variants, and supported composition before adding custom UI.

**Every custom spacing or sizing decision needs a concrete layout or product
reason. A standard Tailwind value is not, by itself, a reason.**

## Inspect the project first

- Find the relevant workspace's `components.json`. Resolve component aliases and
  the theme stylesheet from project configuration; do not assume `components/ui`.
- Read the relevant shared application components and local UI implementations.
  Inspect their slots, variants, size props, default spacing, and rendered HTML.
- Check existing layout patterns and design tokens before choosing new values.
- Use local source as the authority for available APIs. Do not assume current
  upstream examples match the installed component or primitive base.
- When available, use the companion `shadcn` skill for CLI operations, registry
  discovery, and API documentation. This skill owns the project's composition
  and styling constraints; it does not duplicate that operational guidance.
- Without that companion, consult official documentation for the project's
  configuration before adding components. Use its package manager and workspace.

Do not initialize shadcn or apply a new preset as a side effect of a screen task.

## Choose components before styles

Use this decision order:

1. Reuse a suitable shared application component.
2. Compose installed shadcn components with their intended slots and variants.
3. Check official shadcn components for a suitable component that is missing locally.
4. Add the missing component when needed for the task, preserving local changes
   and reviewing the generated diff and dependencies.
5. Use semantic HTML and minimal layout for content with no suitable component.
6. Create a domain component when it encapsulates a real product concept.

Prefer `Field` and its related components for forms, `Item` and `ItemGroup` for
suitable repeated content, `Alert` for callouts, and existing feedback components
for loading or empty states. Use `Button`, `Badge`, and `Separator` instead of
styling raw elements to imitate them. Verify availability and local APIs first.

Choose by meaning and behavior. Do not force a Card around every section, use an
Item for every row, or add components solely to eliminate an appropriate HTML
layout container. Domain graphics such as hexagram lines may need custom markup.

## Preserve component geometry

Keep default spacing and dimensions unless a concrete requirement needs a change.
This applies to both components and wrappers added around them.

- Prefer supported `variant`, `size`, orientation, and composition APIs before
  changing CSS. Use only props verified in the local implementation.
- Do not recreate Card headers, titles, descriptions, actions, or footers with
  manually styled elements. Use the slots that the content actually needs.
- Do not add padding to a wrapper when the component already supplies its inset.
- Do not shrink or enlarge buttons, inputs, icons, or other controls through
  `w-*`, `h-*`, `size-*`, padding, or line-height when a supported size fits.
- Do not force equal heights, fixed widths, or minimum heights merely to make
  content look more uniform. Prefer natural content sizing and existing layouts.
- Do not add margins to compensate for a component's default gap or padding.
- Do not change radius, border, shadow, color, or typography just to make a
  component look different. Prefer existing variants and semantic theme tokens.

Supported component customization, including a documented CSS variable, is
preferable to overriding individual slots. It still needs a concrete reason and
must exist in the local implementation.

## Layout is allowed, not exempt from justification

The component owns its slot spacing and control geometry. The application owns
page layout and the arrangement of application content inside slots.

For example, a grid inside `CardContent` can be valid. It must arrange actual
content; it must not recreate Card padding or compensate for another override.

For each new layout value:

1. State the need: a responsive column change, readable content width, avoiding
   overflow, a domain visualization constraint, or another observable requirement.
2. Check whether existing composition, intrinsic sizing, or a layout pattern
   already meets it without an override.
3. Reuse the project's layout token or established value when one fits.
4. Otherwise choose the smallest sufficient rule from the existing scale.
5. Use an arbitrary value only when a specific constraint cannot use those options.

Apply this reasoning to `gap-*`, `space-*`, margins, padding, width, height,
min/max dimensions, positioning, and equivalent inline styles or CSS rules.
`gap-4`, `w-80`, and `h-12` are not automatically justified because they belong to
Tailwind's standard scale. Nor is `w-full` a default to add to every control.

Use a parent grid or flex gap for genuine sibling layout rather than stacking
per-child margins. Reuse a semantic grouping component when it already owns the
needed spacing. Do not mechanically replace `space-y-*` with a custom gap if an
existing group is the better fit.

Avoid unexplained numeric tuning such as `p-[18px]`, `gap-[13px]`, or `w-[347px]`.
Do not trade responsive behavior for a screenshot match unless the user requests
that behavior explicitly.

## Examples of the decision boundary

Prefer a verified component size:

```tsx
<Button variant="outline" size="sm">Save</Button>
```

Do not imitate that size with independent geometry:

```tsx
<Button className="h-8 px-3 py-1 text-sm">Save</Button>
```

Use Card slots without redundant inset overrides:

```tsx
<Card>
  <CardHeader>
    <CardTitle>Reading</CardTitle>
    <CardDescription>Current interpretation</CardDescription>
  </CardHeader>
  <CardContent>{content}</CardContent>
</Card>
```

A `md:col-span-2` class is justified when the reading must span two columns in the
existing desktop grid. A `min-h-96` class added only because the Card looks short
is not. A width constraint may be justified by readability or overflow; use an
existing container pattern before selecting a new number.

## Handle necessary exceptions narrowly

Custom layout or styling is appropriate when required by product behavior,
accessibility, responsive content, or domain visuals with no suitable primitive.

- Identify the unmet requirement and why an existing component API does not fit.
- Keep the change local to its owner and reuse existing tokens where possible.
- Extract a shared component when there is a real shared concept, not merely to
  hide an arbitrary class from feature code.
- For a non-obvious numeric constraint, leave a short explanation near its owner.
  Summarize material exceptions in the handoff; no per-class log is needed.

Adding a missing official component is different from changing an existing one.
For ordinary screen work, preserve existing shared component defaults. Change a
shared component or the preset only when that design-system change is within the
user's requested scope. Do not promote a one-screen exception into a global fix.

## Review before completion

Inspect the changed markup, classes, inline styles, and CSS. For each added visual
or geometry rule, check whether a component, slot, variant, size, or existing
layout pattern makes it unnecessary. Remove redundant rules and wrappers.

Confirm that:

- Suitable project and shadcn components were reused before custom markup.
- New imports refer to installed components and verified APIs.
- Slot spacing and control dimensions retain their defaults unless justified.
- Each new spacing or sizing value serves an identifiable requirement.
- Semantic tokens are used and the existing preset remains intact.
- Heading levels, labels, accessible names, and interactive behavior remain
  correct. A component name such as `CardTitle` does not guarantee heading HTML.
- Changed layouts work with narrow screens, long content, and relevant states.
- Relevant repository checks pass; inspect the rendered UI when layout changes.

Report the verification actually performed and any material styling exception.
Do not claim that a class scan alone proves visual or interaction correctness.
