import { useEffect, useRef, useState } from "react";
import { Send, Loader2, Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { sendChat } from "./api/client";

function AssistantMessage({ content }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => (
          <h1 className="mt-4 mb-2 text-xl font-semibold first:mt-0">
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="mt-4 mb-2 text-lg font-semibold first:mt-0">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="mt-3 mb-2 font-semibold first:mt-0">
            {children}
          </h3>
        ),
        p: ({ children }) => (
          <p className="my-2 first:mt-0 last:mb-0">{children}</p>
        ),
        ul: ({ children }) => (
          <ul className="my-2 list-disc space-y-1 pl-5">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="my-2 list-decimal space-y-1 pl-5">{children}</ol>
        ),
        li: ({ children }) => <li>{children}</li>,
        strong: ({ children }) => (
          <strong className="font-semibold">{children}</strong>
        ),
        blockquote: ({ children }) => (
          <blockquote className="my-3 border-l-2 border-teal/50 pl-3 text-textMuted">
            {children}
          </blockquote>
        ),
        a: ({ href, children }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal underline underline-offset-2"
          >
            {children}
          </a>
        ),
        code: ({ inline, children, ...props }) =>
          inline ? (
            <code
              className="rounded bg-black/20 px-1.5 py-0.5 font-mono text-xs"
              {...props}
            >
              {children}
            </code>
          ) : (
            <code
              className="block overflow-x-auto whitespace-pre rounded-lg bg-black/30 p-3 font-mono text-xs"
              {...props}
            >
              {children}
            </code>
          ),
        pre: ({ children }) => (
          <pre className="my-3 overflow-x-auto">{children}</pre>
        ),
        table: ({ children }) => (
          <div className="my-3 overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              {children}
            </table>
          </div>
        ),
        th: ({ children }) => (
          <th className="border border-border bg-black/10 px-3 py-2 font-semibold">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="border border-border px-3 py-2">{children}</td>
        ),
        hr: () => <hr className="my-4 border-border" />,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [error, setError] = useState(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, thinking]);

  async function handleSubmit(e) {
    e.preventDefault();

    const text = input.trim();
    if (!text || thinking) return;

    const nextMessages = [
      ...messages,
      {
        role: "user",
        content: text,
      },
    ];

    setMessages(nextMessages);
    setInput("");
    setThinking(true);
    setError(null);

    try {
      const reply = await sendChat(nextMessages);

      setMessages((previousMessages) => [
        ...previousMessages,
        {
          role: "assistant",
          content:
            typeof reply === "string"
              ? reply
              : reply.content ?? reply.message?.content ?? "",
        },
      ]);
    } catch (err) {
      setError(
        err.response?.data?.error ||
          err.response?.data?.details ||
          "Couldn't reach the assistant."
      );
    } finally {
      setThinking(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-2xl flex-col">
      <header className="border-b border-border px-6 py-4">
        <h1 className="font-display text-lg font-semibold">AI Assistant</h1>
        <p className="text-xs text-textMuted">
          Connected to your self-hosted model
        </p>
      </header>

      <main className="flex flex-1 flex-col gap-4 overflow-y-auto px-6 py-4">
        {messages.length === 0 && (
          <div className="flex flex-1 items-center justify-center text-sm text-textMuted">
            Say hello to start the conversation.
          </div>
        )}

        {messages.map((message, index) => (
          <div
            key={`${message.role}-${index}`}
            className={`flex gap-3 ${
              message.role === "user" ? "flex-row-reverse" : ""
            }`}
          >
            <div
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border ${
                message.role === "user"
                  ? "border-amber/30 bg-amber/10 text-amber"
                  : "border-teal/30 bg-teal/10 text-teal"
              }`}
            >
              {message.role === "user" ? (
                <User className="h-3.5 w-3.5" />
              ) : (
                <Bot className="h-3.5 w-3.5" />
              )}
            </div>

            <div
              className={`max-w-[85%] rounded-xl px-4 py-2.5 text-sm leading-relaxed ${
                message.role === "user"
                  ? "border border-amber/20 bg-amber/10 whitespace-pre-wrap"
                  : "border border-border bg-surfaceRaised"
              }`}
            >
              {message.role === "assistant" ? (
                <AssistantMessage content={message.content} />
              ) : (
                message.content
              )}
            </div>
          </div>
        ))}

        {thinking && (
          <div className="flex items-center gap-2 pl-10 text-sm text-textMuted">
            <Loader2 className="h-4 w-4 animate-spin" />
            Thinking...
          </div>
        )}

        <div ref={bottomRef} />
      </main>

      {error && <p className="px-6 pb-2 text-xs text-amber">{error}</p>}

      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 border-t border-border px-6 py-4"
      >
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Ask me anything..."
          className="flex-1 rounded-lg border border-border bg-surfaceRaised px-3.5 py-2.5 text-sm placeholder:text-textMuted"
        />

        <button
          type="submit"
          disabled={thinking || !input.trim()}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal/90 transition-colors hover:bg-teal disabled:opacity-40"
          aria-label="Send message"
        >
          <Send className="h-4 w-4 text-base" />
        </button>
      </form>
    </div>
  );
}