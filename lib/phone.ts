export function toTelHref(phone: string): string {
  const digits = phone.replace(/[^\d+]/g, "");
  return `tel:${digits}`;
}

export function toWhatsAppUrl(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  return `https://wa.me/${digits}`;
}

export function formatSwissPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("41") && digits.length === 11) {
    const rest = digits.slice(2);
    return `0${rest.slice(0, 2)} ${rest.slice(2, 5)} ${rest.slice(5, 7)} ${rest.slice(7)}`;
  }
  return phone;
}
