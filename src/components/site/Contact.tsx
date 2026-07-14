import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { clinic } from "@/lib/clinic-data";

export function Contact() {
  return (
    <section id="contact" className="py-20 lg:py-28 bg-muted/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-xs font-semibold tracking-widest uppercase text-primary">Contact</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold font-heading text-foreground">
            Visit us or get in touch
          </h2>
        </div>

        <div className="mt-14 grid lg:grid-cols-3 gap-6">
          <Card className="p-6 rounded-2xl border-border shadow-[var(--shadow-soft)]">
            <div className="h-11 w-11 rounded-xl bg-primary/10 text-primary grid place-items-center">
              <MapPin className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-semibold">Clinic Address</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">{clinic.location}</p>
          </Card>

          <Card className="p-6 rounded-2xl border-border shadow-[var(--shadow-soft)]">
            <div className="h-11 w-11 rounded-xl bg-teal/10 text-teal grid place-items-center">
              <Phone className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-semibold">Call Us</h3>
            <a href={`tel:${clinic.phone}`} className="mt-1.5 text-sm text-muted-foreground hover:text-primary block">
              {clinic.phone}
            </a>
            <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
              <Mail className="h-3.5 w-3.5" />
              <a href={`mailto:${clinic.email}`} className="hover:text-primary">
                {clinic.email}
              </a>
            </div>
          </Card>

          <Card className="p-6 rounded-2xl border-border shadow-[var(--shadow-soft)]">
            <div className="h-11 w-11 rounded-xl bg-cyan/25 text-secondary grid place-items-center">
              <Clock className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-semibold">Working Hours</h3>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              {clinic.hours.map((h) => (
                <li key={h.day} className="flex justify-between gap-2">
                  <span>{h.day}</span>
                  <span className="text-foreground font-medium">{h.time}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </section>
  );
}
