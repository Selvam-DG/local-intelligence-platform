import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

const client = axios.create({ baseURL: BASE_URL });

export async function sendChat(messages) {
  const { data } = await client.post("/chat", { messages });
  return data;
}