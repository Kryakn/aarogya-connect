import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { QuickActions } from "@/components/site/QuickActions";
import { About } from "@/components/site/About";
import { Doctors } from "@/components/site/Doctors";
import { Services } from "@/components/site/Services";
import { Facilities } from "@/components/site/Facilities";
import { WhyChoose } from "@/components/site/WhyChoose";
import { Infrastructure } from "@/components/site/Infrastructure";
import { AIChatAssistant } from "@/components/site/AIChatAssistant";
import { OneTimeQueryForm } from "@/components/site/OneTimeQueryForm";
import { Contact } from "@/components/site/Contact";
import { MedicalDisclaimer } from "@/components/site/MedicalDisclaimer";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title:
          "Shrivastav Multispeciality Clinic | Doctors, Pathology & Diagnostic Support in Indore",
      },
      {
        name: "description",
        content:
          "Shrivastav Multispeciality Clinic in Vijay Nagar, Indore offers general medicine, paediatric care, women's health consultation, pharmacy support, pathology coordination, diagnostic assistance, and AI-powered clinic guidance.",
      },
      {
        property: "og:title",
        content: "Shrivastav Multispeciality Clinic — Trusted Doctors, Complete Care",
      },
      {
        property: "og:description",
        content: "Trusted Doctors. Complete Care. Smarter Healthcare Assistance.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "MedicalClinic",
          name: "Shrivastav Multispeciality Clinic",
          description:
            "Multispeciality clinic offering general medicine, paediatrics, women's health, pharmacy, pathology and diagnostic support in Vijay Nagar, Indore.",
          telephone: "+91 98765 43210",
          email: "care@shrivastavclinic.in",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Scheme No. 54, Vijay Nagar",
            addressLocality: "Indore",
            addressRegion: "Madhya Pradesh",
            postalCode: "452010",
            addressCountry: "IN",
          },
          openingHoursSpecification: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
              ],
              opens: "09:00",
              closes: "16:00",
            },
          ],
        }),
      },
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
        <QuickActions />
        <About />
        <Doctors />
        <Services />
        <Facilities />
        <WhyChoose />
        <Infrastructure />
        <AIChatAssistant />
        <OneTimeQueryForm />
        <Contact />
        <MedicalDisclaimer />
      </main>
      <Footer />
      <Toaster position="top-right" richColors />
    </div>
  );
}
