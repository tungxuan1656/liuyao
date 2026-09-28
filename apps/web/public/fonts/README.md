# Bundled font assets

These fonts are self-hosted for offline use. The source files and licensing terms are from the Google Fonts repository at commit [`23e54b51ddffbc7713c583748e3bd86f62b1fa4a`](https://github.com/google/fonts/tree/23e54b51ddffbc7713c583748e3bd86f62b1fa4a). Each generated WOFF2 was built from that pinned upstream variable TTF using `fonttools` 4.66.0 and Brotli 1.2.0.

## Assets and subsets

| Asset                         | Use                                    | Subset / coverage                                                                                                                                                                                                  |   Bytes |
| ----------------------------- | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------: |
| `noto-serif-vietnamese.woff2` | Noto Serif headings and hexagram names | Latin U+0020–U+024F; combining marks U+0300–U+036F, U+1AB0–U+1AFF, U+1DC0–U+1DFF; Latin Extended Additional U+1E00–U+1FFF where present upstream. Retains Vietnamese precomposed letters and combining-mark forms. | 247,752 |
| `noto-sans-vietnamese.woff2`  | Noto Sans body, data, and controls     | Same Latin and combining-mark ranges as Noto Serif.                                                                                                                                                                | 238,644 |
| `cinzel-latin.woff2`          | Latin-only brand/decorative use        | Printable Latin codepoints U+0020–U+024F that exist in the upstream Cinzel font (299 encoded characters); no CJK subset.                                                                                           |  40,964 |

All three shipped font assets are WOFF2. The Vietnamese Noto fonts retain both precomposed Vietnamese letters and combining marks (including U+0300, U+0301, U+0303, U+0309, U+0323, U+0306, and U+031B). No CJK-only font is needed because the user-facing product and knowledge catalog use Vietnamese without Han characters.

## Provenance and licenses

| Font       | Pinned upstream source                                                                                                                                               | License                                     |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| Noto Sans  | [`ofl/notosans/NotoSans[wdth,wght].ttf`](https://github.com/google/fonts/blob/23e54b51ddffbc7713c583748e3bd86f62b1fa4a/ofl/notosans/NotoSans%5Bwdth,wght%5D.ttf)     | SIL Open Font License 1.1; `Noto-OFL.txt`   |
| Noto Serif | [`ofl/notoserif/NotoSerif[wdth,wght].ttf`](https://github.com/google/fonts/blob/23e54b51ddffbc7713c583748e3bd86f62b1fa4a/ofl/notoserif/NotoSerif%5Bwdth,wght%5D.ttf) | SIL Open Font License 1.1; `Noto-OFL.txt`   |
| Cinzel     | [`ofl/cinzel/Cinzel[wght].ttf`](https://github.com/google/fonts/blob/23e54b51ddffbc7713c583748e3bd86f62b1fa4a/ofl/cinzel/Cinzel%5Bwght%5D.ttf)                       | SIL Open Font License 1.1; `Cinzel-OFL.txt` |

`Cinzel` is subsetted, so to comply with the upstream OFL Reserved Font Name, its internal family/full/PostScript names were changed to **Liuyao Cinzel** / **Liuyao-Cinzel**. The CSS family alias uses `Liuyao Cinzel`, not the reserved upstream name. License notices are included alongside the assets. `NOTICE.md` records the modifications and redistribution notices.

## Reproduction

The Vietnamese Noto and Cinzel assets were subset from the pinned upstream commit with these settings:

```sh
pyftsubset NotoSerif.ttf --output-file=noto-serif-vietnamese.woff2 --flavor=woff2 --unicodes='U+0020-024F,U+0300-036F,U+1AB0-1AFF,U+1DC0-1DFF,U+1E00-1FFF' --layout-features='*'
pyftsubset NotoSans.ttf --output-file=noto-sans-vietnamese.woff2 --flavor=woff2 --unicodes='U+0020-024F,U+0300-036F,U+1AB0-1AFF,U+1DC0-1DFF,U+1E00-1FFF' --layout-features='*'
pyftsubset Cinzel.ttf --output-file=cinzel-latin.woff2 --flavor=woff2 --unicodes='U+0020-024F' --layout-features='*'
```

For the final Cinzel build, the family/full/PostScript name records (IDs 1, 4, 6, 16, and 17) were additionally rewritten as described above after subsetting. Upstream variable TTF names in the URLs are given for provenance; use files downloaded from those exact pinned URLs as the `*.ttf` inputs.

## CSS integration

Noto variable axes stay open for weight and width selection. Cinzel is registered under its renamed family alias.

```css
@font-face {
  font-family: 'Noto Serif';
  src: url('/fonts/noto-serif-vietnamese.woff2') format('woff2');
  font-style: normal;
  font-weight: 100 900;
  font-display: swap;
}
@font-face {
  font-family: 'Noto Sans';
  src: url('/fonts/noto-sans-vietnamese.woff2') format('woff2');
  font-style: normal;
  font-weight: 100 900;
  font-display: swap;
}
@font-face {
  font-family: 'Liuyao Cinzel';
  src: url('/fonts/cinzel-latin.woff2') format('woff2');
  font-style: normal;
  font-weight: 400 900;
  font-display: swap;
}
```
