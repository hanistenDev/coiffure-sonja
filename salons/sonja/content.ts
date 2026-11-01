import type { SalonContent } from "@/types/salon";

export const content: SalonContent = {
  name: "Coiffure Sonja",
  shortName: "Coiffure Sonja",
  category: "Coiffure · Beauty · Zürich-Wipkingen",
  eyebrow: "Coiffure · Zürich-Wipkingen",
  headline: "Schönes Haar.\nPersönlich betreut.",
  subheadline:
    "Seit über 35 Jahren steht Sonja Rémy für persönliche Beratung, professionelle Coiffure und einen bewussten Umgang mit der Haargesundheit – mitten in Zürich-Wipkingen.",
  aboutTitle: "Persönlich. Herzlich. Mit Erfahrung.",
  aboutText:
    "Über 35 Jahre Berufserfahrung und die Freude an meinem Beruf begleiten mich jeden Tag. In meinem kleinen Salon an der Nordstrasse nehme ich mir Zeit für persönliche Beratung und individuelle Wünsche. Haargesundheit ist mir sehr wichtig. Schönheit kommt von aussen – Haargesundheit von innen. Ob klassischer Haarschnitt, moderne Farbe oder eine kleine Beauty-Behandlung – wichtig ist mir, dass Sie sich bei mir wohlfühlen und den Salon zufrieden verlassen.",
  address: {
    street: "Nordstrasse 237",
    zip: "8037",
    city: "Zürich",
  },
  phone: "+41 79 588 96 10",
  whatsapp: "+41 79 588 96 10",
  rating: { value: 4.9, count: 19 },
  hours: {
    monday: "closed",
    tuesday: "09:30–18:30",
    wednesday: "09:30–18:30",
    thursday: "09:30–18:30",
    friday: "09:00–18:30",
    saturday: "Jeden 1. Samstag im Monat · 09:00–15:00",
    sunday: "closed",
  },
  servicesTitle: "Leistungen",
  servicesIntro: "Was zu Ihnen passt, entscheiden wir gemeinsam.",
  services: [
    { id: "damen", title: "Damen" },
    { id: "herren", title: "Herren" },
    { id: "farbe", title: "Farbe & Coloration" },
    { id: "dauerwelle", title: "Dauerwelle" },
    { id: "augenbrauen", title: "Augenbrauen & Wimpern" },
    { id: "manicure", title: "Manicure / Nägel" },
    { id: "haarausfallberatung", title: "Haarausfallberatung" },
  ],
  galleryTitle: "Der Salon",
  galleryIntro: "Klein, hell und persönlich – an der Nordstrasse in Zürich-Wipkingen.",
  faq: [
    {
      question: "Wo liegt Coiffure Sonja?",
      answer: "Nordstrasse 237, 8037 Zürich, im Quartier Wipkingen (Kreis 10).",
    },
    {
      question: "Wie buche ich einen Termin?",
      answer: "Über Treatwell, per WhatsApp oder telefonisch unter 079 588 96 10.",
    },
    {
      question: "Welche Öffnungszeiten gelten?",
      answer:
        "Montag geschlossen. Dienstag bis Donnerstag 09:30–18:30, Freitag 09:00–18:30, jeden 1. Samstag im Monat 09:00–15:00, Sonntag geschlossen.",
    },
  ],
  ctaTitle: "Ich freue mich auf Ihren Besuch.",
  ctaText: "Im kleinen Salon an der Nordstrasse – persönlich und mit Zeit für Sie.",
  navLinks: [
    { href: "#home", label: "Home" },
    { href: "#ueber-sonja", label: "Über Sonja" },
    { href: "#leistungen", label: "Leistungen" },
    { href: "#stimmen", label: "Stimmen" },
    { href: "#salon", label: "Salon" },
    { href: "#kontakt", label: "Kontakt" },
  ],
  reviewsTitle: "Das sagen die Gäste.",
  trustItems: [
    "★ 4.9 · 19 Google-Bewertungen",
    "Nordstrasse 237 · Zürich-Wipkingen",
    "Di–Do 09:30–18:30 · Fr 09:00–18:30",
    "jeden 1. Sa 09:00–15:00 · Mo und So geschlossen",
  ],
};
