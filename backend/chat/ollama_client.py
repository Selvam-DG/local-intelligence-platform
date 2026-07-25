"""
Minimal Ollama chat client. This is the piece every later phase reuses
    - MCP Tool results
    - Agents context
"""

import requests
from django.conf import settings
TIMEOUT_SECONDS=120

def chat(message, model=None, stream=False):
    model = model or settings.OLLAMA_CHAT_MODEL
    response = requests.post(
        f"{settings.OLLAMA_BASE_URL}/api/chat",
        json={"model":model, "messages":message, "stream":stream},
        timeout=TIMEOUT_SECONDS,
    )
    response.raise_for_status()
    print(response)
    return response.json()["message"]["content"]
