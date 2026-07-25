
# Contributing

This is a solo portfolio project, but it follows real branch and PR discipline so the history itself demonstrates working practice — treat every PR as if a reviewer will read it.

## Branch naming

| Prefix | Use for |
|---|---|
| `feature/...` | New capability (a phase, or a feature within a phase) |
| `fix/...` | Bug fixes |
| `chore/...` | Tooling, config, dependencies, CI |
| `docs/...` | Documentation-only changes |

Examples:
- `feature/phase1-chat-assistant`
- `feature/mcp-weather`
- `feature/agent-german-journal-summarizer`
- `fix/chat-history-trim-off-by-one`
- `chore/docker-compose-healthchecks`

## Branch structure per phase

Large phases get a parent branch with sub-feature branches merged into it before the parent merges into `main`:

```
main
└── feature/phase2-mcp-tools
    ├── feature/mcp-weather        (merges into phase2-mcp-tools)
    ├── feature/mcp-news-world     (merges into phase2-mcp-tools)
    └── feature/mcp-news-tech      (merges into phase2-mcp-tools)
```

Smaller, self-contained phases (like Phase 1) can branch directly off `main` and merge straight back.

## Commit messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add ollama chat client
fix: correct off-by-one in history trimming
docs: move phase 1 readme to docs/feature
chore: add gunicorn to backend dependencies
refactor: extract ollama client into its own module
```

Keep commits small and focused — one logical change per commit, not one commit per file saved.

## Pull requests

Every phase and every feature branch gets a PR into its target branch, even solo. Use the template at `.github/PULL_REQUEST_TEMPLATE.md`. A PR should include:

- **What** changed and **why**
- **How to test it** locally
- A screenshot or short clip for anything UI-facing
- Any follow-up work explicitly deferred (link an issue if one exists)

## Before merging

- [ ] Code runs locally following the relevant `docs/feature/*.md` setup steps
- [ ] `.env.example` updated if new environment variables were introduced
- [ ] Relevant `docs/feature/*.md` created or updated
- [ ] `CHANGELOG.md` updated under `Unreleased`
- [ ] Root `README.md` phase table updated if a phase's status changed

## Releases

Tag `main` after each phase merges:

```bash
git tag -a v0.1.0 -m "Phase 1: Chat Assistant"
git push origin v0.1.0
```

Move the corresponding `CHANGELOG.md` entries from `Unreleased` into the new version section as part of the same PR.