# Product identity

This document owns the public V1 product identity and release assets.

## Release decisions

The Product Owner approved **Lục Hào** as the final public product name on 2026-09-27 and approved **Lục Hào** as the PWA short name on 2026-10-01. The approved one-sentence description is **“Lập quẻ, tra cứu và lưu kết quả Lục Hào ngay trên thiết bị của bạn.”** On 2026-09-28, the Product Owner approved Vietnamese as the only user-facing language, including the knowledge catalog, with no Han characters displayed. `docs/product-specs/vietnamese-language.md` owns the language and terminology rules.

On 2026-10-01, the Product Owner selected `docs/design-docs/batquai.avif` for the Lục Hào mark and header artwork. Use the supplied artwork as-is: do not redraw, trace, crop, or remove its bagua. The product preview is `previews/feat-013-logo-preview.html`. Product Owner confirmed project usage rights for this asset on 2026-10-01; this is not an independent legal audit. The artwork is a bitmap, so an editable vector master is not available and remains an open requirement. The tagline remains undecided. Final terminology review, theme/background-color approval, and social-sharing assets also remain pending. Existing light and dark application themes and typography are unchanged.

The Product Owner must approve these remaining decisions before production launch:

- final terminology and copy review (see `docs/product-specs/vietnamese-language.md`);
- tagline, if used;
- editable vector master;
- social-sharing image.

The selected icon is black-and-white artwork on white. Its generated square maskable icon uses 45% padding so the full supplied composition fits inside the 80% circular maskable safe zone. The existing app theme colors remain unchanged and require Product Owner approval before launch.

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
- [ ] Browser tab, installed PWA, app header, and social preview use the same identity.
- [ ] Required icon sizes pass manifest and install checks.
- [ ] Branding assets have documented usage rights.
- [ ] No provisional `LiuYao - Lục Hào` metadata remains unless it is approved as final.
