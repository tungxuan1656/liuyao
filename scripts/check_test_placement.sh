#!/usr/bin/env bash
set -euo pipefail

if [ ! -d apps ]; then
  echo "PASS no apps directory to inspect"
  exit 0
fi

violations=()
while IFS= read -r line; do
  [ -n "$line" ] && violations+=("$line")
done < <(
  find apps \
    \( -type d \( -name tests -o -name __tests__ \) \
    -o -type f \( -name '*.test.*' -o -name '*.spec.*' \) \) \
    -print
)

if [ "${#violations[@]}" -gt 0 ]; then
  echo "FAIL application-owned tests are not allowed; move reusable tests into packages/*/tests:" >&2
  printf '  %s\n' "${violations[@]}" >&2
  exit 1
fi

echo "PASS test placement"
