import { HeartPulse, MapPin, Phone, Mail } from "lucide-react";
import { clinic } from "@/lib/clinic-data";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary to-teal grid place-items-center text-primary-foreground">
              <HeartPulse className="h-5 w-5" />
            </div>
            <div>
              <div className="font-bold font-heading">{clinic.name}</div>
              <div className="text-xs text-muted-foreground">{clinic.tagline}</div>
            </div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground max-w-md leading-relaxed">
            A patient-focused multispeciality clinic offering ethical, affordable healthcare — with
            attached pharmacy, pathology, diagnostic support, and AI-powered clinic assistance.
          </p>
          <div className="mt-4 text-xs text-destructive font-medium">
            Emergency: <a href={`tel:${clinic.phoneRaw}`} className="underline">{clinic.phone}</a>
            {" · "}
            <a href={`tel:${clinic.emergencyNumber}`} className="underline">Call {clinic.emergencyNumber}</a>
          </div>
        </div>

        <div>
          <div className="text-sm font-semibold">Quick Links</div>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><a href="#about" className="hover:text-primary">About</a></li>
            <li><a href="#doctors" className="hover:text-primary">Doctors</a></li>
            <li><a href="#services" className="hover:text-primary">Services</a></li>
            <li><a href="#facilities" className="hover:text-primary">Facilities</a></li>
            <li><a href="#assistant" className="hover:text-primary">Ask AI</a></li>
            <li><a href="#query" className="hover:text-primary">Submit Query</a></li>
          </ul>
        </div>

        <div>
          <div className="text-sm font-semibold">Contact</div>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 shrink-0" />{clinic.location}</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4" />{clinic.phone}</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4" />{clinic.email}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <div>© 2026 {clinic.name}. All rights reserved.</div>
          <div>Designed for patient convenience and general clinic assistance.</div>
        </div>
      </div>
    </footer>
  );
}
