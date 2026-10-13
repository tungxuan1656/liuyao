#!/usr/bin/env bash
set -euo pipefail

cd -- "$(dirname -- "${BASH_SOURCE[0]}")"

run_check() {
  local name="$1"
  shift
  local status

  echo "RUN  [$name] $*"
  if "$@"; then
    echo "PASS [$name]"
  else
    status=$?
    echo "FAIL [$name] (exit $status)" >&2
    exit "$status"
  fi
}

run_check "format" pnpm format:check
run_check "lint" pnpm lint
run_check "TypeScript length" bash scripts/check_ts_length.sh
run_check "typecheck" pnpm typecheck
run_check "build" pnpm build
run_check "package exports" pnpm --dir apps/web run check:package-exports
run_check "tests" pnpm test

echo "=== Verification passed ==="
