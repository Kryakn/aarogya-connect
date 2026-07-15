import { ShieldAlert } from "lucide-react";
import { clinic } from "@/lib/clinic-data";

export function MedicalDisclaimer() {
  return (
    <section className="pb-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-border bg-muted/40 p-6 flex gap-4">
          <div className="h-10 w-10 shrink-0 rounded-xl bg-warning/15 text-warning grid place-items-center">
            <ShieldAlert className="h-5 w-5" />
          </div>
          <div>
            <div className="font-semibold text-foreground">Medical Disclaimer</div>
            <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
              The information provided on this website and through the AI assistant is intended for
              general informational and clinic assistance purposes only. It is not medical advice
              and must not be used for self-diagnosis, prescription, treatment decisions, or
              emergency management. Always consult a qualified healthcare professional for medical
              concerns. In an emergency, call {clinic.emergencyNumber} or contact the clinic
              immediately.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
