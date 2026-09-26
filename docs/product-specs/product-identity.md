# Product identity

This document owns the public V1 product identity and release assets.

## Release decisions

The Product Owner approved **Lục Hào** as the final public product name and **English** as the V1 primary interface language on 2026-09-27. The approval does not cover the PWA short name, terminology, description, tagline, visual identity, release metadata, or assets; these remain pending.

The Product Owner must approve these remaining decisions before production launch:

- short PWA name;
- terminology;
- one-sentence product description;
- tagline, if used;
- logo mark and wordmark direction;
- theme and background colors;
- approved typography stack: Noto Serif for Vietnamese headings and hexagram names, Noto Sans for body and data, explicit Noto CJK for Han characters, and Cinzel restricted to Latin-only brand marks (see `docs/product-specs/ui-layout.md`).

Do not treat a repository or package name as the public product name by default.

## Asset set

Keep one source asset for each approved mark.

Export the release set from those sources:

- vector logo master;
- favicon;
- 192×192 PWA icon;
- 512×512 PWA icon;
- maskable PWA icon;
- Apple touch icon;
- social sharing image;
- light and dark variants only when the UI supports both.

Document the creator, source, and usage rights for every non-original asset.

## Product metadata

Use the approved identity consistently in:

- application header;
- `index.html` title and description;
- HTML language;
- PWA manifest name and short name;
- PWA theme colors;
- install surfaces;
- social sharing metadata;
- README product description.

The production domain belongs to `docs/release.md` and F13. Product identity consumes that URL after selection; it does not own the domain decision.

## Rules

- Keep product naming independent from package identifiers.
- Use local or system typography for core V1 flows; bundle and self-host all approved fonts locally for offline-first PWA operation.
- Do not require a remote font, icon CDN, or branding API.
- Keep logo text readable when the mark is hidden.
- Give decorative branding accessible treatment that does not pollute screen-reader output.
- Do not ship placeholder icons, placeholder copy, or development titles.

## Acceptance

- [ ] The approved public name and primary interface language are applied consistently in the release metadata.
- [ ] Browser tab, installed PWA, app header, and social preview use the same identity.
- [ ] Required icon sizes pass manifest and install checks.
- [ ] Branding assets have documented usage rights.
- [ ] No provisional `LiuYao - Lục Hào` metadata remains unless it is approved as final.
