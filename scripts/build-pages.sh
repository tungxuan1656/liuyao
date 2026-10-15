#!/usr/bin/env bash
set -euo pipefail

cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.."
: "${CF_PAGES_BRANCH:?Set by Cloudflare Pages for Git builds}"
: "${CF_PAGES_COMMIT_SHA:?Set by Cloudflare Pages for Git builds}"

export DEPLOY_ENV=preview
if [[ "$CF_PAGES_BRANCH" == main ]]; then
  export DEPLOY_ENV=production
fi

./init.sh
test -z "$(git status --porcelain)"

# A slow or retried old main build must not replace a newer revision.
if [[ "$CF_PAGES_BRANCH" == main ]]; then
  latest=$(git ls-remote origin refs/heads/main | cut -f1)
  test "$latest" = "$CF_PAGES_COMMIT_SHA"
fi
