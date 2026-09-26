#!/usr/bin/env bash
set -o pipefail

MAX_JOBS="${HARNESS_JOBS:-4}"
STATUS=0

FORMAT_TASKS=(
  "pnpm format"
)

LINT_TASKS=(
  "pnpm exec eslint . --fix && bash scripts/check_ts_length.sh"
)

BUILD_TASKS=(
  "pnpm build"
)

TYPECHECK_TASKS=(
  "pnpm typecheck"
)

PACKAGE_EXPORT_TASKS=(
  "pnpm --dir apps/web run check:package-exports"
)

TEST_TASKS=(
  "pnpm test"
)

if ! [[ "$MAX_JOBS" =~ ^[1-9][0-9]*$ ]]; then
  echo "FAIL HARNESS_JOBS must be a positive integer" >&2
  exit 2
fi

if [ "${#BUILD_TASKS[@]}" -eq 0 ] && [ "${#TEST_TASKS[@]}" -eq 0 ]; then
  echo "FAIL init.sh not configured: no build or test task" >&2
  exit 2
fi

run_task() {
  local phase="$1"
  local command="$2"

  echo "RUN  [$phase] $command"
  if bash -c "$command"; then
    echo "PASS [$phase] $command"
    return 0
  fi

  echo "FAIL [$phase] $command" >&2
  return 1
}

run_parallel() {
  local phase="$1"
  shift

  if [ "$#" -eq 0 ]; then
    echo "SKIP [$phase] no task configured"
    return 0
  fi

  local command
  local pid
  local phase_status=0
  local -a pids=()

  for command in "$@"; do
    run_task "$phase" "$command" &
    pids+=("$!")

    if [ "${#pids[@]}" -ge "$MAX_JOBS" ]; then
      for pid in "${pids[@]}"; do
        wait "$pid" || { STATUS=1; phase_status=1; }
      done
      pids=()
    fi
  done

  for pid in "${pids[@]}"; do
    wait "$pid" || { STATUS=1; phase_status=1; }
  done

  return "$phase_status"
}

echo "=== Format ==="
run_parallel "format" "${FORMAT_TASKS[@]}"

echo "=== Lint ==="
run_parallel "lint" "${LINT_TASKS[@]}"

echo "=== Build ==="
BUILD_STATUS=0
run_parallel "build" "${BUILD_TASKS[@]}" || BUILD_STATUS=$?

if [ "$BUILD_STATUS" -eq 0 ]; then
  echo "=== Typecheck ==="
  run_parallel "typecheck" "${TYPECHECK_TASKS[@]}" || true

  echo "=== Package exports ==="
  run_parallel "package exports" "${PACKAGE_EXPORT_TASKS[@]}" || true
else
  echo "SKIP [typecheck] workspace build failed" >&2
  echo "SKIP [package exports] workspace build failed" >&2
  STATUS=1
fi

echo "=== Test ==="
run_parallel "test" "${TEST_TASKS[@]}" || true

if [ "$STATUS" -ne 0 ]; then
  echo "=== Verification failed ===" >&2
  exit "$STATUS"
fi

echo "=== Verification passed ==="
