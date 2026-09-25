#!/usr/bin/env bash
set -euo pipefail

base_sha="${1:-${GITHUB_BASE_SHA:-}}"
head_sha="${2:-${GITHUB_HEAD_SHA:-}}"

if [ -z "$base_sha" ] || [ -z "$head_sha" ]; then
  echo "Usage: detect_ci_scope.sh <base-sha> <head-sha>" >&2
  exit 1
fi

web=false
core=false
knowledge=false
shared=false
lockfile_changed=false

while IFS= read -r file; do
  [ -z "$file" ] && continue

  case "$file" in
    apps/web/*)
      web=true
      ;;
    packages/liuyao-core/*)
      core=true
      web=true
      ;;
    packages/knowledge/*)
      knowledge=true
      web=true
      ;;
    package.json|pnpm-workspace.yaml|tsconfig.base.json|eslint.config.js|.prettierrc|.lintstagedrc.cjs|commitlint.config.cjs|scripts/*|.github/*)
      shared=true
      web=true
      core=true
      knowledge=true
      ;;
    pnpm-lock.yaml)
      lockfile_changed=true
      ;;
  esac
done < <(git diff --name-only --diff-filter=ACDMRTUXB "$base_sha" "$head_sha")

if [ "$lockfile_changed" = true ]; then
  lock_diff=$(git diff --unified=0 --no-color "$base_sha" "$head_sha" -- pnpm-lock.yaml || true)

  if grep -qE '^[+-][[:space:]]{2}apps/web:' <<<"$lock_diff"; then
    web=true
  fi

  if grep -qE '^[+-][[:space:]]{2}packages/liuyao-core:' <<<"$lock_diff"; then
    core=true
    web=true
  fi

  if grep -qE '^[+-][[:space:]]{2}packages/knowledge:' <<<"$lock_diff"; then
    knowledge=true
    web=true
  fi

  if grep -qE '^[+-][[:space:]]{2}\.:' <<<"$lock_diff"; then
    shared=true
    web=true
    core=true
    knowledge=true
  fi

  if [ "$web" = false ] && [ "$core" = false ] && [ "$knowledge" = false ] && [ "$shared" = false ]; then
    shared=true
    web=true
    core=true
    knowledge=true
  fi
fi

if [ -n "${GITHUB_OUTPUT:-}" ]; then
  {
    echo "web=$web"
    echo "core=$core"
    echo "knowledge=$knowledge"
    echo "shared=$shared"
  } >>"$GITHUB_OUTPUT"
else
  echo "Scope detection result:"
  echo "  web=$web"
  echo "  core=$core"
  echo "  knowledge=$knowledge"
  echo "  shared=$shared"
fi
