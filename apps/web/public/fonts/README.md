# Bundled font assets

These fonts are self-hosted for offline use. The source files and licensing terms are from the Google Fonts repository at commit [`23e54b51ddffbc7713c583748e3bd86f62b1fa4a`](https://github.com/google/fonts/tree/23e54b51ddffbc7713c583748e3bd86f62b1fa4a). Each generated WOFF2 was built from that pinned upstream variable TTF using `fonttools` 4.66.0 and Brotli 1.2.0.

## Assets and subsets

| Asset                            | Use                                    | Subset / coverage                                                                                                                                                                                                  |   Bytes |
| -------------------------------- | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------: |
| `noto-serif-vietnamese.woff2`    | Noto Serif headings and hexagram names | Latin U+0020–U+024F; combining marks U+0300–U+036F, U+1AB0–U+1AFF, U+1DC0–U+1DFF; Latin Extended Additional U+1E00–U+1FFF where present upstream. Retains Vietnamese precomposed letters and combining-mark forms. | 247,752 |
| `noto-sans-vietnamese.woff2`     | Noto Sans body, data, and controls     | Same Latin and combining-mark ranges as Noto Serif.                                                                                                                                                                | 238,644 |
| `noto-serif-cjk-eight-han.woff2` | Noto Serif CJK heading fallback        | Exactly 乾坤震巽坎離艮兌 (U+4E7E, U+5764, U+9707, U+5DFD, U+574E, U+96E2, U+826E, U+514C).                                                                                                                         |   5,768 |
| `noto-sans-cjk-eight-han.woff2`  | Noto Sans CJK body/data fallback       | Exactly 乾坤震巽坎離艮兌 (eight Han characters).                                                                                                                                                                   |   4,572 |
| `cinzel-latin.woff2`             | Latin-only brand/decorative use        | Printable Latin codepoints U+0020–U+024F that exist in the upstream Cinzel font (299 encoded characters); no CJK subset.                                                                                           |  40,964 |

All five assets are WOFF2. The Noto CJK fonts contain all eight requested glyphs and no unrelated Han codepoints. The Vietnamese fonts retain both precomposed Vietnamese characters and combining marks (including U+0300, U+0301, U+0303, U+0309, U+0323, U+0302, U+0306, and U+031B).

## Provenance and licenses

| Font              | Pinned upstream source                                                                                                                                               | License                                     |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| Noto Sans         | [`ofl/notosans/NotoSans[wdth,wght].ttf`](https://github.com/google/fonts/blob/23e54b51ddffbc7713c583748e3bd86f62b1fa4a/ofl/notosans/NotoSans%5Bwdth,wght%5D.ttf)     | SIL Open Font License 1.1; `Noto-OFL.txt`   |
| Noto Serif        | [`ofl/notoserif/NotoSerif[wdth,wght].ttf`](https://github.com/google/fonts/blob/23e54b51ddffbc7713c583748e3bd86f62b1fa4a/ofl/notoserif/NotoSerif%5Bwdth,wght%5D.ttf) | SIL Open Font License 1.1; `Noto-OFL.txt`   |
| Noto Sans CJK SC  | [`ofl/notosanssc/NotoSansSC[wght].ttf`](https://github.com/google/fonts/blob/23e54b51ddffbc7713c583748e3bd86f62b1fa4a/ofl/notosanssc/NotoSansSC%5Bwght%5D.ttf)       | SIL Open Font License 1.1; `Noto-OFL.txt`   |
| Noto Serif CJK SC | [`ofl/notoserifsc/NotoSerifSC[wght].ttf`](https://github.com/google/fonts/blob/23e54b51ddffbc7713c583748e3bd86f62b1fa4a/ofl/notoserifsc/NotoSerifSC%5Bwght%5D.ttf)   | SIL Open Font License 1.1; `Noto-OFL.txt`   |
| Cinzel            | [`ofl/cinzel/Cinzel[wght].ttf`](https://github.com/google/fonts/blob/23e54b51ddffbc7713c583748e3bd86f62b1fa4a/ofl/cinzel/Cinzel%5Bwght%5D.ttf)                       | SIL Open Font License 1.1; `Cinzel-OFL.txt` |

`Cinzel` is subsetted, so to comply with the upstream OFL Reserved Font Name, its internal family/full/PostScript names were changed to **Liuyao Cinzel** / **Liuyao-Cinzel**. The CSS family alias below uses `Liuyao Cinzel`, not the reserved upstream name. License notices are included alongside the assets. `NOTICE.md` records the modifications and redistribution notices.

## Reproduction

With the pinned source files downloaded from the URLs above and FontTools/Brotli available, the WOFF2 subset conversion was performed with these settings (outputs are saved under this directory):

```sh
python3 -m pip install fonttools==4.66.0 brotli==1.2.0
pyftsubset NotoSerif.ttf --output-file=noto-serif-vietnamese.woff2 --flavor=woff2 --unicodes='U+0020-024F,U+0300-036F,U+1AB0-1AFF,U+1DC0-1DFF,U+1E00-1FFF' --layout-features='*'
pyftsubset NotoSans.ttf --output-file=noto-sans-vietnamese.woff2 --flavor=woff2 --unicodes='U+0020-024F,U+0300-036F,U+1AB0-1AFF,U+1DC0-1DFF,U+1E00-1FFF' --layout-features='*'
pyftsubset NotoSerifSC.ttf --output-file=noto-serif-cjk-eight-han.woff2 --flavor=woff2 --text='乾坤震巽坎離艮兌' --layout-features='*'
pyftsubset NotoSansSC.ttf --output-file=noto-sans-cjk-eight-han.woff2 --flavor=woff2 --text='乾坤震巽坎離艮兌' --layout-features='*'
pyftsubset Cinzel.ttf --output-file=cinzel-latin.woff2 --flavor=woff2 --unicodes='U+0020-024F' --layout-features='*'
```

For the final Cinzel build, the family/full/PostScript name records (IDs 1, 4, 6, 16, and 17) were additionally rewritten as described above after subsetting. Upstream variable TTF names in the URLs are given for provenance; use files downloaded from those exact pinned URLs as the `*.ttf` inputs in the commands.

## CSS integration instructions

Define the following local faces in `apps/web/src/index.css` (or its designated font stylesheet); these declarations are provided as integration guidance and are not duplicated in this asset-only change. Leave the Noto variable axes open for weight/width selection. Cinzel is deliberately registered under its renamed family alias.

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
  font-family: 'Noto Serif CJK';
  src: url('/fonts/noto-serif-cjk-eight-han.woff2') format('woff2');
  font-style: normal;
  font-weight: 100 900;
  font-display: swap;
  unicode-range: U+4E7E, U+5764, U+9707, U+5DFD, U+574E, U+96E2, U+826E, U+514C;
}
@font-face {
  font-family: 'Noto Sans CJK';
  src: url('/fonts/noto-sans-cjk-eight-han.woff2') format('woff2');
  font-style: normal;
  font-weight: 100 900;
  font-display: swap;
  unicode-range: U+4E7E, U+5764, U+9707, U+5DFD, U+574E, U+96E2, U+826E, U+514C;
}
@font-face {
  font-family: 'Liuyao Cinzel';
  src: url('/fonts/cinzel-latin.woff2') format('woff2');
  font-style: normal;
  font-weight: 400 900;
  font-display: swap;
}
```
