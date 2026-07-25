
# Changelog

All notable changes to this project are documented here. Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), versioned per phase.

## [Unreleased]

### Planned
- Phase 2: MCP tools for weather, world/country news, and tech news
- Phase 3: Agentic workflows — German B2 journal summarizer, jobseeker/learner agents
- Phase 4: RAG document intelligence — upload, query, summarize

## [0.1.0] — Phase 1: Chat Assistant

### Added
- Django REST Framework backend with a single `/api/chat` endpoint
- Ollama client (`chat/ollama_client.py`) wrapping the self-hosted model's `/api/chat` endpoint
- React + Tailwind chat UI with message history rendered client-side
- Conversation history capped to the last 5 messages, trimmed both client-side (`api/client.js`) and server-side (`views.py`) as a safety net
- Docker Compose setup for backend (Django dev server) and frontend (Vite build served by nginx, proxying `/api`)
- `.env.example` documenting required configuration

### Notes
- Stateless by design — no database or session store in this phase; conversation state lives entirely in the browser
- Backend and Ollama communicate over the network specified in `OLLAMA_BASE_URL` (Tailscale in this project's deployment)