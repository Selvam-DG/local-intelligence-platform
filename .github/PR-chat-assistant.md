
### PR content — filled example for merging Phase 1 into `main`

## What

Adds the Phase 1 Chat Assistant: a React + Tailwind chat UI backed by a Django REST Framework API that forwards conversations to a self-hosted Ollama model. 

## Why

This is the foundation phase of the Local Intelligence-Platform roadmap — every later phase (MCP tools, agentic workflows, RAG) extends this same chat interface and Ollama client rather than starting from scratch.

## How to test

1. `cp backend/.env.example backend/.env` and set `OLLAMA_BASE_URL` to a reachable Ollama instance with `llama3.2:3b` pulled
2. `cd backend && python -m venv venv && source venv/bin/activate && pip install -r requirements.txt && python manage.py runserver`
3. In a second terminal: `cd frontend && npm install && npm run dev`
4. Visit `http://localhost:5173`, send a few messages, confirm replies come back and the model responds coherently to context from prior turns


Alternatively, via Docker: `docker compose up -d --build` and visit `http://localhost`.

## Screenshots / demo

<!-- attach a screenshot of the chat UI with a short exchange -->
![alt text](<Screenshot 2026-07-25 224023.png>)

## Checklist

- [x] Runs locally following `docs/feature/AI_chat_assistant.md`
- [x] `.env.example` includes all required variables (`OLLAMA_BASE_URL`, `OLLAMA_CHAT_MODEL`, `MAX_HISTORY_MESSAGES`, etc.)
- [x] `docs/feature/AI_chat_assistant.md` created
- [x] `CHANGELOG.md` updated — see `[0.1.0]`
- [x] Root `README.md` phase table updated — Phase 1 marked complete

## Follow-up work
- Conversation history is capped to the last 5 messages per request.
- Phase 2 will add MCP tool calls (weather, news) into this same chat flow, so responses can ground themselves in live data rather than the model's training knowledge
- No persistent history yet — deferred until Phase 4 introduces session-scoped storage
