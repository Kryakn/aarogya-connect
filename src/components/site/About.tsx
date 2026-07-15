import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

const stats = [
  { value: "3", label: "Experienced Doctors" },
  { value: "15+", label: "Medical Services" },
  { value: "10,000+", label: "Patients Served" },
  { value: "6 Days", label: "Open Every Week" },
  { value: "3", label: "Connected Facilities" },
];

export function About() {
  return (
    <section id="about" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-xs font-semibold tracking-widest uppercase text-primary">
            About Our Clinic
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold font-heading text-foreground">
            Ethical, affordable, and patient-first care
          </h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            Shrivastav Multispeciality Clinic is a patient-focused healthcare centre offering
            general medicine, paediatric care, women's health consultation, preventive care,
            pharmacy access, pathology support, and diagnostic coordination. We focus on clear
            communication, affordable consultation, ethical practices, hygiene, privacy, and
            convenient access to essential services.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Card className="p-6 text-center border-border rounded-2xl shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-card)] transition-shadow">
                <div className="text-3xl sm:text-4xl font-bold font-heading bg-gradient-to-br from-primary to-teal bg-clip-text text-transparent">
                  {s.value}
                </div>
                <div className="mt-2 text-sm text-muted-foreground">{s.label}</div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
