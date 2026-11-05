"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  AlertCircle,
  ArrowRight,
  Bot,
  CalendarCheck,
  ChevronRight,
  MessageSquare,
  MoreVertical,
  Phone,
  RotateCcw,
  Send,
  ShieldAlert,
  Sparkles,
  X,
} from "lucide-react";
import Link from "next/link";
import { CHATBOT_STARTERS, CHATBOT_WELCOME_MESSAGE } from "@/lib/chatbot/knowledge";
import { FormattedMessage } from "./FormattedMessage";
import { ChatLeadForm } from "./ChatLeadForm";
import { cn } from "@/lib/cn";

export type MessageItem = {
  id: string;
  role: "user" | "model";
  content: string;
  timestamp: Date;
  isWelcome?: boolean;
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<MessageItem[]>([
    {
      id: "welcome-1",
      role: "model",
      content: CHATBOT_WELCOME_MESSAGE,
      timestamp: new Date(),
      isWelcome: true,
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  const scrollToBottom = (smooth = true) => {
    messagesEndRef.current?.scrollIntoView({ behavior: smooth ? "smooth" : "auto" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom(false);
      const timer = setTimeout(() => inputRef.current?.focus(), 250);
      return () => clearTimeout(timer);
    }
  }, [isOpen, showLeadForm]);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom(true);
    }
  }, [messages, isLoading]);

  // Handle ESC key to close widget
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        if (showMenu) {
          setShowMenu(false);
        } else {
          setIsOpen(false);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, showMenu]);

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    };
    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showMenu]);

  // Send message to Gemini server API
  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query || isLoading) return;

    setError(null);
    setInputValue("");
    setHasInteracted(true);
    setShowMenu(false);

    const userMsg: MessageItem = {
      id: `user-${Date.now()}`,
      role: "user",
      content: query,
      timestamp: new Date(),
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setIsLoading(true);

    try {
      // Send conversation (excluding welcome greeting) to secure backend route
      const apiPayload = newHistory
        .filter((m) => !m.isWelcome)
        .map((m) => ({
          role: m.role,
          content: m.content,
        }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiPayload }),
      });

      let data: { success?: boolean; message?: string; error?: string } | null = null;
      try {
        data = await res.json();
      } catch {
        data = null;
      }

      if (res.ok && data?.success && data?.message) {
        const assistantMsg: MessageItem = {
          id: `model-${Date.now()}`,
          role: "model",
          content: data.message,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMsg]);
      } else {
        const errMsg =
          data?.error ||
          (res.status === 404
            ? "Chat service route is not available. Please verify serverless deployment on Vercel."
            : res.status === 429
            ? "You are sending messages too quickly. Please pause for a moment and try again."
            : res.status === 503
            ? "Our assistant is temporarily busy or unconfigured. Please try again or reach out to our team."
            : "We encountered an issue getting a response. Please try again or reach out to our team.");
        setError(errMsg);
      }
    } catch {
      setError("Network connection issue. Please check your internet connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const retryLastMessage = async () => {
    if (isLoading) return;
    setError(null);

    // Filter out welcome message
    const apiPayload = messages
      .filter((m) => !m.isWelcome)
      .map((m) => ({
        role: m.role,
        content: m.content,
      }));

    if (apiPayload.length === 0 || apiPayload[apiPayload.length - 1].role !== "user") {
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiPayload }),
      });

      let data: { success?: boolean; message?: string; error?: string } | null = null;
      try {
        data = await res.json();
      } catch {
        data = null;
      }

      if (res.ok && data?.success && data?.message) {
        const assistantMsg: MessageItem = {
          id: `model-${Date.now()}`,
          role: "model",
          content: data.message,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMsg]);
      } else {
        const errMsg =
          data?.error ||
          (res.status === 404
            ? "Chat service route is not available. Please verify serverless deployment on Vercel."
            : res.status === 429
            ? "You are sending messages too quickly. Please pause for a moment and try again."
            : res.status === 503
            ? "Our assistant is temporarily busy or unconfigured. Please try again or reach out to our team."
            : "We encountered an issue getting a response. Please try again or reach out to our team.");
        setError(errMsg);
      }
    } catch {
      setError("Network connection issue. Please check your internet connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStarterSelect = (starter: (typeof CHATBOT_STARTERS)[number]) => {
    if (starter.id === "demo") {
      setShowLeadForm(true);
      setHasInteracted(true);
    } else {
      handleSend(starter.prompt);
    }
  };

  const handleResetConversation = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: "model",
        content: CHATBOT_WELCOME_MESSAGE,
        timestamp: new Date(),
        isWelcome: true,
      },
    ]);
    setError(null);
    setShowLeadForm(false);
    setShowMenu(false);
    setHasInteracted(false);
  };

  return (
    <>
      {/* Floating Chat Launcher Button */}
      <div className="fixed bottom-5 right-5 z-40 sm:bottom-6 sm:right-6">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-controls="prime-chatbot-window"
          aria-label={isOpen ? "Close Prime Techmate AI Assistant" : "Ask Prime AI Assistant"}
          className={cn(
            "group relative flex size-14 items-center justify-center rounded-full shadow-frame transition-all duration-300 ease-premium active:scale-95 sm:size-15",
            isOpen
              ? "bg-charcoal-900 text-white hover:bg-charcoal-800"
              : "bg-accent-600 text-white hover:bg-accent-700 hover:shadow-lift"
          )}
        >
          {/* Subtle animated red signature marker */}
          {!isOpen && (
            <span
              aria-hidden="true"
              className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center"
            >
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-signal-400 opacity-75" />
              <span className="relative inline-flex size-3 rounded-full bg-signal-500 ring-2 ring-white" />
            </span>
          )}

          {isOpen ? (
            <X className="size-6 transition-transform duration-300 group-hover:rotate-90" />
          ) : (
            <MessageSquare className="size-6 transition-transform duration-300 group-hover:scale-110" />
          )}

          {/* Floating badge label: "Ask Prime" */}
          {!isOpen && (
            <span className="pointer-events-none absolute right-16 hidden whitespace-nowrap rounded-full border border-line bg-white px-3.5 py-1.5 text-[12.5px] font-semibold text-ink shadow-soft transition-opacity duration-200 group-hover:opacity-100 sm:inline-block">
              Ask Prime
            </span>
          )}
        </button>
      </div>

      {/* Floating Chat Window Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="prime-chatbot-window"
            role="dialog"
            aria-modal="true"
            aria-label="Prime Techmate AI Assistant"
            initial={{ opacity: 0, y: 14, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "fixed z-50 flex flex-col bg-white shadow-frame",
              // Mobile: full-screen with safe viewports; Desktop: compact floating window
              "inset-0 rounded-none sm:inset-auto sm:bottom-24 sm:right-6 sm:h-[580px] sm:w-[400px] sm:max-h-[calc(100vh-120px)] sm:rounded-[24px] sm:border sm:border-line"
            )}
          >
            {/* 1. Fixed Header */}
            <header className="relative flex shrink-0 items-center justify-between border-b border-line bg-navy-950 px-4 py-3.5 text-white sm:rounded-t-[24px] sm:px-5">
              <div className="flex items-center gap-3">
                <div className="grid size-9 place-items-center rounded-xl bg-accent-600 text-white shadow-sm">
                  <Bot className="size-4.5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-display text-[15px] font-bold leading-tight">Prime Techmate</h3>
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-1.5 py-0.5 text-[9px] font-semibold tracking-wide text-accent-300">
                      <Sparkles className="size-2.5" /> AI
                    </span>
                  </div>
                  <p className="text-[11.5px] text-navy-300">Virtual Assistant</p>
                </div>
              </div>

              {/* Secondary menu & close buttons */}
              <div className="flex items-center gap-0.5">
                {/* Secondary options dropdown */}
                <div className="relative" ref={menuRef}>
                  <button
                    type="button"
                    onClick={() => setShowMenu((prev) => !prev)}
                    aria-expanded={showMenu}
                    aria-label="Chat options"
                    className="grid size-8 place-items-center rounded-lg text-navy-300 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <MoreVertical className="size-4" />
                  </button>

                  <AnimatePresence>
                    {showMenu && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -4 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -4 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-9 z-20 w-48 rounded-xl border border-line bg-white p-1 text-ink shadow-lift"
                      >
                        <button
                          type="button"
                          onClick={handleResetConversation}
                          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-[13px] font-medium text-body hover:bg-mist hover:text-ink transition-colors"
                        >
                          <RotateCcw className="size-3.5 text-muted" />
                          New conversation
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setShowMenu(false);
                            setShowLeadForm(true);
                          }}
                          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-[13px] font-medium text-body hover:bg-mist hover:text-ink transition-colors"
                        >
                          <CalendarCheck className="size-3.5 text-muted" />
                          Request demo / quote
                        </button>
                        <Link
                          href="/contact/"
                          onClick={() => {
                            setShowMenu(false);
                            setIsOpen(false);
                          }}
                          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-[13px] font-medium text-body hover:bg-mist hover:text-ink transition-colors"
                        >
                          <Phone className="size-3.5 text-muted" />
                          Speak to our team
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  title="Close chat"
                  aria-label="Close chat"
                  className="grid size-8 place-items-center rounded-lg text-navy-300 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <X className="size-5" />
                </button>
              </div>
            </header>

            {/* 2. Scrollable Messages Area */}
            <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-5">
              {showLeadForm ? (
                <ChatLeadForm
                  onClose={() => setShowLeadForm(false)}
                  onSubmitted={(summary) => {
                    setShowLeadForm(false);
                    setMessages((prev) => [
                      ...prev,
                      {
                        id: `lead-success-${Date.now()}`,
                        role: "model",
                        content: `**Enquiry Confirmed!**\n\nThank you for submitting your request (${summary}). Our healthcare technology team will review your requirements and follow up with you promptly. Feel free to ask any other questions about Applify EMR or our solutions in the meantime!`,
                        timestamp: new Date(),
                      },
                    ]);
                  }}
                />
              ) : (
                <div className="space-y-4" aria-live="polite">
                  {messages.map((m) => (
                    <div
                      key={m.id}
                      className={cn("flex flex-col gap-1", m.role === "user" ? "items-end" : "items-start")}
                    >
                      <div
                        className={cn(
                          "max-w-[88%] rounded-2xl p-3.5 sm:max-w-[85%]",
                          m.role === "user"
                            ? "rounded-br-sm bg-accent-600 text-white shadow-soft"
                            : "rounded-bl-sm border border-line bg-mist text-ink"
                        )}
                      >
                        {m.role === "user" ? (
                          <p className="text-[14px] leading-relaxed whitespace-pre-wrap">{m.content}</p>
                        ) : (
                          <FormattedMessage text={m.content} />
                        )}
                      </div>

                      {/* No timestamp on initial welcome message */}
                      {!m.isWelcome && (
                        <span className="px-1 text-[10px] text-muted">
                          {m.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      )}
                    </div>
                  ))}

                  {/* Typing Indicator */}
                  {isLoading && (
                    <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm border border-line bg-mist px-4 py-3 text-ink w-fit">
                      <span className="size-1.5 animate-bounce rounded-full bg-accent-600 [animation-delay:-0.3s]" />
                      <span className="size-1.5 animate-bounce rounded-full bg-accent-600 [animation-delay:-0.15s]" />
                      <span className="size-1.5 animate-bounce rounded-full bg-accent-600" />
                      <span className="ml-1.5 text-[11.5px] font-medium text-muted">Thinking...</span>
                    </div>
                  )}

                  {/* Error Notification with Retry */}
                  {error && (
                    <div className="rounded-xl border border-signal-400/30 bg-signal-50 p-3 text-[12.5px] text-signal-600">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="size-4 shrink-0 mt-0.5" />
                        <div>
                          <p>{error}</p>
                          <button
                            type="button"
                            onClick={retryLastMessage}
                            disabled={isLoading}
                            className="mt-2 font-semibold text-accent-600 underline underline-offset-2 hover:text-accent-700 disabled:opacity-50"
                          >
                            Retry query
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Exactly 3 conversation starters: visible ONLY before the visitor begins interacting */}
                  {!hasInteracted && messages.length <= 1 && !isLoading && (
                    <div className="pt-2">
                      <p className="text-[11.5px] font-medium text-muted">
                        Select an option to get started:
                      </p>
                      <div className="mt-2 flex flex-col gap-2">
                        {CHATBOT_STARTERS.map((starter) => (
                          <button
                            key={starter.id}
                            type="button"
                            onClick={() => handleStarterSelect(starter)}
                            className="group flex items-center justify-between rounded-xl border border-line bg-white px-3.5 py-2.5 text-left text-[13.5px] font-medium text-ink shadow-soft transition-all duration-200 hover:border-accent-500 hover:bg-accent-50/60 active:scale-[0.99]"
                          >
                            <span>{starter.label}</span>
                            <ChevronRight className="size-4 text-subtle transition-transform group-hover:translate-x-0.5 group-hover:text-accent-600" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* 3. Fixed Bottom Input Bar */}
            {!showLeadForm && (
              <div className="shrink-0 border-t border-line bg-white p-3 sm:rounded-b-[24px]">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend();
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask about Applify EMR, solutions..."
                    disabled={isLoading}
                    className="flex-1 rounded-full border border-line bg-mist px-4 py-2.5 text-[16px] sm:text-[14px] text-ink outline-none transition-colors placeholder:text-subtle focus:border-accent-600 focus:bg-white disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={!inputValue.trim() || isLoading}
                    aria-label="Send message"
                    className="grid size-10 place-items-center rounded-full bg-accent-600 text-white shadow-soft transition-all duration-200 hover:bg-accent-700 active:scale-95 disabled:pointer-events-none disabled:opacity-40"
                  >
                    <Send className="size-4" />
                  </button>
                </form>

                {/* Concise, always-visible patient-data warning */}
                <div className="mt-2 flex items-center justify-center gap-1.5 px-2 text-center text-[11px] leading-tight text-muted">
                  <ShieldAlert className="size-3 text-signal-500 shrink-0" />
                  <span>
                    AI Assistant · Do not enter patient records or confidential health data.
                  </span>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
