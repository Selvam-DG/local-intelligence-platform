from rest_framework.decorators import api_view
from rest_framework.response import Response

from chat.ollama_client import chat as ollama_chat

SYSTEM_PROMPT = {
    "role":"system",
    "content" : "You are a helpful, concise AI assistant.",
}

@api_view(["POST"])
def chat_endpoint(request):
    """
    Expects: {"message"}:[{"role":"USER|"ASSISTANT", "content":"...."}
    Full conversation history is sent by the client each time - there is no server side state in this phase...
    """
    
    history = request.data.get("messages", [])
    print(history)
    if not history:
        return Response({"error":"messages is required"}, status=400)
    full_messages = [SYSTEM_PROMPT] + history
    
    try:
        reply = ollama_chat(full_messages)
    except Exception as error:
        return Response({"error": f"Ollama request failed: {error}"}, status=502)
    print(reply)
    return Response({"role": "assistant", "content": reply})