# AI-Local_Intelligence-Platform

A self-hosted AI platform built in four incremental phases: a chat assistant, live data via MCP tools, agentic workflows for job search and language learning, and RAG-based document intelligence — all running on a self-hosted Ollama model and Neo4j, with no paid APIs.

## Why this exists

Most AI portfolio projects are single-purpose demos. This one is built as a platform: each phase is a real, independently working feature, developed on its own branch and merged into `main` once stable. The commit and PR history is intentionally part of the deliverable — it shows how the system was actually built, not just the finished result.

## Phases

| Phase | Feature | Status | Docs |
|---|---|---|---|
| 1 | Chat Assistant (Ollama-backed) |  Planned | |
| 2 | MCP Tools (weather, world/country/tech news) |  Planned |  |
| 3 | Agentic Workflows (German B2 journal summarizer, jobseeker agents) |Planned | |
| 4 | RAG Document Intelligence (upload, query, summarize) |  Planned |  |

See [CHANGELOG.md](CHANGELOG.md) for release history and [CONTRIBUTING.md](CONTRIBUTING.md) for branch and PR conventions used throughout this repo.

## Architecture (high level)

```
React (Vite + Tailwind)  ──▶  Django REST API  ──▶  Ollama (self-hosted LLM)
                                     │
                                     └──▶  MCP servers (weather, news)
                                     └──▶  Neo4j (vector + graph store, Phase 4)
```

Backend and LLM/graph infrastructure run on separate Oracle Cloud instances connected privately over Tailscale — see each phase's doc for specifics.

## Repository structure

```
local-intelligence-platform/
├── README.md
├── CONTRIBUTING.md
├── CHANGELOG.md
├── docs/
│   └── feature/
│       ├── AI_chat_assistant.md
│       ├── mcp_tools.md
│       ├── agentic_workflows.md
│       └── rag_document_intelligence.md
├── backend/
├── frontend/
└── docker-compose.yml
```

## Quick start

Each phase doc under `docs/feature/` has full setup instructions for that feature. To run the current state of `main`:

```bash
cp backend/.env.example backend/.env   # fill in your Ollama/Neo4j details
docker compose up -d --build
```

Visit `http://localhost`.

## Tech stack

- Django REST Framework 
- React + Tailwind 
- Ollama 
- Neo4j -
-  MCP 
- Celery/Redis (from Phase 4 onward) 
- Docker Compose 
- Tailscale

## License

MIT

