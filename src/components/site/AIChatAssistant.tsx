import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import {
  Bot,
  Send,
  ShieldAlert,
  User,
  Loader2,
  Sparkles,
  RotateCcw,
  Phone,
  RefreshCw,
  Siren,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  chatWelcomeMessage,
  clinic,
  emergencyKeywords,
  suggestedPrompts,
} from "@/lib/clinic-data";
import { cn } from "@/lib/utils";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  ts: number;
  isEmergency?: boolean;
};

const RESPONSE_KEYS = ["reply", "response", "message", "output", "text"] as const;

function normalizeResponse(data: unknown): string | null {
  if (typeof data === "string") return data.trim() || null;
  if (data && typeof data === "object") {
    const obj = data as Record<string, unknown>;
    for (const k of RESPONSE_KEYS) {
      const v = obj[k];
      if (typeof v === "string" && v.trim()) return v.trim();
    }
    // Array of objects?
    if (Array.isArray(data) && data.length && typeof data[0] === "object") {
      return normalizeResponse(data[0]);
    }
  }
  return null;
}

function detectEmergency(text: string): boolean {
  const t = text.toLowerCase();
  return emergencyKeywords.some((k) => t.includes(k));
}

function makeSessionId() {
  return `smc-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export function AIChatAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: chatWelcomeMessage, ts: Date.now() },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string>(() => makeSessionId());
  const scrollerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const webhookUrl = import.meta.env.VITE_N8N_CHAT_WEBHOOK_URL as string | undefined;

  useEffect(() => {
    scrollerRef.current?.scrollTo({
      top: scrollerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  const historyForPayload = useMemo(
    () =>
      messages
        .slice(-10)
        .map((m) => ({ role: m.role, content: m.content })),
    [messages],
  );

  async function sendMessage(text: string) {
    const clean = text.trim();
    if (!clean || loading) return;
    setError(null);
    const isEmergency = detectEmergency(clean);
    const userMsg: ChatMessage = { role: "user", content: clean, ts: Date.now(), isEmergency };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    try {
      if (!webhookUrl) {
        await new Promise((r) => setTimeout(r, 700));
        setMessages((m) => [
          ...m,
          {
            role: "assistant",
            ts: Date.now(),
            content:
              "Thanks for your message! Our AI assistant isn't fully connected yet. Please call **" +
              clinic.phone +
              "** or visit us in Vijay Nagar, Indore. \n\n_Set `VITE_N8N_CHAT_WEBHOOK_URL` to enable the AI-powered assistant._",
          },
        ]);
        return;
      }

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 45000);

      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          sessionId,
          message: clean,
          conversationHistory: historyForPayload,
          source: "clinic-website",
          clinicName: clinic.name,
          timestamp: new Date().toISOString(),
        }),
      });

      clearTimeout(timeout);
      if (!res.ok) throw new Error(`Request failed (${res.status})`);

      const contentType = res.headers.get("content-type") || "";
      let reply: string | null = null;
      if (contentType.includes("application/json")) {
        reply = normalizeResponse(await res.json());
      } else {
        const text = await res.text();
        reply = text.trim() || null;
      }

      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          ts: Date.now(),
          content:
            reply ||
            "We could not process the response correctly. Please try again or contact the clinic.",
        },
      ]);
    } catch (err) {
      const isAbort = err instanceof DOMException && err.name === "AbortError";
      const msg = isAbort
        ? "The request took too long. Please try again."
        : "The AI assistant is temporarily unavailable. Please try again or call the clinic at " +
          clinic.phone +
          ".";
      setError(msg);
      toast.error("Chat error", { description: msg });
    } finally {
      setLoading(false);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    sendMessage(input);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  function resetChat() {
    setMessages([{ role: "assistant", content: chatWelcomeMessage, ts: Date.now() }]);
    setSessionId(makeSessionId());
    setError(null);
    requestAnimationFrame(() => inputRef.current?.focus());
  }

  const lastUserWasEmergency = messages.slice().reverse().find((m) => m.role === "user")?.isEmergency;

  return (
    <section id="assistant" className="py-20 lg:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-primary">
            <Sparkles className="h-3.5 w-3.5" /> AI Patient Assistant
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold font-heading text-foreground">
            Ask Shrivastav Clinic AI
          </h2>
          <p className="mt-4 text-muted-foreground">
            Ask about doctors, consultation booking, fees, clinic services, timings, pharmacy
            support, pathology, diagnostic centres, or the next appropriate step.
          </p>
        </div>

        <div className="mt-6 rounded-2xl bg-warning/10 border border-warning/30 p-4 flex gap-3">
          <ShieldAlert className="h-5 w-5 text-warning shrink-0 mt-0.5" />
          <p className="text-sm text-foreground/80">
            This assistant provides general informational and clinic-related guidance only. It does
            not diagnose medical conditions, prescribe medicines, recommend drug dosages, or replace
            consultation with a qualified healthcare professional. For severe or emergency symptoms,
            call emergency services or contact the clinic immediately.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="p-4 border-b border-border flex items-center justify-between gap-3 bg-gradient-to-r from-primary/5 to-teal/5">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary to-teal grid place-items-center text-primary-foreground">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-semibold">Shrivastav Clinic AI</div>
                <div className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                  Online — powered by our care team
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={resetChat}
              className="rounded-full text-xs"
            >
              <RotateCcw className="h-3.5 w-3.5 mr-1" /> New conversation
            </Button>
          </div>

          {/* Emergency banner */}
          {lastUserWasEmergency && (
            <div className="p-4 bg-destructive/10 border-b border-destructive/30 flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="flex items-start gap-2">
                <Siren className="h-5 w-5 text-destructive mt-0.5" />
                <p className="text-sm text-destructive font-medium">
                  This may require urgent medical attention. Call local emergency services or contact
                  the clinic immediately.
                </p>
              </div>
              <div className="flex gap-2 sm:ml-auto shrink-0">
                <Button asChild size="sm" variant="destructive" className="rounded-full">
                  <a href={`tel:${clinic.phoneRaw}`}>Call Clinic</a>
                </Button>
                <Button asChild size="sm" variant="outline" className="rounded-full border-destructive text-destructive">
                  <a href={`tel:${clinic.emergencyNumber}`}>Call {clinic.emergencyNumber}</a>
                </Button>
              </div>
            </div>
          )}

          {/* Messages */}
          <div
            ref={scrollerRef}
            className="p-4 sm:p-6 space-y-4 min-h-[360px] max-h-[520px] overflow-y-auto"
          >
            {messages.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn("flex gap-3", m.role === "user" && "flex-row-reverse")}
              >
                <div
                  className={cn(
                    "h-8 w-8 rounded-full grid place-items-center shrink-0",
                    m.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-primary/10 text-primary",
                  )}
                >
                  {m.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </div>
                <div
                  className={cn(
                    "rounded-2xl p-3 text-sm max-w-[85%] leading-relaxed",
                    m.role === "user"
                      ? "rounded-tr-sm bg-primary text-primary-foreground"
                      : "rounded-tl-sm bg-muted text-foreground/90",
                  )}
                >
                  {m.role === "assistant" ? (
                    <div className="prose prose-sm max-w-none prose-p:my-1.5 prose-headings:my-2 prose-ul:my-2 prose-li:my-0.5">
                      <ReactMarkdown>{m.content}</ReactMarkdown>
                    </div>
                  ) : (
                    m.content
                  )}
                </div>
              </motion.div>
            ))}

            {loading && (
              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-full bg-primary/10 text-primary grid place-items-center">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="rounded-2xl rounded-tl-sm bg-muted p-3 text-sm text-muted-foreground inline-flex items-center gap-2">
                  <span className="flex gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary/60 animate-bounce [animation-delay:-0.3s]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-primary/60 animate-bounce [animation-delay:-0.15s]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-primary/60 animate-bounce" />
                  </span>
                  Clinic AI is preparing a response…
                </div>
              </div>
            )}

            {error && !loading && (
              <div className="rounded-xl bg-destructive/10 border border-destructive/30 p-3 text-sm text-destructive">
                <div className="font-medium">{error}</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="rounded-full"
                    onClick={() => {
                      const last = [...messages].reverse().find((m) => m.role === "user");
                      if (last) sendMessage(last.content);
                    }}
                  >
                    <RefreshCw className="h-3.5 w-3.5 mr-1" /> Retry
                  </Button>
                  <Button asChild size="sm" variant="outline" className="rounded-full">
                    <a href={`tel:${clinic.phoneRaw}`}>
                      <Phone className="h-3.5 w-3.5 mr-1" /> Call Clinic
                    </a>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="rounded-full"
                    onClick={() => document.getElementById("query")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    Submit One-Time Query
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Prompt chips */}
          <div className="px-4 sm:px-6 pt-1 pb-3 border-t border-border">
            <div className="flex flex-wrap gap-1.5 pt-3">
              {suggestedPrompts.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => sendMessage(p)}
                  disabled={loading}
                  className="text-xs px-3 py-1.5 rounded-full border border-border bg-background text-foreground/75 hover:border-primary/40 hover:text-primary transition-colors disabled:opacity-50"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Composer */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-border bg-muted/30">
            <div className="flex gap-2 items-end">
              <Textarea
                id="chat-input"
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about doctors, appointments, services, timings…"
                rows={1}
                className="flex-1 rounded-xl resize-none min-h-[44px] max-h-32 bg-background"
              />
              <Button
                type="submit"
                disabled={loading || input.trim().length === 0}
                size="icon"
                className="h-11 w-11 rounded-full shrink-0"
                aria-label="Send message"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </Button>
            </div>
            <div className="mt-2 text-[11px] text-muted-foreground">
              Press Enter to send · Shift+Enter for a new line
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
