#!/usr/bin/env bash
# Tests for the scan-history build logic used in the send-scan-summary job
# of .github/workflows/security.yml (lines 98-123).
#
# Scenarios covered:
#   1. First run  — no prior history file; entry is created correctly.
#   2. Sixth run  — after 5 existing entries, the oldest is dropped and only 5 remain.
#   3. Failed run — a failure result mid-history renders the ❌ icon in the trend section.
#
# Usage:  bash .github/scripts/test-scan-history.sh
# Exit code: 0 = all tests passed, non-zero = at least one test failed.

set -euo pipefail

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

PASS=0
FAIL=0

pass() { echo "  PASS: $1"; PASS=$((PASS + 1)); }
fail() { echo "  FAIL: $1"; FAIL=$((FAIL + 1)); }

assert_equals() {
  local label="$1" expected="$2" actual="$3"
  if [ "$expected" = "$actual" ]; then
    pass "$label"
  else
    fail "$label"
    echo "       expected: $(printf '%q' "$expected")"
    echo "       actual  : $(printf '%q' "$actual")"
  fi
}

assert_contains() {
  local label="$1" needle="$2" haystack="$3"
  if echo "$haystack" | grep -qF -- "$needle"; then
    pass "$label"
  else
    fail "$label"
    echo "       expected to find : $needle"
    echo "       in               : $haystack"
  fi
}

assert_not_contains() {
  local label="$1" needle="$2" haystack="$3"
  if ! echo "$haystack" | grep -qF -- "$needle"; then
    pass "$label"
  else
    fail "$label"
    echo "       expected NOT to find : $needle"
    echo "       in                   : $haystack"
  fi
}

# ---------------------------------------------------------------------------
# Core logic extracted verbatim from security.yml (lines 98-123)
# Parameters: HISTORY_FILE NPM_RESULT CODEQL_RESULT RUN_DATE RUN_URL
# Outputs:    TREND_SECTION (and mutates HISTORY_FILE on disk)
# ---------------------------------------------------------------------------

run_history_logic() {
  local HISTORY_FILE="$1"
  local NPM_RESULT="$2"
  local CODEQL_RESULT="$3"
  local RUN_DATE="$4"
  local RUN_URL="$5"

  if [ "$NPM_RESULT" = "failure" ] || [ "$CODEQL_RESULT" = "failure" ]; then
    OVERALL="FAILED"
  else
    OVERALL="PASSED"
  fi

  # Append current run to history file (format: date|overall|npm-audit=result|codeql=result|url)
  NEW_ENTRY="${RUN_DATE}|${OVERALL}|npm-audit=${NPM_RESULT}|codeql=${CODEQL_RESULT}|${RUN_URL}"
  echo "$NEW_ENTRY" >> "$HISTORY_FILE"

  # Keep only the last 5 entries
  TOTAL_LINES=$(wc -l < "$HISTORY_FILE")
  if [ "$TOTAL_LINES" -gt 5 ]; then
    tail -5 "$HISTORY_FILE" > "${HISTORY_FILE}.tmp" && mv "${HISTORY_FILE}.tmp" "$HISTORY_FILE"
  fi

  # Build trend section from history (oldest → newest)
  TREND_SECTION="Recent scan history (last 5 runs, oldest first):\n"
  TREND_SECTION="${TREND_SECTION}--------------------------------------------------\n"
  while IFS='|' read -r h_date h_overall h_npm h_codeql h_url; do
    h_npm_icon="✅"
    echo "$h_npm" | grep -q "=failure"   && h_npm_icon="❌"
    echo "$h_npm" | grep -q "=skipped"   && h_npm_icon="⏭️"
    echo "$h_npm" | grep -q "=cancelled" && h_npm_icon="🚫"
    h_codeql_icon="✅"
    echo "$h_codeql" | grep -q "=failure"   && h_codeql_icon="❌"
    echo "$h_codeql" | grep -q "=skipped"   && h_codeql_icon="⏭️"
    echo "$h_codeql" | grep -q "=cancelled" && h_codeql_icon="🚫"
    TREND_SECTION="${TREND_SECTION}  ${h_date}  ${h_overall}  |  ${h_npm_icon} npm audit  ${h_codeql_icon} CodeQL\n"
  done < "$HISTORY_FILE"
  TREND_SECTION="${TREND_SECTION}--------------------------------------------------"

  printf '%b' "$TREND_SECTION"
}

# ---------------------------------------------------------------------------
# Test scaffolding — each test gets its own temp directory
# ---------------------------------------------------------------------------

make_tmpdir() {
  local dir
  dir="$(mktemp -d)"
  echo "$dir"
}

cleanup() {
  local dir="$1"
  rm -rf "$dir"
}

# ---------------------------------------------------------------------------
# Scenario 1: First run — no prior history file
# ---------------------------------------------------------------------------

echo ""
echo "Scenario 1: First run (no prior history file)"

T1="$(make_tmpdir)"
HFILE="$T1/scan-history.txt"

TREND="$(run_history_logic "$HFILE" "success" "success" "2026-01-01 00:00 UTC" "https://example.com/runs/1")"

assert_equals "history file is created"       "1" "$(wc -l < "$HFILE")"
assert_contains "entry has correct OVERALL"   "PASSED" "$(cat "$HFILE")"
assert_contains "entry contains npm result"   "npm-audit=success" "$(cat "$HFILE")"
assert_contains "entry contains codeql result" "codeql=success"  "$(cat "$HFILE")"
assert_contains "trend section has header"    "Recent scan history" "$TREND"
assert_contains "trend section has separator" "--------------------------------------------------" "$TREND"
assert_contains "trend entry shows ✅ for npm"    "✅ npm audit"  "$TREND"
assert_contains "trend entry shows ✅ for codeql" "✅ CodeQL"     "$TREND"
assert_contains "trend entry shows PASSED"    "PASSED" "$TREND"

cleanup "$T1"

# ---------------------------------------------------------------------------
# Scenario 2: Sixth run — oldest entry must be dropped (cap at 5)
# ---------------------------------------------------------------------------

echo ""
echo "Scenario 2: Sixth run (oldest entry dropped, only 5 lines remain)"

T2="$(make_tmpdir)"
HFILE="$T2/scan-history.txt"

for i in 1 2 3 4 5; do
  echo "2026-01-0${i} 00:00 UTC|PASSED|npm-audit=success|codeql=success|https://example.com/runs/${i}" >> "$HFILE"
done

OLDEST_DATE="2026-01-01 00:00 UTC"
SIXTH_DATE="2026-01-06 00:00 UTC"

TREND="$(run_history_logic "$HFILE" "success" "success" "$SIXTH_DATE" "https://example.com/runs/6")"

assert_equals "file still has exactly 5 lines after 6th run" "5" "$(wc -l < "$HFILE")"
assert_not_contains "oldest entry was removed from file"      "$OLDEST_DATE" "$(cat "$HFILE")"
assert_contains "sixth entry is present in file"              "$SIXTH_DATE"  "$(cat "$HFILE")"
assert_not_contains "oldest date absent from trend section"   "$OLDEST_DATE" "$TREND"
assert_contains "sixth date present in trend section"         "$SIXTH_DATE"  "$TREND"

cleanup "$T2"

# ---------------------------------------------------------------------------
# Scenario 3: Failed run mid-history — ❌ icon appears in the trend section
# ---------------------------------------------------------------------------

echo ""
echo "Scenario 3: Failed run mid-history (❌ icon rendered for failed scan)"

T3="$(make_tmpdir)"
HFILE="$T3/scan-history.txt"

# Two passing entries already in history
echo "2026-02-01 00:00 UTC|PASSED|npm-audit=success|codeql=success|https://example.com/runs/1" >> "$HFILE"
echo "2026-02-02 00:00 UTC|PASSED|npm-audit=success|codeql=success|https://example.com/runs/2" >> "$HFILE"

# Third run: npm audit fails, codeql passes
TREND="$(run_history_logic "$HFILE" "failure" "success" "2026-02-03 00:00 UTC" "https://example.com/runs/3")"

assert_equals "OVERALL is FAILED when npm fails"    "FAILED" "$(tail -1 "$HFILE" | cut -d'|' -f2)"
assert_contains "file records npm failure"          "npm-audit=failure" "$(tail -1 "$HFILE")"
assert_contains "❌ icon appears in trend for npm"  "❌ npm audit"  "$TREND"
assert_contains "✅ icon appears in trend for codeql" "✅ CodeQL"  "$TREND"
assert_contains "FAILED label present in trend"     "FAILED" "$TREND"

# Fourth run: codeql fails, npm passes
TREND2="$(run_history_logic "$HFILE" "success" "failure" "2026-02-04 00:00 UTC" "https://example.com/runs/4")"

assert_contains "❌ icon appears for codeql failure" "❌ CodeQL"  "$TREND2"
assert_contains "✅ icon appears for npm success when codeql fails" "✅ npm audit" "$TREND2"

cleanup "$T3"

# ---------------------------------------------------------------------------
# Results summary
# ---------------------------------------------------------------------------

echo ""
echo "Results: ${PASS} passed, ${FAIL} failed"

if [ "$FAIL" -gt 0 ]; then
  exit 1
fi

exit 0
