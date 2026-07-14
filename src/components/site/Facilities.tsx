import { motion } from "framer-motion";
import { Pill, TestTubes, ScanLine, CheckCircle2, Info } from "lucide-react";
import { Card } from "@/components/ui/card";

const facilities = [
  {
    icon: Pill,
    title: "Attached Medical Store",
    tone: "primary",
    items: [
      "Prescription medicine availability",
      "Common over-the-counter medicines",
      "Basic healthcare products",
      "Easy access near the clinic",
      "Medicine availability support",
    ],
  },
  {
    icon: TestTubes,
    title: "Pathology Support",
    tone: "teal",
    items: [
      "Blood sample collection",
      "Urine testing",
      "Thyroid testing",
      "Blood sugar testing",
      "CBC testing",
      "Preventive health packages",
      "Report coordination",
    ],
  },
  {
    icon: ScanLine,
    title: "Diagnostic Center Support",
    tone: "cyan",
    items: [
      "X-ray referral support",
      "Ultrasound referral support",
      "ECG support",
      "Basic diagnostic coordination",
      "Partner diagnostic center assistance",
    ],
  },
];

const toneMap: Record<string, string> = {
  primary: "from-primary/10 to-primary/5 text-primary",
  teal: "from-teal/15 to-teal/5 text-teal",
  cyan: "from-cyan/25 to-cyan/5 text-secondary",
};

export function Facilities() {
  return (
    <section id="facilities" className="py-20 lg:py-28 bg-muted/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-xs font-semibold tracking-widest uppercase text-primary">
            Attached Healthcare Facilities
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold font-heading text-foreground">
            Everything you need, in one visit
          </h2>
          <p className="mt-4 text-muted-foreground">
            Pharmacy, pathology, and diagnostic coordination — right beside your consultation.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {facilities.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Card className="h-full p-6 rounded-2xl border-border shadow-[var(--shadow-soft)]">
                <div className={`h-12 w-12 rounded-xl bg-gradient-to-br grid place-items-center ${toneMap[f.tone]}`}>
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-bold font-heading">{f.title}</h3>
                <ul className="mt-4 space-y-2">
                  {f.items.map((it) => (
                    <li key={it} className="flex items-start gap-2 text-sm text-foreground/80">
                      <CheckCircle2 className="h-4 w-4 mt-0.5 text-success shrink-0" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 flex items-start gap-3 rounded-2xl bg-warning/10 border border-warning/30 p-4 max-w-3xl mx-auto">
          <Info className="h-5 w-5 text-warning shrink-0 mt-0.5" />
          <p className="text-sm text-foreground/80">
            Exact test availability may vary. Patients should confirm before visiting.
          </p>
        </div>
      </div>
    </section>
  );
}
