import type { ResolvedSalon } from "@/types/salon";

export function MapEmbed({ salon, className }: { salon: ResolvedSalon; className?: string }) {
  return (
    <iframe
      title={`Karte: ${salon.content.name}, ${salon.content.address.street}, ${salon.content.address.zip} ${salon.content.address.city}`}
      src={salon.mapsEmbed}
      className={className ?? "aspect-[4/3] w-full max-w-full grow lg:min-h-[380px]"}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
}
