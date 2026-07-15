import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Loader2, CheckCircle2, AlertTriangle, RefreshCw, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { clinic, doctors } from "@/lib/clinic-data";

const today = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

const schema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name").max(80),
  email: z.string().trim().email("Enter a valid email address").max(120),
  phone: z
    .string()
    .trim()
    .optional()
    .refine((v) => !v || /^[0-9+\-\s()]{8,15}$/.test(v), "Enter a valid phone number"),
  age: z
    .coerce.number({ invalid_type_error: "Enter your age" })
    .int()
    .min(0, "Age must be 0 or more")
    .max(120, "Enter a valid age"),
  gender: z.enum(["Male", "Female", "Other", "Prefer not to say"], {
    required_error: "Select an option",
  }),
  query: z.string().trim().min(6, "Please describe your query").max(1500),
  preferredDoctor: z.string().optional(),
  preferredVisitDate: z
    .string()
    .optional()
    .refine((v) => !v || v >= today(), "Date cannot be in the past"),
  city: z.string().trim().max(60).optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Consent is required" }),
  }),
});

type FormValues = z.infer<typeof schema>;

type SubmitState =
  | { kind: "idle" }
  | { kind: "success"; referenceId?: string }
  | { kind: "error"; message: string };

export function OneTimeQueryForm() {
  const [state, setState] = useState<SubmitState>({ kind: "idle" });
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      age: undefined as unknown as number,
      gender: undefined as unknown as FormValues["gender"],
      query: "",
      preferredDoctor: "No preference",
      preferredVisitDate: "",
      city: "",
      consent: false as unknown as true,
    },
  });

  const webhookUrl = import.meta.env.VITE_N8N_QUERY_WEBHOOK_URL as string | undefined;
  const consent = watch("consent");

  async function onSubmit(values: FormValues) {
    setState({ kind: "idle" });
    try {
      if (!webhookUrl) {
        await new Promise((r) => setTimeout(r, 700));
        setState({ kind: "success", referenceId: `LOCAL-${Date.now().toString(36).toUpperCase()}` });
        toast.success("Query saved (demo mode)", {
          description: "Set VITE_N8N_QUERY_WEBHOOK_URL to enable email delivery.",
        });
        reset();
        return;
      }

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 30000);

      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          fullName: values.fullName,
          email: values.email,
          phone: values.phone || null,
          age: values.age,
          gender: values.gender,
          query: values.query,
          preferredDoctor: values.preferredDoctor || null,
          preferredVisitDate: values.preferredVisitDate || null,
          city: values.city || null,
          consentAccepted: values.consent === true,
          source: "clinic-website-one-time-query",
          clinicName: clinic.name,
          submittedAt: new Date().toISOString(),
        }),
      });

      clearTimeout(timeout);
      if (!res.ok) throw new Error(`Request failed (${res.status})`);

      let referenceId: string | undefined;
      const contentType = res.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        const data = (await res.json()) as Record<string, unknown>;
        referenceId =
          (data.referenceId as string | undefined) ||
          (data.submissionId as string | undefined) ||
          (data.ticketId as string | undefined);
      }

      setState({ kind: "success", referenceId });
      toast.success("Query submitted");
      reset();
    } catch (err) {
      const isAbort = err instanceof DOMException && err.name === "AbortError";
      const message = isAbort
        ? "The request took too long. Please try again."
        : "We could not submit your query. Please try again or contact the clinic directly.";
      setState({ kind: "error", message });
      toast.error("Submission failed", { description: message });
    }
  }

  return (
    <section id="query" className="py-20 lg:py-28 bg-muted/40">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-primary">
            <Mail className="h-3.5 w-3.5" /> One-Time Query
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold font-heading text-foreground">
            No time to chat? Submit a one-time query
          </h2>
          <p className="mt-4 text-muted-foreground">
            Submit your question and receive a response through email. Our clinic team or
            AI-assisted workflow will get back to you.
          </p>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit(onSubmit)}
          className="mt-10 rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] p-6 sm:p-8 grid sm:grid-cols-2 gap-4"
        >
          <Field label="Full Name *" error={errors.fullName?.message}>
            <Input {...register("fullName")} placeholder="Your name" className="rounded-xl" />
          </Field>

          <Field label="Email Address *" error={errors.email?.message}>
            <Input type="email" {...register("email")} placeholder="you@example.com" className="rounded-xl" />
          </Field>

          <Field label="Age *" error={errors.age?.message}>
            <Input type="number" min={0} max={120} {...register("age")} className="rounded-xl" />
          </Field>

          <Field label="Gender *" error={errors.gender?.message}>
            <Select
              value={watch("gender")}
              onValueChange={(v) =>
                setValue("gender", v as FormValues["gender"], { shouldValidate: true })
              }
            >
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                {["Male", "Female", "Other", "Prefer not to say"].map((g) => (
                  <SelectItem key={g} value={g}>
                    {g}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field label="Phone Number" error={errors.phone?.message}>
            <Input
              type="tel"
              {...register("phone")}
              placeholder="+91 98765 43210 (optional)"
              className="rounded-xl"
            />
          </Field>

          <Field label="Preferred Doctor">
            <Select
              value={watch("preferredDoctor")}
              onValueChange={(v) => setValue("preferredDoctor", v, { shouldValidate: true })}
            >
              <SelectTrigger className="rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="No preference">No preference</SelectItem>
                {doctors.map((d) => (
                  <SelectItem key={d.id} value={d.name}>
                    {d.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field label="Preferred Visit Date" error={errors.preferredVisitDate?.message}>
            <Input type="date" min={today()} {...register("preferredVisitDate")} className="rounded-xl" />
          </Field>

          <Field label="City">
            <Input {...register("city")} placeholder="Indore" className="rounded-xl" />
          </Field>

          <div className="sm:col-span-2">
            <Field label="Your Query *" error={errors.query?.message}>
              <Textarea
                rows={4}
                {...register("query")}
                placeholder="Describe your question, consultation requirement, or clinic-related concern…"
                className="rounded-xl resize-none"
              />
            </Field>
          </div>

          <div className="sm:col-span-2 rounded-xl bg-muted/60 border border-border p-3">
            <label className="flex items-start gap-2.5 text-xs text-muted-foreground leading-relaxed cursor-pointer">
              <Checkbox
                checked={consent === true}
                onCheckedChange={(v) =>
                  setValue("consent", (v === true) as true, { shouldValidate: true })
                }
                className="mt-0.5"
              />
              <span>
                I understand that this service provides general informational and clinic-related
                assistance and is not a substitute for professional medical diagnosis, prescription,
                treatment, or emergency care.
              </span>
            </label>
            {errors.consent && (
              <p className="mt-1 text-xs text-destructive ml-7">{errors.consent.message}</p>
            )}
          </div>

          <p className="sm:col-span-2 text-[11px] text-muted-foreground">
            Please avoid sharing highly sensitive medical documents, passwords, financial
            information, or identity documents through this form.
          </p>

          <div className="sm:col-span-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 justify-between">
            <Button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="rounded-full h-11 px-6 shadow-[var(--shadow-elegant)]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Submitting your query…
                </>
              ) : (
                "Submit Query"
              )}
            </Button>

            {state.kind === "success" && (
              <div className="flex items-start gap-2 text-sm text-success">
                <CheckCircle2 className="h-4 w-4 mt-0.5" />
                <div>
                  Your query has been submitted successfully. A response will be sent to your email.
                  {state.referenceId && (
                    <div className="text-xs text-muted-foreground mt-0.5">
                      Reference: <span className="font-mono">{state.referenceId}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {state.kind === "error" && (
            <div className="sm:col-span-2 rounded-xl bg-destructive/10 border border-destructive/30 p-3 text-sm text-destructive">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 mt-0.5" />
                <div className="flex-1">
                  <div className="font-medium">{state.message}</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Button
                      type="submit"
                      size="sm"
                      variant="outline"
                      className="rounded-full"
                    >
                      <RefreshCw className="h-3.5 w-3.5 mr-1" /> Retry
                    </Button>
                    <Button asChild size="sm" variant="outline" className="rounded-full">
                      <a href={`tel:${clinic.phoneRaw}`}>
                        <Phone className="h-3.5 w-3.5 mr-1" /> Call Clinic
                      </a>
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className="rounded-full"
                      onClick={() =>
                        document.getElementById("assistant")?.scrollIntoView({ behavior: "smooth" })
                      }
                    >
                      Open AI Chat
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.form>
      </div>
    </section>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </Label>
      <div className="mt-1.5">{children}</div>
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}
