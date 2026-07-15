import { useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  IndianRupee,
  Clock,
  Sparkles,
  Languages,
  GraduationCap,
  Video,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { doctors, type Doctor } from "@/lib/clinic-data";

function focusChat(prefill?: string) {
  document.getElementById("assistant")?.scrollIntoView({ behavior: "smooth" });
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

export function Doctors() {
  const [active, setActive] = useState<Doctor | null>(null);

  return (
    <section id="doctors" className="py-20 lg:py-28 bg-muted/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-xs font-semibold tracking-widest uppercase text-primary">
            Our Doctors
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold font-heading text-foreground">
            Experienced doctors you can trust
          </h2>
          <p className="mt-4 text-muted-foreground">
            Qualified specialists with practical clinical experience, focused on clear
            communication and patient comfort.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((d, i) => (
            <motion.div
              key={d.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Card className="h-full flex flex-col overflow-hidden rounded-2xl border-border shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 duration-300">
                <div className="relative">
                  <img
                    src={d.image}
                    alt={d.name}
                    width={800}
                    height={900}
                    loading="lazy"
                    className="w-full h-64 object-cover object-top"
                  />
                  <Badge className="absolute top-4 left-4 bg-card text-foreground border border-border hover:bg-card">
                    {d.role}
                  </Badge>
                  {d.available && (
                    <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-success/95 text-success-foreground text-xs font-medium px-2.5 py-1 rounded-full">
                      <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                      Available Today
                    </div>
                  )}
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-lg font-bold font-heading text-foreground">{d.name}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{d.qualification}</p>
                  <p className="text-sm text-primary font-medium mt-1">{d.specialization}</p>

                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" /> {d.experience}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Languages className="h-3.5 w-3.5" /> {d.languages.join(", ")}
                    </span>
                  </div>

                  <div className="mt-2 inline-flex items-start gap-1 text-xs text-muted-foreground">
                    <Sparkles className="h-3.5 w-3.5 mt-0.5 shrink-0 text-teal" />
                    <span>{d.behaviour}</span>
                  </div>

                  <div className="mt-3 rounded-xl bg-muted/60 border border-border p-3">
                    <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                      Today's Timings
                    </div>
                    <div className="mt-1 text-sm text-foreground/90">
                      {d.timings.join(" · ")}
                    </div>
                  </div>

                  <p className="mt-4 text-sm text-muted-foreground line-clamp-3">{d.description}</p>

                  <ul className="mt-3 space-y-1.5">
                    {d.services.slice(0, 3).map((s) => (
                      <li key={s} className="flex items-start gap-2 text-sm text-foreground/80">
                        <CheckCircle2 className="h-4 w-4 mt-0.5 text-teal shrink-0" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                    <div className="inline-flex items-center gap-1 bg-primary/10 text-primary rounded-full px-3 py-1 text-sm font-semibold">
                      <IndianRupee className="h-3.5 w-3.5" />
                      {d.fee}
                      <span className="text-xs font-normal opacity-80 ml-0.5">/ consult</span>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-full"
                      onClick={() => setActive(d)}
                    >
                      View Profile
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-2xl rounded-2xl max-h-[90vh] overflow-y-auto">
          {active && (
            <>
              <DialogHeader>
                <div className="flex items-start gap-4">
                  <img
                    src={active.image}
                    alt={active.name}
                    className="h-20 w-20 rounded-2xl object-cover object-top border border-border"
                  />
                  <div className="flex-1 min-w-0">
                    <DialogTitle className="font-heading text-xl">{active.name}</DialogTitle>
                    <div className="mt-1 text-xs text-muted-foreground inline-flex items-center gap-1">
                      <GraduationCap className="h-3.5 w-3.5" /> {active.qualification}
                    </div>
                    <p className="mt-1 text-sm text-primary font-medium">{active.specialization}</p>
                    {active.available && (
                      <div className="mt-2 inline-flex items-center gap-1.5 bg-success/15 text-success text-xs font-semibold px-2.5 py-0.5 rounded-full">
                        <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                        Available Today
                      </div>
                    )}
                  </div>
                </div>
              </DialogHeader>
              <div className="space-y-4 text-sm">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <InfoTile label="Experience" value={active.experience} />
                  <InfoTile label="Consultation Fee" value={`₹${active.fee}`} />
                  <InfoTile label="Languages" value={active.languages.join(", ")} />
                  <InfoTile label="Behaviour" value={active.behaviour} />
                </div>

                <div className="rounded-xl bg-muted/60 border border-border p-4">
                  <div className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">
                    Timings
                  </div>
                  <div className="mt-1.5 text-sm text-foreground/90">
                    {active.timings.map((t) => (
                      <div key={t} className="inline-flex items-center gap-1.5 mr-3">
                        <Clock className="h-3.5 w-3.5 text-primary" /> {t}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-sm font-semibold mb-2 inline-flex items-center gap-1.5">
                    <Video className="h-4 w-4 text-primary" /> Consultation Modes
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {active.modes.map((m) => (
                      <span
                        key={m}
                        className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed">{active.bio}</p>

                <div>
                  <div className="text-sm font-semibold mb-2">Services offered</div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {active.services.map((s) => (
                      <li key={s} className="flex items-start gap-2 text-foreground/80">
                        <CheckCircle2 className="h-4 w-4 mt-0.5 text-teal shrink-0" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 pt-2">
                  <Button
                    className="flex-1 rounded-full"
                    onClick={() => {
                      const name = active.name;
                      setActive(null);
                      focusChat(`I want to book a consultation with ${name}.`);
                    }}
                  >
                    Book Consultation
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 rounded-full"
                    onClick={() => {
                      const name = active.name;
                      setActive(null);
                      focusChat(
                        `Please tell me more about ${name}, their availability, services, and consultation fee.`,
                      );
                    }}
                  >
                    Ask AI About This Doctor
                  </Button>
                  <Button
                    variant="ghost"
                    className="rounded-full sm:w-11"
                    onClick={() => setActive(null)}
                    aria-label="Close"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

function InfoTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-muted/60 border border-border p-3">
      <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
        {label}
      </div>
      <div className="mt-0.5 text-sm font-semibold text-foreground">{value}</div>
    </div>
  );
}
