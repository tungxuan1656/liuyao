from pathlib import Path

from fontTools.ttLib import TTFont


PROJECT_ROOT = Path(__file__).resolve().parents[3]
FONT_DIRECTORY = PROJECT_ROOT / "apps/web/public/fonts"
COVERAGE_MANIFEST = FONT_DIRECTORY / "cjk-coverage.txt"
FONT_FILES = (
    "noto-serif-cjk-app.woff2",
    "noto-sans-cjk-app.woff2",
)


def main() -> None:
    characters = COVERAGE_MANIFEST.read_text(encoding="utf-8")
    required = {ord(character) for character in characters}
    if len(required) != len(characters):
        raise SystemExit(f"{COVERAGE_MANIFEST} contains duplicate codepoints")

    for filename in FONT_FILES:
        font_path = FONT_DIRECTORY / filename
        with TTFont(font_path) as font:
            actual = set(font.getBestCmap() or {})

        missing = required - actual
        extra = actual - required
        if missing or extra:
            raise SystemExit(
                f"{filename}: missing={[f'U+{codepoint:04X}' for codepoint in sorted(missing)]}, "
                f"extra={[f'U+{codepoint:04X}' for codepoint in sorted(extra)]}"
            )

        print(f"PASS {filename}: {len(actual)} exact manifest codepoints")


if __name__ == "__main__":
    main()
