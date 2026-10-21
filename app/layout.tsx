import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import {
  CONTACT_EMAIL,
  FACEBOOK_URL,
  INSTAGRAM_URL,
  SITE_URL,
} from "@/salons/sonja/facts";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-outfit",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Coiffure Sonja | Coiffeuse in Zürich-Wipkingen",
  description:
    "Coiffure Sonja in Zürich-Wipkingen: persönliche Beratung, über 35 Jahre Erfahrung und ein bewusster Umgang mit der Haargesundheit.",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Coiffure Sonja | Coiffeuse in Zürich-Wipkingen",
    description:
      "Persönliche Beratung, über 35 Jahre Erfahrung und ein bewusster Umgang mit der Haargesundheit – mitten in Zürich-Wipkingen.",
    url: SITE_URL,
    siteName: "Coiffure Sonja",
    locale: "de_CH",
    type: "website",
    images: [
      {
        url: "/salons/sonja/interior-overview.png",
        alt: "Der Salon von Coiffure Sonja an der Nordstrasse",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Coiffure Sonja | Coiffeuse in Zürich-Wipkingen",
    description:
      "Persönliche Beratung, über 35 Jahre Erfahrung und ein bewusster Umgang mit der Haargesundheit – mitten in Zürich-Wipkingen.",
    images: ["/salons/sonja/interior-overview.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HairSalon",
  name: "Coiffure Sonja",
  url: SITE_URL,
  image: `${SITE_URL}/salons/sonja/interior-overview.png`,
  telephone: "+41 79 588 96 10",
  email: CONTACT_EMAIL,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Nordstrasse 237",
    postalCode: "8037",
    addressLocality: "Zürich",
    addressRegion: "ZH",
    addressCountry: "CH",
  },
  sameAs: [FACEBOOK_URL, INSTAGRAM_URL],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Tuesday", "Wednesday", "Thursday"],
      opens: "09:30",
      closes: "18:30",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Friday",
      opens: "09:00",
      closes: "18:30",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "19",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${outfit.variable} ${cormorant.variable}`}>
      <body className="bg-[#FAF9F6] font-sans text-[#202020] antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
