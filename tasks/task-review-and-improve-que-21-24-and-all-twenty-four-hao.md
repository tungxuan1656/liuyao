# task-review-and-improve-que-21-24-and-all-twenty-four-hao - Review and improve quẻ 21–24 and all twenty-four hào

- Status: done
- Owner: Product Owner (repository maintainer); implementation assigned on selection
- Required to start: [task-implement-versioned-audit-ledgers-and-completion-gates](task-implement-versioned-audit-ledgers-and-completion-gates.md), [task-reviewed-knowledge-batch-ten](task-reviewed-knowledge-batch-ten.md)
- Required to integrate/release: no additional gate recorded; see acceptance

## Goal

Improve each quẻ and position as readable source-backed knowledge.

## Scope

**Intended work:**

- 21 Hỏa Lôi Phệ Hạp; 22 Sơn Hỏa Bí; 23 Sơn Địa Bác; 24 Địa Lôi Phục.
- Each line checkbox requires a useful explanation with relevant sources and meaningful author differences.
- Use a concise content checklist; follow the simplified knowledge model.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [x] 21 · Sơ (1).
- [x] 21 · Nhị (2).
- [x] 21 · Tam (3).
- [x] 21 · Tứ (4).
- [x] 21 · Ngũ (5).
- [x] 21 · Thượng (6).
- [x] 22 · Sơ (1).
- [x] 22 · Nhị (2).
- [x] 22 · Tam (3).
- [x] 22 · Tứ (4).
- [x] 22 · Ngũ (5).
- [x] 22 · Thượng (6).
- [x] 23 · Sơ (1).
- [x] 23 · Nhị (2).
- [x] 23 · Tam (3).
- [x] 23 · Tứ (4).
- [x] 23 · Ngũ (5).
- [x] 23 · Thượng (6).
- [x] 24 · Sơ (1).
- [x] 24 · Nhị (2).
- [x] 24 · Tam (3).
- [x] 24 · Tứ (4).
- [x] 24 · Ngũ (5).
- [x] 24 · Thượng (6).
- [x] All four names, aliases, structures, overviews, Thoán/Tượng, notes, and author layers pass.
- [x] Inspect full passages/images; review each source error and exclusion.
- [x] Useful explanations have correct book/page references; material unresolved readings remain explicit.
- [x] Required verification passes; evidence and handoff are recorded.

## Relevant docs

[Content](../docs/product-specs/knowledge-content.md), [quality](../docs/product-specs/knowledge-quality.md),
[batch policy](../docs/product-specs/knowledge-quality.md#hexagram-review-batches),
[model](../docs/design-docs/knowledge-model.md), [sources](../docs/references/book-sources.md),
[licensing](../LICENSING.md), [verification](../docs/development.md).

## Plan

1. Four parallel writers, one per quẻ file, with per-entry provenance tables and no length target.
2. Round 1 exhaustive review across all attributed entries against source texts.
3. Round 2 verification of corrections and high-risk passages.
4. Leader runs shared validation, verifies any image-dependent notes, and records evidence.

## Verify

Executed on the reviewed content:

- `./init.sh` → `=== Verification passed ===` — 181 core tests, 97 knowledge tests.
- `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check` → `Knowledge: 381 records; 381
ready; 4 supplied books. Structural links and source pages valid.`
- Structure comparison against baseline `b9d306d`: all four records keep id, type, title, aliases,
  topicIds, relatedIds, kingWenNumber, trigram ids and `status: "ready"`; all 24 `(position, polarity,
label)` tuples unchanged; every reference keeps the `{sourceId, pdfPages: [start, end]}` shape (plus
  optional `section`/`printedPages`) with ascending pages. The only intended count change is quẻ 21's
  overview 4 → 5 (its missing Chu Hy layer); quẻ 21 lines 20 / notes 2, quẻ 22 5/20/1, quẻ 23 4/18/2,
  quẻ 24 5/19/4 all unchanged.
- Review rounds: 1 exhaustive (workflow `ce9cd57b`: `ca41f091`, `c2dbbff3`, `2af55256`, `36ab08e4`) →
  **FAIL 13 findings (11 P1 + 2 P2)**; 2 verification of those corrections (workflow `aba44837`:
  `18162c40`, `b3246efd`, `c31daf4a`, `359c0b7e`) → **PASS 0 residual findings** on all four quẻ.
- PDF images: 10 notes assert something about a printed page, which no reviewer child can check. The
  Leader rendered those pages directly from the supplied PDFs with PyMuPDF (200 dpi crops) and read
  them; all ten held — NHL 94 and NTT 420 print `Cấn`; NTT 425 reproduces `初九:不遠復,無祗悔,元吉` with
  the `元吉` repetition; NTT 426 prints `lớn`; NTT 431 chú thích [1] prints `Chữ 後 (Phục) nghĩa là trở
lại`; NHL 206 Thoán truyện prints `ngoại quái là Chấn có nghĩa là ngưng`; NTT 418 chú thích [1] prints
  `Chữ 利 (Bác)`; PBC 235 prints `công việc Cửu Ngũ làm được đúng`; NTT 383 prints `trên động dưới sáng,
dưới sấm trên chớp`; NHL 203 prints `quẻ Búi`.
- Independent final review of frozen `b71bb93` (workflow `fa127fdb`: content `15018001`, record audit
  `49458f29`) → **FAIL 1 P2 + 3 unsupported claims**. The content reviewer confirmed all 13 corrections,
  re-checked 19 entries that both earlier rounds had passed, and inspected all 10 page crops; its P2 was
  that quẻ 21 alone still carried 20 copy-pasted `condition` disclaimers the other three records no
  longer used. The record auditor found three unsupported claims in this file: `104 attributed entries`
  (the records hold 105 entries, 92 with a named author), the quẻ 23 `condition` pointer (`lines[5]`,
  actually `lines[4]`), and `zero condition keys remain`. All four were corrected after the freeze, in
  the fix commit that carries this sentence and the 20 removed `condition` lines.

### Reproduce the 10 PDF-page image checks

The earlier review's `$W/images/*.png` crops were temporary, not committed evidence.
The source catalog at `packages/knowledge/data/sources.json` contains the local PDF
paths, SHA-256 fingerprints, and page counts for the supplied editions. Recreate the
page images **locally** from the repo root with the same PDFs (PDF page numbers are
one-based and include covers). PyMuPDF is required: `python -m pip install pymupdf`.

The 10 inspected locations are: NHL 94, 203, 206; PBC 235; and NTT 383,
418, 420, 425, 426, 431. Their corresponding claims are in the `notes` of
`hexagram-21.json` through `hexagram-24.json` and in the PDF images bullet above.

```bash
python - <<'PY'
import hashlib
import json
import tempfile
from pathlib import Path

import fitz  # PyMuPDF

catalog = json.loads(Path("packages/knowledge/data/sources.json").read_text(encoding="utf-8"))
editions = {source["id"]: source["editions"][0] for source in catalog["sources"]}
pages = {
    "source-book-nhl": [94, 203, 206],
    "source-book-pbc": [235],
    "source-book-ntt": [383, 418, 420, 425, 426, 431],
}
out = Path(tempfile.mkdtemp(prefix="liuyao-task-review-and-improve-que-21-24-and-all-twenty-four-hao-pdf-"))
for source_id, page_numbers in pages.items():
    edition = editions[source_id]
    pdf_path = Path(edition["localInputPath"])
    if not pdf_path.is_file():
        raise FileNotFoundError(f"Supply the licensed research PDF at {pdf_path}")
    if hashlib.sha256(pdf_path.read_bytes()).hexdigest() != edition["sha256"]:
        raise ValueError(f"PDF fingerprint mismatch: {pdf_path}")
    with fitz.open(pdf_path) as pdf:
        if len(pdf) != edition["pdfPageCount"]:
            raise ValueError(f"PDF page count mismatch: {pdf_path}")
        for page_number in page_numbers:
            if not 1 <= page_number <= len(pdf):
                raise ValueError(f"Invalid PDF page: {source_id} {page_number}")
            dest = out / f"{source_id}-pdf-{page_number:03d}.png"
            pdf[page_number - 1].get_pixmap(dpi=200, alpha=False).save(str(dest))
print(f"Visually inspect the 10 PNGs in: {out}")
PY
```

This reproduces the page images, **not** the original review verdict. A reviewer
must inspect each rendered page against the corresponding `notes` claim and
record any disagreement. Neither the books nor derived page screenshots belong
in the public repository.

## Handoff

- Evidence: inherited completion and any later superseding follow-ups below; not re-executed by this migration.
- Blockers and next action: preserve the final inherited handoff, including delivery caveats; do not restart completed work automatically.

### Inherited handoff and follow-ups (historical evidence)

- Historical state: done — merged into `main` in PR #105.
- Evidence: PR #105 (merge commit `cc68182ccfe2487ff7eb105db96ffd2b79a23c68`); see Verify above
  for the reviewed source passages, checks, and corrected findings. The ten PDF-page images
  can be regenerated using the instructions above.
- Blockers: none.
- Limits: reviewer children could not render PDF page images; the ten image-dependent claims were
  inspected by the Leader and remain manual visual checks. `pack/hexagram-24.md` omitted NHL 94
  and PBC 244–247, so reviewers read `$W/pdftext/*.txt` directly.
- Dependencies: See [frozen index](../tasks/index.md).
- Next: hand off to task-review-and-improve-que-25-28-and-all-twenty-four-hao (quẻ 25–28) when scheduled.
