import doctorAmit from "@/assets/doctor-amit.jpg";
import doctorNeha from "@/assets/doctor-neha.jpg";
import doctorPriya from "@/assets/doctor-priya.jpg";
import facilityReception from "@/assets/facility-reception.jpg";
import facilityConsultation from "@/assets/facility-consultation.jpg";
import facilityPharmacy from "@/assets/facility-pharmacy.jpg";
import facilityPathology from "@/assets/facility-pathology.jpg";

export const clinic = {
  name: "Shrivastav Multispeciality Clinic",
  shortName: "Shrivastav Clinic",
  initials: "SMC",
  tagline: "Trusted Doctors. Complete Care. Smarter Healthcare Assistance.",
  location: "Scheme No. 54, Vijay Nagar, Indore, Madhya Pradesh – 452010",
  phone: "+91 98765 43210",
  phoneRaw: "+919876543210",
  emergencyNumber: "112",
  email: "care@shrivastavclinic.in",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Vijay+Nagar+Indore+Madhya+Pradesh",
  hours: [
    { day: "Monday – Saturday (Consultation)", time: "9:00 AM – 4:00 PM" },
    { day: "Monday – Saturday (Info & Assistance)", time: "8:00 AM – 8:00 PM" },
    { day: "Sunday", time: "Emergency phone assistance only" },
    { day: "Emergency Phone", time: "24/7 available" },
  ],
};

export type Doctor = {
  id: string;
  name: string;
  qualification: string;
  role: string;
  specialization: string;
  experience: string;
  behaviour: string;
  fee: number;
  timings: string[];
  languages: string[];
  modes: string[];
  image: string;
  description: string;
  bio: string;
  services: string[];
  available: boolean;
};

export const doctors: Doctor[] = [
  {
    id: "dr-amit",
    name: "Dr. Amit Sharma",
    qualification: "MBBS, MD – General Medicine",
    role: "General Physician",
    specialization: "General Medicine & Family Healthcare",
    experience: "12+ Years",
    behaviour: "Calm, friendly, patient & attentive",
    fee: 400,
    timings: ["9:00 AM – 1:00 PM", "5:00 PM – 8:00 PM"],
    languages: ["Hindi", "English"],
    modes: ["In-clinic consultation", "Follow-up consultation", "AI-assisted appointment"],
    image: doctorAmit,
    description:
      "Consultation for common illnesses, fever, infections, seasonal diseases, digestive concerns, general weakness, blood pressure & diabetes monitoring, and preventive healthcare.",
    bio: "Dr. Amit Sharma has over a decade of family-medicine experience with a focus on clear communication and preventive healthcare. He treats each patient with patience and takes time to explain conditions and next steps.",
    services: [
      "General Consultation",
      "Fever & Infection Care",
      "Seasonal Illness Treatment",
      "Diabetes Monitoring",
      "Blood Pressure Monitoring",
      "Digestive Health Guidance",
      "Preventive Health Checkups",
      "Follow-up Consultation",
    ],
    available: true,
  },
  {
    id: "dr-neha",
    name: "Dr. Neha Verma",
    qualification: "MBBS, MD – Paediatrics",
    role: "Paediatrician",
    specialization: "Child Healthcare & Paediatric Medicine",
    experience: "9+ Years",
    behaviour: "Gentle, caring & child-friendly",
    fee: 500,
    timings: ["10:00 AM – 2:00 PM", "4:00 PM – 7:00 PM"],
    languages: ["Hindi", "English"],
    modes: ["In-clinic consultation", "Child follow-up", "Parent guidance", "AI-assisted appointment"],
    image: doctorNeha,
    description:
      "Child healthcare, growth monitoring, vaccination guidance, nutrition consultation, newborn care guidance, and management of common childhood illnesses.",
    bio: "Dr. Neha Verma specialises in paediatric care with a warm, reassuring style that puts both children and parents at ease. She emphasises timely vaccinations and healthy development.",
    services: [
      "Child Consultation",
      "Newborn Care Guidance",
      "Vaccination Guidance",
      "Growth Monitoring",
      "Child Nutrition Advice",
      "Common Childhood Illness Care",
      "Fever Consultation",
      "Parent Counselling",
    ],
    available: true,
  },
  {
    id: "dr-priya",
    name: "Dr. Priya Mehta",
    qualification: "MBBS, MS – Obstetrics & Gynaecology",
    role: "Gynaecologist",
    specialization: "Women's Health & Gynaecology",
    experience: "11+ Years",
    behaviour: "Professional, empathetic & privacy-focused",
    fee: 600,
    timings: ["11:00 AM – 3:00 PM", "5:00 PM – 8:00 PM"],
    languages: ["Hindi", "English"],
    modes: ["In-clinic consultation", "Private consultation", "Follow-up consultation", "AI-assisted appointment"],
    image: doctorPriya,
    description:
      "Women's health, menstrual concerns, pregnancy guidance, reproductive health, hormonal concerns, adolescent health, and preventive gynaecological care.",
    bio: "Dr. Priya Mehta brings over a decade of gynaecology experience with a strong emphasis on patient privacy, empathy, and evidence-based women's healthcare across all life stages.",
    services: [
      "Women's Health Consultation",
      "Menstrual Health Guidance",
      "Pregnancy Consultation",
      "Hormonal Health Guidance",
      "Reproductive Health Consultation",
      "Preventive Gynaecological Care",
      "Adolescent Health Guidance",
      "Follow-up Consultation",
    ],
    available: true,
  },
];

export const gallery = [
  { src: facilityReception, alt: "Clinic Reception" },
  { src: facilityConsultation, alt: "Consultation Room" },
  { src: facilityPharmacy, alt: "Attached Medical Store" },
  { src: facilityPathology, alt: "Pathology Sample Collection" },
];

export const suggestedPrompts = [
  "Book a consultation",
  "Which doctor should I consult?",
  "Doctor fees",
  "Doctor availability today",
  "Clinic timings",
  "Medical store information",
  "Pathology test support",
  "Diagnostic centre support",
  "Women's health consultation",
  "Child healthcare consultation",
  "General physician consultation",
  "Emergency contact",
];

export const emergencyKeywords = [
  "chest pain",
  "difficulty breathing",
  "can't breathe",
  "severe bleeding",
  "unconscious",
  "stroke",
  "accident",
  "seizure",
  "suicidal",
  "suicide",
  "allergic reaction",
  "anaphylaxis",
  "pregnancy emergency",
  "heart attack",
];

export const chatWelcomeMessage = `Hello! I am the **Shrivastav Clinic AI Assistant**.

I can help you with:

- Booking a consultation
- Finding the appropriate doctor
- Doctor timings and fees
- Clinic services
- Medical store information
- Pathology and diagnostic support
- Clinic location and working hours

How may I assist you today?`;
