import { useEffect, useState } from "react";
import { Menu, X, HeartPulse, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { clinic } from "@/lib/clinic-data";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#doctors", label: "Doctors" },
  { href: "#services", label: "Services" },
  { href: "#facilities", label: "Facilities" },
  { href: "#assistant", label: "Ask AI" },
  { href: "#contact", label: "Contact" },
];

function focusChatInput() {
  requestAnimationFrame(() => {
    const el = document.getElementById("chat-input") as HTMLTextAreaElement | null;
    el?.focus();
  });
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/85 backdrop-blur-lg border-b border-border shadow-[var(--shadow-soft)]"
          : "bg-background/60 backdrop-blur",
      )}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2 group" aria-label={clinic.name}>
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary to-teal grid place-items-center text-primary-foreground shadow-[var(--shadow-soft)] font-bold text-xs tracking-wider">
            <HeartPulse className="h-4 w-4" />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-bold font-heading text-foreground">Shrivastav Clinic</div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Multispeciality</div>
          </div>
        </a>

        <div className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors rounded-md"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-2">
          <a
            href={`tel:${clinic.phoneRaw}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-destructive hover:opacity-80 px-3 py-1.5 rounded-full border border-destructive/30"
          >
            <Phone className="h-3.5 w-3.5" /> Emergency
          </a>
          <Button
            size="sm"
            className="rounded-full px-5"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("assistant")?.scrollIntoView({ behavior: "smooth" });
              focusChatInput();
            }}
          >
            Ask AI
          </Button>
        </div>

        <button
          className="lg:hidden p-2 rounded-md text-foreground"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden bg-background/95 backdrop-blur-lg border-b border-border">
          <div className="px-4 py-4 space-y-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block px-4 py-3 rounded-lg text-base font-medium text-foreground hover:bg-muted"
              >
                {l.label}
              </a>
            ))}
            <a
              href={`tel:${clinic.phoneRaw}`}
              className="flex items-center justify-center gap-2 mt-2 w-full py-3 rounded-full border border-destructive/40 text-destructive font-semibold"
            >
              <Phone className="h-4 w-4" /> Emergency Call
            </a>
            <Button
              className="w-full mt-2 rounded-full"
              onClick={() => {
                setOpen(false);
                document.getElementById("assistant")?.scrollIntoView({ behavior: "smooth" });
                focusChatInput();
              }}
            >
              Ask AI
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
