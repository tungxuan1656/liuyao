# Product identity

This document owns the public V1 product identity and release assets.

## Release decisions

The Product Owner approved **Lục Hào** as the final public product name on 2026-09-27 and approved **Lục Hào** as the PWA short name on 2026-10-01. The approved one-sentence description is **“Lập quẻ, tra cứu và lưu kết quả Lục Hào ngay trên thiết bị của bạn.”** On 2026-09-28, the Product Owner approved Vietnamese as the only user-facing language, including the knowledge catalog, with no Han characters displayed. `docs/product-specs/vietnamese-language.md` owns the language and terminology rules.

On 2026-10-01, the Product Owner approved the supplied `docs/design-docs/batquai.avif` bagua artwork, its current wordmark treatment shown in `docs/product-specs/previews/feat-013-logo-preview.html`, and the current application theme and background colors. Use the supplied artwork as-is: do not redraw, trace, crop, or remove its bagua. The Product Owner confirmed project usage rights for this asset on 2026-10-01; this is not an independent legal audit. The Product Owner approved no tagline for V1.

The Product Owner waived an editable vector master and social-sharing image for V1 on 2026-10-01. These are not V1 deliverables and have not been generated. Name-conflict, domain-availability, and obvious trademark-risk research remains outstanding before launch. Final terminology and copy review remains tracked in `docs/product-specs/vietnamese-language.md`.

Complete these remaining checks before production launch:

- final terminology and copy review (see `docs/product-specs/vietnamese-language.md`);
- name-conflict, domain-availability, and obvious trademark-risk research.

The selected icon is black-and-white artwork on white. Its generated square maskable icon uses 45% padding so the full supplied composition fits inside the 80% circular maskable safe zone. Keep the Product Owner-approved current application theme and background colors unchanged.

Do not treat a repository or package name as the public product name by default.

## Asset set

Keep one source asset for each approved mark.

Export the required V1 set from those sources:

- favicon;
- 192×192 PWA icon;
- 512×512 PWA icon;
- maskable PWA icon;
- Apple touch icon;
- light and dark variants only when the UI supports both.

Do not create an editable vector master or social-sharing image for V1; the Product Owner waived both on 2026-10-01. Revisit them only if V1 scope changes.

Document the creator, source, and usage rights for every non-original asset. For `docs/design-docs/batquai.avif`, the creator was not identified in the repository; the Product Owner confirmed project usage rights on 2026-10-01. This records the Product Owner's confirmation and is not an independent legal audit.

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

V1 social-sharing metadata can use the approved name and description without an image. The Product Owner waived the social-sharing image; F12-T11 records that exclusion.

## Rules

- Keep product naming independent from package identifiers.
- Use local or system typography for core V1 flows; bundle and self-host all approved fonts locally for offline-first PWA operation.
- Keep the existing Noto Serif brand-title treatment and Noto Sans interface stack defined in `docs/product-specs/ui-layout.md`.
- Do not require a remote font, icon CDN, or branding API.
- Keep logo text readable when the mark is hidden.
- Give decorative branding accessible treatment that does not pollute screen-reader output.
- Do not ship placeholder icons, placeholder copy, or development titles.
- Treat the selected bitmap as Product Owner-supplied artwork. Its use confirmation does not establish visual exclusivity, identify its creator, or replace the separate name and rights review before launch.

## Acceptance

- [ ] The approved public name and primary interface language are applied consistently in the release metadata.
- [ ] Browser tab, installed PWA, and app header use the approved identity. Social-sharing metadata does not require an image for V1.
- [ ] Required icon sizes pass manifest and install checks.
- [ ] Branding assets have documented usage rights.
- [ ] No provisional `LiuYao - Lục Hào` metadata remains unless it is approved as final.
