import { motion } from "framer-motion";
import {
  Sparkles,
  Sofa,
  SprayCan,
  Stethoscope,
  Wind,
  Droplets,
  UserCheck,
  Users,
  Lock,
  Armchair,
  Bath,
  MonitorSmartphone,
} from "lucide-react";
import { gallery } from "@/lib/clinic-data";

const points = [
  { icon: Sparkles, text: "Clean consultation rooms" },
  { icon: Sofa, text: "Hygienic waiting area" },
  { icon: SprayCan, text: "Regular sanitization" },
  { icon: Stethoscope, text: "Sanitized medical equipment" },
  { icon: Wind, text: "Proper ventilation" },
  { icon: Droplets, text: "Safe drinking water" },
  { icon: UserCheck, text: "Reception assistance" },
  { icon: Users, text: "Organized patient flow" },
  { icon: Lock, text: "Privacy-focused consultation" },
  { icon: Armchair, text: "Comfortable seating" },
  { icon: Bath, text: "Clean washroom access" },
  { icon: MonitorSmartphone, text: "Digital record-ready setup" },
];

export function Infrastructure() {
  return (
    <section className="py-20 lg:py-28 bg-muted/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-xs font-semibold tracking-widest uppercase text-primary">
            Infrastructure & Hygiene
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold font-heading text-foreground">
            A clean, calm space to feel cared for
          </h2>
        </div>

        <div className="mt-14 grid lg:grid-cols-2 gap-10 items-start">
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {points.map((p, i) => (
              <motion.div
                key={p.text}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                className="flex items-center gap-3 rounded-xl bg-card border border-border p-3"
              >
                <div className="h-8 w-8 rounded-lg bg-teal/10 text-teal grid place-items-center shrink-0">
                  <p.icon className="h-4 w-4" />
                </div>
                <span className="text-sm text-foreground/80">{p.text}</span>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {gallery.map((img, i) => (
              <motion.div
                key={img.alt}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`relative overflow-hidden rounded-2xl border border-border shadow-[var(--shadow-soft)] ${
                  i % 3 === 0 ? "aspect-[4/5]" : "aspect-square"
                }`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                  <span className="text-xs font-medium text-white">{img.alt}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
