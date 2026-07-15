import { MapPin, Phone, Mail, Clock, MessagesSquare, Navigation, Siren } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { clinic } from "@/lib/clinic-data";

export function Contact() {
  return (
    <section id="contact" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-xs font-semibold tracking-widest uppercase text-primary">Contact & Hours</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold font-heading text-foreground">
            Visit us or get in touch
          </h2>
          <p className="mt-4 text-muted-foreground">
            Reach us during working hours, or use our 24/7 emergency phone assistance.
          </p>
        </div>

        <div className="mt-14 grid lg:grid-cols-3 gap-6">
          <Card className="p-6 rounded-2xl border-border shadow-[var(--shadow-soft)]">
            <div className="h-11 w-11 rounded-xl bg-primary/10 text-primary grid place-items-center">
              <MapPin className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-semibold">Clinic Address</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">{clinic.location}</p>
            <Button asChild variant="outline" size="sm" className="mt-4 rounded-full">
              <a href={clinic.mapsUrl} target="_blank" rel="noreferrer">
                <Navigation className="h-3.5 w-3.5 mr-1" /> Get Directions
              </a>
            </Button>
          </Card>

          <Card className="p-6 rounded-2xl border-border shadow-[var(--shadow-soft)]">
            <div className="h-11 w-11 rounded-xl bg-teal/10 text-teal grid place-items-center">
              <Phone className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-semibold">Call & Email</h3>
            <a
              href={`tel:${clinic.phoneRaw}`}
              className="mt-1.5 text-sm text-foreground/85 hover:text-primary block"
            >
              {clinic.phone}
            </a>
            <a
              href={`mailto:${clinic.email}`}
              className="mt-1 text-sm text-muted-foreground hover:text-primary flex items-center gap-1.5"
            >
              <Mail className="h-3.5 w-3.5" /> {clinic.email}
            </a>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button asChild size="sm" className="rounded-full">
                <a href={`tel:${clinic.phoneRaw}`}>
                  <Phone className="h-3.5 w-3.5 mr-1" /> Call
                </a>
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="rounded-full"
                onClick={() =>
                  document.getElementById("assistant")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <MessagesSquare className="h-3.5 w-3.5 mr-1" /> Ask AI
              </Button>
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
                  <span className="text-foreground font-medium text-right">{h.time}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[11px] text-muted-foreground leading-relaxed">
              24/7 availability refers to emergency phone assistance and guidance. It does not
              guarantee that every doctor, diagnostic test, medical store, or physical clinic
              service is available at all times.
            </p>
          </Card>
        </div>

        {/* Emergency banner */}
        <div className="mt-8 rounded-2xl bg-destructive/10 border border-destructive/30 p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-start gap-3 flex-1">
            <div className="h-10 w-10 shrink-0 rounded-xl bg-destructive/15 text-destructive grid place-items-center">
              <Siren className="h-5 w-5" />
            </div>
            <div>
              <div className="font-semibold text-foreground">Medical Emergency?</div>
              <p className="text-sm text-muted-foreground">
                Call India emergency services on <strong>{clinic.emergencyNumber}</strong> or reach
                the clinic directly.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 sm:ml-auto">
            <Button asChild variant="destructive" className="rounded-full">
              <a href={`tel:${clinic.emergencyNumber}`}>Call {clinic.emergencyNumber}</a>
            </Button>
            <Button asChild variant="outline" className="rounded-full border-destructive/40 text-destructive hover:bg-destructive/5 hover:text-destructive">
              <a href={`tel:${clinic.phoneRaw}`}>Call Clinic</a>
            </Button>
          </div>
        </div>

        {/* Map placeholder */}
        <div className="mt-8 rounded-2xl overflow-hidden border border-border shadow-[var(--shadow-soft)]">
          <iframe
            title="Clinic location map"
            src="https://maps.google.com/maps?q=Vijay+Nagar+Indore&t=&z=14&ie=UTF8&iwloc=&output=embed"
            className="w-full h-72 border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
