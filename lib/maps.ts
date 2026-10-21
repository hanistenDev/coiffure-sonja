import type { Address } from "@/types/salon";

export function formatAddressLine(address: Address): string {
  return `${address.street}, ${address.zip} ${address.city}`;
}

export function mapsEmbedUrl(address: Address): string {
  const q = encodeURIComponent(formatAddressLine(address));
  return `https://maps.google.com/maps?q=${q}&z=16&output=embed`;
}

export function mapsLinkUrl(address: Address): string {
  const q = encodeURIComponent(formatAddressLine(address));
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}
