import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Doctors } from "@/components/site/Doctors";
import { Services } from "@/components/site/Services";
import { Facilities } from "@/components/site/Facilities";
import { WhyChoose } from "@/components/site/WhyChoose";
import { Infrastructure } from "@/components/site/Infrastructure";
import { QueryAssistant } from "@/components/site/QueryAssistant";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aarogya Care Clinic — Trusted Doctors, Complete Care" },
      {
        name: "description",
        content:
          "Multi-specialty clinic in Vijay Nagar, Indore offering general medicine, pediatrics, women's health, pharmacy, pathology and diagnostic support.",
      },
      { property: "og:title", content: "Aarogya Care Clinic" },
      {
        property: "og:description",
        content: "Trusted Doctors. Complete Care. Better Health.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Doctors />
        <Services />
        <Facilities />
        <WhyChoose />
        <Infrastructure />
        <QueryAssistant />
        <Contact />
      </main>
      <Footer />
      <Toaster position="top-right" richColors />
    </div>
  );
}
