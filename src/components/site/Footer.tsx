import { Stethoscope, MapPin, Phone, Mail } from "lucide-react";
import { clinic } from "@/lib/clinic-data";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary to-teal grid place-items-center text-primary-foreground">
              <Stethoscope className="h-5 w-5" />
            </div>
            <div>
              <div className="font-bold font-heading">Aarogya Care Clinic</div>
              <div className="text-xs text-muted-foreground">Trusted Doctors. Complete Care.</div>
            </div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground max-w-md leading-relaxed">
            A multi-specialty neighborhood clinic offering ethical, affordable, and patient-friendly
            healthcare — with attached pharmacy, pathology, and diagnostic support.
          </p>
        </div>

        <div>
          <div className="text-sm font-semibold">Quick Links</div>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><a href="#about" className="hover:text-primary">About</a></li>
            <li><a href="#doctors" className="hover:text-primary">Doctors</a></li>
            <li><a href="#services" className="hover:text-primary">Services</a></li>
            <li><a href="#facilities" className="hover:text-primary">Facilities</a></li>
            <li><a href="#query" className="hover:text-primary">Ask a Query</a></li>
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
          <div>© {new Date().getFullYear()} Aarogya Care Clinic. All rights reserved.</div>
          <div>For emergencies, please call your local emergency number.</div>
        </div>
      </div>
    </footer>
  );
}
