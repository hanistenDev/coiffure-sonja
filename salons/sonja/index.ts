import type { SalonBooking, SalonDefinition } from "@/types/salon";
import { assets } from "./assets";
import { content } from "./content";
import { TREATWELL_URL } from "./facts";
import { layout } from "./layout";
import { overrides } from "./overrides";
import { theme } from "./theme";

export const booking: SalonBooking = {
  mode: "external",
  externalUrl: TREATWELL_URL,
  externalLabel: "Über Treatwell buchen",
};

export const definition: SalonDefinition = {
  slug: "sonja",
  content,
  theme,
  assets,
  layout,
  booking,
  overrides,
};
