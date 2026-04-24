# Branch Protection Setup

This document explains how to configure GitHub branch protection rules that require
the security workflow jobs to pass before any pull request can be merged.

## Why This Matters

The `security.yml` workflow runs two jobs on every pull request:

| Job ID      | Check Name                                        | What It Does                                |
|-------------|---------------------------------------------------|---------------------------------------------|
| `npm-audit` | `npm audit`                                       | Fails if any high-severity npm vulnerabilities are found |
| `codeql`    | `CodeQL Analysis (javascript-typescript)`         | Performs static analysis for security flaws |

Without branch protection, these checks run but **do not block merging** — a PR with
failing security checks can still be merged manually.

## Option A — Manual Setup (GitHub UI)

1. Go to **Settings → Branches** in your GitHub repository.
2. Click **Add branch ruleset** (or edit the existing rule for `main`).
3. Under **Branch name pattern**, enter `main`.
4. Enable **Require status checks to pass before merging**.
5. Search for and add both checks:
   - `npm audit`
   - `CodeQL Analysis (javascript-typescript)`
6. Enable **Require branches to be up to date before merging** (the "Strict" option).
7. Optionally enable **Do not allow bypassing the above settings** so admins are also
   subject to the rules.
8. Save the ruleset.

## Option B — Automated Setup (GitHub Actions workflow)

A reusable workflow is provided at `.github/workflows/configure-branch-protection.yml`
that calls the GitHub REST API to apply the rules programmatically.

### Prerequisites

Create a **Personal Access Token (PAT)** (classic) with the `repo` scope (or a
fine-grained token with *Administration: Read & Write* on the repository).
Store it as a repository secret named **`BRANCH_PROTECTION_PAT`**.

> **Note:** `GITHUB_TOKEN` does not have permission to modify branch protection rules,
> which is why a PAT is required.

### Running the workflow

1. Go to **Actions → Configure Branch Protection**.
2. Click **Run workflow**.
3. Optionally change the branch name (default is `main`).
4. Click **Run workflow** to apply the rules immediately.

## Verifying the Configuration

After setup, open any pull request and confirm that the following checks are listed
under **Merging is blocked** or **All checks must pass**:

- `npm audit`
- `CodeQL Analysis (javascript-typescript)`

If either check fails, the **Merge pull request** button will be disabled until the
issue is resolved or a maintainer explicitly overrides the protection (if bypass is
allowed).

## Related Files

- `.github/workflows/security.yml` — defines the `npm-audit` and `codeql` jobs
- `.github/workflows/configure-branch-protection.yml` — automated setup helper
- `.github/dependabot.yml` — keeps dependencies updated automatically, reducing audit failures
