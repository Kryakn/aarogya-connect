import { motion } from "framer-motion";
import {
  Stethoscope,
  Baby,
  HeartPulse,
  ShieldCheck,
  Activity,
  Bandage,
  Syringe,
  RefreshCw,
} from "lucide-react";
import { Card } from "@/components/ui/card";

const services = [
  { icon: Stethoscope, name: "General Consultation", desc: "Diagnosis and consultation for common illnesses and routine health concerns.", doctor: "Dr. Amit Sharma" },
  { icon: Baby, name: "Pediatric Care", desc: "Child health consultation, growth monitoring, nutrition guidance, and vaccination support.", doctor: "Dr. Neha Verma" },
  { icon: HeartPulse, name: "Women's Health", desc: "Gynecology consultation, menstrual health support, pregnancy guidance, and preventive care.", doctor: "Dr. Priya Mehta" },
  { icon: ShieldCheck, name: "Preventive Checkups", desc: "Routine health screenings and preventive consultation." },
  { icon: Activity, name: "Diabetes & BP Monitoring", desc: "Basic monitoring and follow-up guidance." },
  { icon: Bandage, name: "Minor Injury Care", desc: "Initial care for minor cuts, wounds, sprains, and common injuries." },
  { icon: Syringe, name: "Vaccination Guidance", desc: "Information about routine vaccination and follow-up support." },
  { icon: RefreshCw, name: "Follow-Up Consultation", desc: "Continued monitoring after a previous consultation." },
];

export function Services() {
  return (
    <section id="services" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-xs font-semibold tracking-widest uppercase text-primary">Medical Services</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold font-heading text-foreground">
            Comprehensive care under one roof
          </h2>
          <p className="mt-4 text-muted-foreground">
            From routine consultation to specialized care, we've got your family covered.
          </p>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
            >
              <Card className="h-full p-6 rounded-2xl border-border shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-card)] hover:border-primary/30 transition-all group">
                <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-primary/10 to-teal/10 grid place-items-center text-primary group-hover:scale-110 transition-transform">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-semibold text-foreground">{s.name}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                {s.doctor && (
                  <p className="mt-3 text-xs font-medium text-teal">With {s.doctor}</p>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
