import { motion } from "framer-motion";
import { MessagesSquare, CalendarClock, Stethoscope, FlaskConical, PhoneCall } from "lucide-react";
import { Card } from "@/components/ui/card";
import { clinic } from "@/lib/clinic-data";

type Action = {
  icon: typeof MessagesSquare;
  title: string;
  desc: string;
  onClick: () => void;
  accent: string;
};

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function focusChat(prefill?: string) {
  scrollTo("assistant");
  requestAnimationFrame(() => {
    const el = document.getElementById("chat-input") as HTMLTextAreaElement | null;
    if (el) {
      if (prefill) {
        el.value = prefill;
        el.dispatchEvent(new Event("input", { bubbles: true }));
      }
      el.focus();
    }
  });
}

export function QuickActions() {
  const actions: Action[] = [
    {
      icon: MessagesSquare,
      title: "Ask AI",
      desc: "Chat with our clinic assistant",
      onClick: () => focusChat(),
      accent: "from-primary/15 to-primary/5 text-primary",
    },
    {
      icon: CalendarClock,
      title: "Book Consultation",
      desc: "Request an appointment via AI",
      onClick: () => focusChat("I want to book a consultation."),
      accent: "from-teal/15 to-teal/5 text-teal",
    },
    {
      icon: Stethoscope,
      title: "Meet Doctors",
      desc: "View our specialists",
      onClick: () => scrollTo("doctors"),
      accent: "from-cyan/25 to-cyan/10 text-secondary",
    },
    {
      icon: FlaskConical,
      title: "Diagnostic Support",
      desc: "Pathology & lab coordination",
      onClick: () => scrollTo("facilities"),
      accent: "from-primary/15 to-teal/10 text-primary",
    },
    {
      icon: PhoneCall,
      title: "Emergency Call",
      desc: "Reach us instantly by phone",
      onClick: () => {
        window.location.href = `tel:${clinic.phoneRaw}`;
      },
      accent: "from-destructive/15 to-destructive/5 text-destructive",
    },
  ];

  return (
    <section className="py-10 lg:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {actions.map((a, i) => (
            <motion.button
              key={a.title}
              type="button"
              onClick={a.onClick}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className="text-left"
            >
              <Card className="h-full p-4 sm:p-5 rounded-2xl border-border shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-card)] hover:-translate-y-0.5 transition-all">
                <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${a.accent} grid place-items-center mb-3`}>
                  <a.icon className="h-5 w-5" />
                </div>
                <div className="font-semibold text-sm text-foreground">{a.title}</div>
                <div className="mt-0.5 text-xs text-muted-foreground leading-snug">{a.desc}</div>
              </Card>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
