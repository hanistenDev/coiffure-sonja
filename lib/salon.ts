import { resolveAssets } from "@/lib/assets";
import { mapsEmbedUrl, mapsLinkUrl } from "@/lib/maps";
import { formatSwissPhone, toTelHref, toWhatsAppUrl } from "@/lib/phone";
import { definition } from "@/salons/sonja";
import { GOOGLE_REVIEWS_URL } from "@/salons/sonja/facts";
import type { ResolvedSalon } from "@/types/salon";

export function getSalon(): ResolvedSalon {
  const { overrides: _overrides, assets, ...rest } = definition;

  return {
    ...rest,
    assets: resolveAssets(assets),
    phoneTel: toTelHref(definition.content.phone),
    phoneDisplay: formatSwissPhone(definition.content.phone),
    whatsappUrl: toWhatsAppUrl(definition.content.whatsapp ?? definition.content.phone),
    mapsEmbed: mapsEmbedUrl(definition.content.address),
    mapsLink: mapsLinkUrl(definition.content.address),
    reviewsLink: GOOGLE_REVIEWS_URL,
  };
}
