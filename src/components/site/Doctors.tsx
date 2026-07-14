import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, IndianRupee, Clock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { doctors } from "@/lib/clinic-data";

export function Doctors() {
  const [active, setActive] = useState<(typeof doctors)[number] | null>(null);

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
                      Available
                    </div>
                  )}
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-lg font-bold font-heading text-foreground">{d.name}</h3>
                  <p className="text-sm text-primary font-medium mt-0.5">{d.specialization}</p>

                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" /> {d.experience}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Sparkles className="h-3.5 w-3.5" /> {d.behaviour}
                    </span>
                  </div>

                  <p className="mt-4 text-sm text-muted-foreground line-clamp-3">{d.description}</p>

                  <ul className="mt-4 space-y-1.5">
                    {d.services.slice(0, 4).map((s) => (
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
                    <Button size="sm" variant="outline" className="rounded-full" onClick={() => setActive(d)}>
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
        <DialogContent className="max-w-lg rounded-2xl">
          {active && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4">
                  <img src={active.image} alt={active.name} className="h-16 w-16 rounded-full object-cover object-top" />
                  <div>
                    <DialogTitle className="font-heading">{active.name}</DialogTitle>
                    <p className="text-sm text-primary">{active.specialization}</p>
                  </div>
                </div>
              </DialogHeader>
              <div className="space-y-4 text-sm">
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-muted p-3">
                    <div className="text-xs text-muted-foreground">Experience</div>
                    <div className="font-semibold">{active.experience}</div>
                  </div>
                  <div className="rounded-xl bg-muted p-3">
                    <div className="text-xs text-muted-foreground">Consultation Fee</div>
                    <div className="font-semibold">₹{active.fee}</div>
                  </div>
                </div>
                <p className="text-muted-foreground">{active.description}</p>
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
                <Button asChild className="w-full rounded-full">
                  <a href="#query" onClick={() => setActive(null)}>Ask a Query</a>
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
