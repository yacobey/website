#!/usr/bin/env bash
# check_filter.sh — Extracted per-job filter logic from .github/workflows/security.yml
#
# Inputs (environment variables):
#   NPM_RESULT        — result of the npm-audit job (e.g. "failure", "success")
#   CODEQL_RESULT     — result of the codeql job    (e.g. "failure", "success")
#   FILTER_JOBS       — value of SECURITY_SUMMARY_FILTER_JOBS variable (may be empty)
#   ON_FAILURE_ONLY   — value of SECURITY_SUMMARY_ON_FAILURE_ONLY variable (may be empty)
#
# Exit codes:
#   0 — email should be sent (filter did not skip)
#   1 — email should be SKIPPED (filter triggered a skip)
#
# This script must be kept in sync with the "Build history, send summary email…"
# step in .github/workflows/security.yml (the block at lines ~105-133).

set -euo pipefail

: "${NPM_RESULT:=success}"
: "${CODEQL_RESULT:=success}"
: "${FILTER_JOBS:=}"
: "${ON_FAILURE_ONLY:=}"

if [ "$NPM_RESULT" = "failure" ] || [ "$CODEQL_RESULT" = "failure" ]; then
  OVERALL="FAILED"
else
  OVERALL="PASSED"
fi

if [ -n "$FILTER_JOBS" ]; then
  FILTER_TRIGGERED=0
  IFS=',' read -ra FILTER_LIST <<< "$FILTER_JOBS"
  for job_name in "${FILTER_LIST[@]}"; do
    trimmed_job="$(echo "$job_name" | xargs)"
    if [ "$trimmed_job" = "npm-audit" ] && [ "$NPM_RESULT" = "failure" ]; then
      FILTER_TRIGGERED=1
    fi
    if [ "$trimmed_job" = "codeql" ] && [ "$CODEQL_RESULT" = "failure" ]; then
      FILTER_TRIGGERED=1
    fi
  done
  if [ "$FILTER_TRIGGERED" -eq 0 ]; then
    echo "SECURITY_SUMMARY_FILTER_JOBS is set but none of the listed jobs failed — skipping summary email."
    exit 1
  fi
else
  if [ "$ON_FAILURE_ONLY" = "true" ] && [ "$OVERALL" = "PASSED" ]; then
    echo "SECURITY_SUMMARY_ON_FAILURE_ONLY is true and all scans passed — skipping summary email."
    exit 1
  fi
fi

exit 0
