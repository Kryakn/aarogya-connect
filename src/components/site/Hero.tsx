import { motion } from "framer-motion";
import { ArrowRight, Users, Award, HeartHandshake, Sparkles, Phone } from "lucide-react";
import { FaTelegramPlane } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import clinicHero from "@/assets/clinic-hero.jpg";
import { clinic } from "@/lib/clinic-data";

const trust = [
  { icon: Users, label: "3 Experienced Doctors" },
  { icon: Award, label: "10+ Years Avg. Experience" },
  { icon: HeartHandshake, label: "Patient-Friendly Care" },
  { icon: Sparkles, label: "AI-Powered Assistance" },
];

function focusChatInput() {
  requestAnimationFrame(() => {
    const el = document.getElementById("chat-input") as HTMLTextAreaElement | null;
    el?.focus();
  });
}

export function Hero() {
  return (
    <section id="home" className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 via-background to-background" />
      <div className="absolute top-24 -right-24 h-72 w-72 bg-cyan/20 rounded-full blur-3xl -z-10" />
      <div className="absolute top-64 -left-24 h-72 w-72 bg-teal/15 rounded-full blur-3xl -z-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-4 py-1.5 text-xs font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
            {clinic.name} · Vijay Nagar, Indore
          </div>
          <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold font-heading text-foreground leading-[1.1]">
            Complete Healthcare for{" "}
            <span className="bg-gradient-to-r from-primary to-teal bg-clip-text text-transparent">
              You and Your Family
            </span>
          </h1>
          <p className="mt-5 text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed">
            Consult experienced doctors, access trusted diagnostic and pharmacy support, and get
            quick AI-powered assistance for appointments, services, timings, and general
            clinic-related queries.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full px-6 border-destructive/40 text-destructive hover:bg-destructive/5 hover:text-destructive"
            >
              <a href={`tel:${clinic.phoneRaw}`}>
                <Phone className="mr-1 h-4 w-4" /> Call for Emergency
              </a>
            </Button>
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="rounded-full px-6 border-[#229ED9]/40 text-[#229ED9] hover:bg-[#229ED9]/10 hover:text-[#229ED9]"
                  >
                    <a
                      href="https://t.me/Doc_Assistant"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Chat with Doc_Assistant on Telegram"
                    >
                      <FaTelegramPlane className="mr-1 h-4 w-4" /> Chat on Telegram
                    </a>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Continue chatting with our AI Assistant on Telegram</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Button
              size="lg"
              className="rounded-full px-6 shadow-[var(--shadow-elegant)]"
              onClick={() => {
                document.getElementById("assistant")?.scrollIntoView({ behavior: "smooth" });
                focusChatInput();
              }}
            >
              Ask AI Assistant <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full px-6">
              <a href="#doctors">Meet Our Doctors</a>
            </Button>
          </div>

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {trust.map((t) => (
              <div key={t.label} className="flex items-start gap-2">
                <div className="mt-0.5 h-8 w-8 shrink-0 rounded-lg bg-primary/10 grid place-items-center text-primary">
                  <t.icon className="h-4 w-4" />
                </div>
                <div className="text-xs font-medium text-foreground leading-snug">{t.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative"
        >
          <div className="relative rounded-3xl overflow-hidden shadow-[var(--shadow-elegant)] border border-border">
            <img
              src={clinicHero}
              alt={`${clinic.name} interior`}
              width={1600}
              height={1100}
              className="w-full h-[420px] lg:h-[520px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute -bottom-6 -left-4 sm:left-6 bg-card border border-border rounded-2xl p-4 shadow-[var(--shadow-card)] max-w-[240px]"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-success/15 grid place-items-center text-success">
                <HeartHandshake className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-semibold">10,000+ Patients</div>
                <div className="text-xs text-muted-foreground">Trust our care</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
