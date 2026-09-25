#!/usr/bin/env bash
set -euo pipefail

pr_number="${1:-}"
if [ -z "$pr_number" ]; then
  read -r -p "Enter pull request number: " pr_number
fi

gh api "repos/{owner}/{repo}/pulls/$pr_number/comments" | jq --arg user "${GH_USER:-}" '[ .[] | select(.user.type == "User" and (.user.login == $user or $user == "")) | { diff_hunk, line, start_line, body } ]'
