---
name: gh-repository-workflow
description: "Use when using GitHub CLI (gh) to inspect, create, or modify repositories and issues, including public MEGA.dev challenge deliveries."
---

# GitHub CLI Repository Workflow

## Safety

- Check `gh auth status` and confirm the active account before writing. Never copy or expose tokens.
- Ask the human before creating a repository, opening or closing issues, or pushing changes. State whether the repository is public and who can see it.
- If `gh` is already installed, use that executable; do not install another copy. Ask before installing software.
- Read each command's `--help` before using unfamiliar flags.

## Procedure

1. Locate `gh` with `Get-Command gh` and `where.exe gh` on Windows. Use the discovered executable path if it is not on `PATH`.
2. Run `gh auth status`. Do not run `gh auth login` unless the human asks to sign in.
3. Before creating a repository, inspect the account and existing repositories. Ask for the repository name and visibility; use `gh repo create --help` to select the correct flags.
4. Before opening issues, inspect all existing issues with `gh issue list --state all`. Deduplicate source records by their stable IDs before calculating affected counts. Read `gh issue create --help`, then include the count and classification evidence in each issue body.
5. After creating an issue, verify its number, title, URL, and body with `gh issue view`.
6. Make changes in the intended repository worktree. Run relevant checks and `git diff --check`, stage only the intended files, then inspect the staged changes before committing.
7. Push only after the human has approved the GitHub changes. Confirm the remote and branch first, then verify the pushed files and issues on GitHub.
8. Close an issue only when requested. Read `gh issue close --help` and verify the resulting state with `gh issue view`.
