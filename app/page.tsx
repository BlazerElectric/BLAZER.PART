"use client";

import { useChat } from "ai/react";
import { Send, Loader2, Bot, User } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

function ChatWidget() {
  const searchParams = useSearchParams();
  const isEmbedded = searchParams.get("embed") === "true";

  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: "/api/chat",
    });

  const scrollAnchorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollAnchorRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
      className={twMerge(
        "flex h-dvh w-full flex-col bg-white",
        isEmbedded ? "" : "mx-auto max-w-2xl border-x border-zinc-200",
      )}
    >
      {!isEmbedded && (
        <header className="flex items-center gap-2 border-b border-zinc-200 px-4 py-3">
          <Bot className="h-5 w-5 text-blue-600" />
          <h1 className="text-sm font-semibold text-zinc-900">
            Blazer Part Finder
          </h1>
        </header>
      )}

      <div className="flex-1 overflow-y-auto px-4 py-4">
        {messages.length === 0 && (
          <div className="flex h-full items-center justify-center text-center text-sm text-zinc-400">
            Ask me about any Blazer Electric part and I&apos;ll help you find
            it.
          </div>
        )}

        <div className="flex flex-col gap-3">
          {messages.map((message) => {
            const isUser = message.role === "user";
            return (
              <div
                key={message.id}
                className={twMerge(
                  "flex items-start gap-2",
                  isUser ? "flex-row-reverse" : "flex-row",
                )}
              >
                <div
                  className={twMerge(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
                    isUser ? "bg-blue-600" : "bg-zinc-200",
                  )}
                >
                  {isUser ? (
                    <User className="h-4 w-4 text-white" />
                  ) : (
                    <Bot className="h-4 w-4 text-zinc-700" />
                  )}
                </div>
                <div
                  className={twMerge(
                    "max-w-[80%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm leading-relaxed",
                    isUser
                      ? "rounded-tr-sm bg-blue-600 text-white"
                      : "rounded-tl-sm bg-zinc-100 text-zinc-900",
                  )}
                >
                  {message.content}
                </div>
              </div>
            );
          })}

          {isLoading && messages.at(-1)?.role === "user" && (
            <div className="flex items-start gap-2">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-zinc-200">
                <Bot className="h-4 w-4 text-zinc-700" />
              </div>
              <div className="flex items-center rounded-2xl rounded-tl-sm bg-zinc-100 px-3 py-2">
                <Loader2 className="h-4 w-4 animate-spin text-zinc-500" />
              </div>
            </div>
          )}
        </div>

        <div ref={scrollAnchorRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 border-t border-zinc-200 p-3"
      >
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Type your question…"
          disabled={isLoading}
          className="flex-1 rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-900 outline-none focus:border-blue-500 disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={isLoading || input.trim().length === 0}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-zinc-300"
          aria-label="Send message"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </button>
      </form>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={null}>
      <ChatWidget />
    </Suspense>
  );
}
