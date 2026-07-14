import doctorAmit from "@/assets/doctor-amit.jpg";
import doctorNeha from "@/assets/doctor-neha.jpg";
import doctorPriya from "@/assets/doctor-priya.jpg";
import facilityReception from "@/assets/facility-reception.jpg";
import facilityConsultation from "@/assets/facility-consultation.jpg";
import facilityPharmacy from "@/assets/facility-pharmacy.jpg";
import facilityPathology from "@/assets/facility-pathology.jpg";

export const clinic = {
  name: "Aarogya Care Clinic",
  tagline: "Trusted Doctors. Complete Care. Better Health.",
  location: "Vijay Nagar, Indore, Madhya Pradesh",
  phone: "+91 98765 43210",
  email: "care@aarogyaclinic.in",
  hours: [
    { day: "Monday – Friday", time: "9:00 AM – 8:00 PM" },
    { day: "Saturday", time: "9:00 AM – 6:00 PM" },
    { day: "Sunday", time: "Closed" },
  ],
};

export const doctors = [
  {
    id: "dr-amit",
    name: "Dr. Amit Sharma",
    role: "General Physician",
    specialization: "General Medicine & Family Healthcare",
    experience: "12+ Years",
    fee: 400,
    behaviour: "Calm, friendly & approachable",
    image: doctorAmit,
    description:
      "Dr. Amit Sharma provides consultation for common illnesses, fever, infections, seasonal diseases, digestive problems, general weakness, blood pressure monitoring, diabetes monitoring, and preventive healthcare.",
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
    role: "Pediatrician",
    specialization: "Child Healthcare & Pediatric Medicine",
    experience: "9+ Years",
    fee: 500,
    behaviour: "Gentle, caring & child-friendly",
    image: doctorNeha,
    description:
      "Dr. Neha Verma provides child healthcare services, growth monitoring, vaccination guidance, nutrition consultation, newborn care guidance, and management of common childhood illnesses.",
    services: [
      "Child Consultation",
      "Newborn Care Guidance",
      "Vaccination Guidance",
      "Growth Monitoring",
      "Child Nutrition Advice",
      "Common Childhood Illness Care",
      "Fever Consultation",
      "Parent Counseling",
    ],
    available: true,
  },
  {
    id: "dr-priya",
    name: "Dr. Priya Mehta",
    role: "Gynecologist",
    specialization: "Women's Health & Gynecology",
    experience: "11+ Years",
    fee: 600,
    behaviour: "Professional, empathetic & privacy-focused",
    image: doctorPriya,
    description:
      "Dr. Priya Mehta provides consultation for women's health, menstrual concerns, pregnancy guidance, reproductive health, hormonal concerns, and preventive gynecological care.",
    services: [
      "Women's Health Consultation",
      "Menstrual Health Guidance",
      "Pregnancy Consultation",
      "Hormonal Health Guidance",
      "Reproductive Health Consultation",
      "Preventive Gynecological Care",
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

export const queryCategories = [
  "General Health Query",
  "Doctor Information",
  "Clinic Services",
  "Child Healthcare",
  "Women's Health",
  "Pathology",
  "Diagnostic Support",
  "Consultation Fee",
  "Working Hours",
];
