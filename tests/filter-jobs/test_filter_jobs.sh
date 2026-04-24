#!/usr/bin/env bash
# test_filter_jobs.sh — Plain-shell tests for the SECURITY_SUMMARY_FILTER_JOBS logic.
#
# Each test calls check_filter.sh with specific env vars and asserts the exit code:
#   0 = email should be sent
#   1 = email should be skipped
#
# Run with:  bash tests/filter-jobs/test_filter_jobs.sh

set -uo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
FILTER_SCRIPT="$SCRIPT_DIR/check_filter.sh"

PASS=0
FAIL=0

run_test() {
  local description="$1"
  local expected_exit="$2"
  shift 2
  # remaining args are NAME=VALUE env overrides

  local actual_exit=0
  env -i PATH="$PATH" HOME="$HOME" "$@" bash "$FILTER_SCRIPT" > /dev/null 2>&1 || actual_exit=$?

  if [ "$actual_exit" -eq "$expected_exit" ]; then
    echo "  PASS  $description"
    PASS=$((PASS + 1))
  else
    echo "  FAIL  $description"
    echo "        expected exit $expected_exit, got $actual_exit"
    FAIL=$((FAIL + 1))
  fi
}

echo "=== SECURITY_SUMMARY_FILTER_JOBS filter logic tests ==="
echo ""

# ── No filter set: fall-through behaviour ──────────────────────────────────────

echo "-- FILTER_JOBS unset (fall-through) --"

run_test "no filter, both pass → sends email (exit 0)" 0 \
  NPM_RESULT=success CODEQL_RESULT=success FILTER_JOBS= ON_FAILURE_ONLY=

run_test "no filter, npm-audit fails → sends email (exit 0)" 0 \
  NPM_RESULT=failure CODEQL_RESULT=success FILTER_JOBS= ON_FAILURE_ONLY=

run_test "no filter, codeql fails → sends email (exit 0)" 0 \
  NPM_RESULT=success CODEQL_RESULT=failure FILTER_JOBS= ON_FAILURE_ONLY=

run_test "no filter, both fail → sends email (exit 0)" 0 \
  NPM_RESULT=failure CODEQL_RESULT=failure FILTER_JOBS= ON_FAILURE_ONLY=

echo ""

# ── ON_FAILURE_ONLY behaviour (no filter set) ──────────────────────────────────

echo "-- ON_FAILURE_ONLY=true (no FILTER_JOBS) --"

run_test "ON_FAILURE_ONLY=true, both pass → skips email (exit 1)" 1 \
  NPM_RESULT=success CODEQL_RESULT=success FILTER_JOBS= ON_FAILURE_ONLY=true

run_test "ON_FAILURE_ONLY=true, npm-audit fails → sends email (exit 0)" 0 \
  NPM_RESULT=failure CODEQL_RESULT=success FILTER_JOBS= ON_FAILURE_ONLY=true

run_test "ON_FAILURE_ONLY=true, codeql fails → sends email (exit 0)" 0 \
  NPM_RESULT=success CODEQL_RESULT=failure FILTER_JOBS= ON_FAILURE_ONLY=true

run_test "ON_FAILURE_ONLY=false, both pass → sends email (exit 0)" 0 \
  NPM_RESULT=success CODEQL_RESULT=success FILTER_JOBS= ON_FAILURE_ONLY=false

echo ""

# ── FILTER_JOBS=npm-audit only ─────────────────────────────────────────────────

echo "-- FILTER_JOBS=npm-audit --"

run_test "npm-audit in filter, npm-audit fails → sends email (exit 0)" 0 \
  NPM_RESULT=failure CODEQL_RESULT=success FILTER_JOBS=npm-audit ON_FAILURE_ONLY=

run_test "npm-audit in filter, npm-audit passes → skips email (exit 1)" 1 \
  NPM_RESULT=success CODEQL_RESULT=success FILTER_JOBS=npm-audit ON_FAILURE_ONLY=

run_test "npm-audit in filter, codeql fails but npm-audit passes → skips email (exit 1)" 1 \
  NPM_RESULT=success CODEQL_RESULT=failure FILTER_JOBS=npm-audit ON_FAILURE_ONLY=

run_test "npm-audit in filter, both fail → sends email (exit 0)" 0 \
  NPM_RESULT=failure CODEQL_RESULT=failure FILTER_JOBS=npm-audit ON_FAILURE_ONLY=

echo ""

# ── FILTER_JOBS=codeql only ────────────────────────────────────────────────────

echo "-- FILTER_JOBS=codeql --"

run_test "codeql in filter, codeql fails → sends email (exit 0)" 0 \
  NPM_RESULT=success CODEQL_RESULT=failure FILTER_JOBS=codeql ON_FAILURE_ONLY=

run_test "codeql in filter, codeql passes → skips email (exit 1)" 1 \
  NPM_RESULT=success CODEQL_RESULT=success FILTER_JOBS=codeql ON_FAILURE_ONLY=

run_test "codeql in filter, npm-audit fails but codeql passes → skips email (exit 1)" 1 \
  NPM_RESULT=failure CODEQL_RESULT=success FILTER_JOBS=codeql ON_FAILURE_ONLY=

run_test "codeql in filter, both fail → sends email (exit 0)" 0 \
  NPM_RESULT=failure CODEQL_RESULT=failure FILTER_JOBS=codeql ON_FAILURE_ONLY=

echo ""

# ── FILTER_JOBS=npm-audit,codeql (both listed) ─────────────────────────────────

echo "-- FILTER_JOBS=npm-audit,codeql --"

run_test "both listed, neither fails → skips email (exit 1)" 1 \
  NPM_RESULT=success CODEQL_RESULT=success FILTER_JOBS=npm-audit,codeql ON_FAILURE_ONLY=

run_test "both listed, npm-audit fails only → sends email (exit 0)" 0 \
  NPM_RESULT=failure CODEQL_RESULT=success FILTER_JOBS=npm-audit,codeql ON_FAILURE_ONLY=

run_test "both listed, codeql fails only → sends email (exit 0)" 0 \
  NPM_RESULT=success CODEQL_RESULT=failure FILTER_JOBS=npm-audit,codeql ON_FAILURE_ONLY=

run_test "both listed, both fail → sends email (exit 0)" 0 \
  NPM_RESULT=failure CODEQL_RESULT=failure FILTER_JOBS=npm-audit,codeql ON_FAILURE_ONLY=

echo ""

# ── Unlisted job name ──────────────────────────────────────────────────────────

echo "-- FILTER_JOBS=unknown-job (not a recognised job name) --"

run_test "unknown job listed, npm-audit fails → skips email (unlisted, exit 1)" 1 \
  NPM_RESULT=failure CODEQL_RESULT=success FILTER_JOBS=unknown-job ON_FAILURE_ONLY=

run_test "unknown job listed, codeql fails → skips email (unlisted, exit 1)" 1 \
  NPM_RESULT=success CODEQL_RESULT=failure FILTER_JOBS=unknown-job ON_FAILURE_ONLY=

run_test "unknown job listed, both fail → skips email (unlisted, exit 1)" 1 \
  NPM_RESULT=failure CODEQL_RESULT=failure FILTER_JOBS=unknown-job ON_FAILURE_ONLY=

echo ""

# ── Whitespace trimming ────────────────────────────────────────────────────────

echo "-- Whitespace trimming in FILTER_JOBS --"

run_test "spaces around job name ' npm-audit ', npm-audit fails → sends email (exit 0)" 0 \
  NPM_RESULT=failure CODEQL_RESULT=success "FILTER_JOBS= npm-audit " ON_FAILURE_ONLY=

run_test "spaces in list ' npm-audit , codeql ', codeql fails → sends email (exit 0)" 0 \
  NPM_RESULT=success CODEQL_RESULT=failure "FILTER_JOBS= npm-audit , codeql " ON_FAILURE_ONLY=

run_test "spaces in list ' npm-audit , codeql ', neither fails → skips email (exit 1)" 1 \
  NPM_RESULT=success CODEQL_RESULT=success "FILTER_JOBS= npm-audit , codeql " ON_FAILURE_ONLY=

echo ""

# ── FILTER_JOBS takes precedence over ON_FAILURE_ONLY ─────────────────────────

echo "-- FILTER_JOBS takes precedence over ON_FAILURE_ONLY --"

run_test "FILTER_JOBS=npm-audit + ON_FAILURE_ONLY=true, npm-audit fails → sends email (exit 0)" 0 \
  NPM_RESULT=failure CODEQL_RESULT=success FILTER_JOBS=npm-audit ON_FAILURE_ONLY=true

run_test "FILTER_JOBS=npm-audit + ON_FAILURE_ONLY=true, npm-audit passes → skips via filter (exit 1)" 1 \
  NPM_RESULT=success CODEQL_RESULT=success FILTER_JOBS=npm-audit ON_FAILURE_ONLY=true

echo ""

# ── Summary ───────────────────────────────────────────────────────────────────

TOTAL=$((PASS + FAIL))
echo "=== Results: $PASS/$TOTAL passed ==="

if [ "$FAIL" -gt 0 ]; then
  echo "FAILED: $FAIL test(s) did not pass."
  exit 1
fi

echo "All tests passed."
exit 0
