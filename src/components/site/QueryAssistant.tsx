import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import ReactMarkdown from "react-markdown";
import { Bot, Send, ShieldAlert, User, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { queryCategories } from "@/lib/clinic-data";
import { cn } from "@/lib/utils";

type FormValues = {
  fullName: string;
  phone: string;
  email?: string;
  query: string;
  consent: boolean;
};

type ChatMessage = { role: "user" | "assistant"; content: string };

export function QueryAssistant() {
  const [category, setCategory] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { fullName: "", phone: "", email: "", query: "", consent: false },
    mode: "onChange",
  });

  const watched = watch();
  const canSubmit =
    watched.fullName.trim().length > 1 &&
    /^[0-9+\-\s()]{8,15}$/.test(watched.phone.trim()) &&
    watched.query.trim().length > 3 &&
    watched.consent === true &&
    !loading;

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    setMessages((m) => [...m, { role: "user", content: values.query }]);

    const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL as string | undefined;

    try {
      if (!webhookUrl) {
        // Graceful fallback when webhook isn't configured yet.
        await new Promise((r) => setTimeout(r, 900));
        setMessages((m) => [
          ...m,
          {
            role: "assistant",
            content:
              "Thanks for your query! Our clinic assistant isn't fully connected yet. Please call **+91 98765 43210** or visit us at Vijay Nagar, Indore, and our team will be happy to help.\n\n_Set `VITE_N8N_WEBHOOK_URL` to enable the AI-powered assistant._",
          },
        ]);
      } else {
        const res = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fullName: values.fullName,
            phone: values.phone,
            email: values.email || null,
            category,
            query: values.query,
            timestamp: new Date().toISOString(),
          }),
        });

        if (!res.ok) throw new Error(`Request failed (${res.status})`);
        const contentType = res.headers.get("content-type") || "";
        let reply = "";
        if (contentType.includes("application/json")) {
          const data = await res.json();
          reply =
            data.reply ||
            data.message ||
            data.output ||
            data.response ||
            (typeof data === "string" ? data : JSON.stringify(data, null, 2));
        } else {
          reply = await res.text();
        }
        setMessages((m) => [
          ...m,
          { role: "assistant", content: reply || "Thank you. Our team will get back to you shortly." },
        ]);
      }

      reset({ ...values, query: "", consent: true });
      toast.success("Query sent successfully");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      toast.error(`Unable to send query: ${msg}`);
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "Sorry — we couldn't reach the clinic assistant right now. Please try again in a moment or call us directly at **+91 98765 43210**.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="query" className="py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-primary">
            <Sparkles className="h-3.5 w-3.5" /> Patient Query Assistant
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold font-heading text-foreground">
            Ask your health or clinic query
          </h2>
          <p className="mt-4 text-muted-foreground">
            Ask general questions about doctors, clinic services, consultation categories, pathology
            support, diagnostic facilities, or the next appropriate step.
          </p>
        </div>

        <div className="mt-6 max-w-3xl mx-auto rounded-2xl bg-warning/10 border border-warning/30 p-4 flex gap-3">
          <ShieldAlert className="h-5 w-5 text-warning shrink-0 mt-0.5" />
          <p className="text-sm text-foreground/80">
            This assistant provides general informational guidance only. It does not diagnose medical
            conditions, prescribe medicines, or replace consultation with a qualified healthcare
            professional.
          </p>
        </div>

        <div className="mt-10 grid lg:grid-cols-5 gap-6">
          {/* Chat panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] flex flex-col overflow-hidden"
          >
            <div className="p-4 border-b border-border flex items-center gap-3 bg-gradient-to-r from-primary/5 to-teal/5">
              <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary to-teal grid place-items-center text-primary-foreground">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-semibold">Clinic Assistant</div>
                <div className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                  Online — powered by our care team
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6 space-y-4 min-h-[320px] max-h-[480px] overflow-y-auto">
              {messages.length === 0 && (
                <div className="flex gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 text-primary grid place-items-center shrink-0">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="rounded-2xl rounded-tl-sm bg-muted p-3 text-sm text-foreground/85 max-w-[85%]">
                    Namaste! 👋 I'm the Aarogya Care assistant. Ask me about our doctors, services,
                    fees, timings, or general health guidance and I'll help you find the right next step.
                  </div>
                </div>
              )}

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
                      <div className="prose prose-sm max-w-none prose-p:my-1.5 prose-headings:my-2">
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
                    <Loader2 className="h-4 w-4 animate-spin" /> Thinking...
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Form panel */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            onSubmit={handleSubmit(onSubmit)}
            className="lg:col-span-2 rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] p-5 sm:p-6 space-y-4"
          >
            <div>
              <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Query Category
              </Label>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {queryCategories.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCategory(category === c ? null : c)}
                    className={cn(
                      "text-xs px-3 py-1.5 rounded-full border transition-all",
                      category === c
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background text-foreground/70 border-border hover:border-primary/40 hover:text-foreground",
                    )}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                placeholder="Your name"
                {...register("fullName", { required: true, minLength: 2, maxLength: 80 })}
                className="mt-1.5 rounded-xl"
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+91 98765 43210"
                {...register("phone", {
                  required: true,
                  pattern: /^[0-9+\-\s()]{8,15}$/,
                })}
                className="mt-1.5 rounded-xl"
              />
              {errors.phone && (
                <p className="mt-1 text-xs text-destructive">Enter a valid phone number</p>
              )}
            </div>

            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com (optional)"
                {...register("email", { maxLength: 120 })}
                className="mt-1.5 rounded-xl"
              />
            </div>

            <div>
              <Label htmlFor="query">Your Query *</Label>
              <Textarea
                id="query"
                placeholder="Describe your question or concern..."
                rows={4}
                {...register("query", { required: true, minLength: 4, maxLength: 1000 })}
                className="mt-1.5 rounded-xl resize-none"
              />
            </div>

            <label className="flex items-start gap-2.5 text-xs text-muted-foreground leading-relaxed cursor-pointer">
              <Checkbox
                checked={watched.consent}
                onCheckedChange={(v) => setValue("consent", v === true, { shouldValidate: true })}
                className="mt-0.5"
              />
              <span>
                I understand that this assistant provides general information and is not a
                substitute for professional medical diagnosis, prescription, or emergency care.
              </span>
            </label>

            <Button
              type="submit"
              disabled={!canSubmit}
              className="w-full rounded-full h-11 shadow-[var(--shadow-elegant)]"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Sending...
                </>
              ) : (
                <>
                  Ask Clinic Assistant <Send className="h-4 w-4" />
                </>
              )}
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
