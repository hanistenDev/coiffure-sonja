import type { ComponentType } from "react";

export type SalonSlug = "sonja";

export type Weekday =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export type DayHours = string | "closed";

export type OpeningHours = Partial<Record<Weekday, DayHours>>;

export type BookingMode = "external";

export type SectionId =
  | "hero"
  | "services"
  | "gallery"
  | "about"
  | "reviews"
  | "contact"
  | "finalCTA";

export type SalonImage = {
  src: string;
  alt: string;
  objectPosition?: string;
  width?: number;
  height?: number;
};

export type SalonAssets = {
  logo?: SalonImage;
  heroCandidates: SalonImage[];
  interior: SalonImage[];
  services: SalonImage[];
  gallery: SalonImage[];
  team: SalonImage[];
  storefront: SalonImage[];
};

export type ResolvedImage = SalonImage & { missing?: boolean };

export type ResolvedAssets = {
  logo?: ResolvedImage;
  hero?: ResolvedImage;
  heroCandidates: ResolvedImage[];
  interior: ResolvedImage[];
  services: ResolvedImage[];
  gallery: ResolvedImage[];
  team: ResolvedImage[];
  storefront: ResolvedImage[];
};

export type ServiceItem = {
  id: string;
  title: string;
  text?: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type NavLink = {
  href: string;
  label: string;
};

export type Address = {
  street: string;
  zip: string;
  city: string;
};

export type SalonContent = {
  name: string;
  shortName?: string;
  category: string;
  eyebrow?: string;
  headline: string;
  subheadline: string;
  aboutTitle: string;
  aboutText: string;
  address: Address;
  phone: string;
  whatsapp?: string;
  rating?: {
    value: number;
    count: number;
  };
  hours: OpeningHours;
  services: ServiceItem[];
  servicesTitle: string;
  servicesIntro: string;
  galleryTitle: string;
  galleryIntro?: string;
  reviewsTitle?: string;
  faq: FaqItem[];
  ctaTitle: string;
  ctaText: string;
  navLinks: NavLink[];
  trustItems?: string[];
};

export type SalonTheme = {
  colorScheme: "light" | "dark";
  background: string;
  surface: string;
  foreground: string;
  accent: string;
  accentForeground: string;
  muted: string;
  mutedDim: string;
  border: string;
  overlay: string;
  displayFont: string;
  bodyFont: string;
};

export type SalonLayout = {
  sections: SectionId[];
  variants?: Record<string, string>;
  navigation?: {
    style?: "solid" | "transparent";
  };
};

export type SalonBooking = {
  mode: BookingMode;
  externalUrl?: string;
  externalLabel?: string;
};

export type SectionProps = {
  salon: ResolvedSalon;
};

export type SalonOverrides = Partial<
  Record<SectionId | "navigation" | "footer" | "stickyCta", ComponentType<SectionProps>>
>;

export type SalonDefinition = {
  slug: SalonSlug;
  content: SalonContent;
  theme: SalonTheme;
  assets: SalonAssets;
  layout: SalonLayout;
  booking: SalonBooking;
  overrides: SalonOverrides;
};

export type ResolvedSalon = Omit<SalonDefinition, "assets" | "overrides"> & {
  assets: ResolvedAssets;
  phoneTel: string;
  phoneDisplay: string;
  whatsappUrl: string;
  mapsEmbed: string;
  mapsLink: string;
  reviewsLink: string;
};
