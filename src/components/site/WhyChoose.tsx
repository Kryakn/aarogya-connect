import { motion } from "framer-motion";
import {
  GraduationCap,
  HeartHandshake,
  Layers,
  Wallet,
  Link2,
  MessagesSquare,
  Sparkles,
  MapPin,
} from "lucide-react";

const items = [
  { icon: GraduationCap, title: "Experienced Doctors", desc: "Qualified doctors with practical clinical experience." },
  { icon: HeartHandshake, title: "Patient-Friendly Care", desc: "Clear communication, respectful consultation, approachable doctors." },
  { icon: Layers, title: "Multiple Specializations", desc: "General medicine, pediatrics, and women's health in one clinic." },
  { icon: Wallet, title: "Affordable Consultation", desc: "Reasonable fees with transparent information." },
  { icon: Link2, title: "Connected Facilities", desc: "Pharmacy, pathology, and diagnostic support nearby." },
  { icon: MessagesSquare, title: "Easy Query Assistance", desc: "Ask clinic and general health queries online." },
  { icon: Sparkles, title: "Clean Environment", desc: "Well-maintained, hygienic, and comfortable infrastructure." },
  { icon: MapPin, title: "Convenient Location", desc: "Easy access with clear contact and map information." },
];

export function WhyChoose() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-xs font-semibold tracking-widest uppercase text-primary">Why Choose Us</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold font-heading text-foreground">
            Care built around you
          </h2>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className="relative p-6 rounded-2xl bg-card border border-border shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-card)] transition-all"
            >
              <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary grid place-items-center">
                <it.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-semibold">{it.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{it.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
