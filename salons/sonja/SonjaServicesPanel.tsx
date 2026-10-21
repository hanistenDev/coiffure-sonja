import { TREATWELL_URL } from "./facts";
import { sonjaServiceAreas } from "./services";

export function SonjaServicesPanel({ bookingUrl }: { bookingUrl?: string }) {
  const href = bookingUrl ?? TREATWELL_URL;

  return (
    <div className="mt-10">
      <ul className="grid border-t border-line sm:grid-cols-2">
        {sonjaServiceAreas.map((area) => (
          <li
            key={area.id}
            className="border-b border-line py-4 font-serif text-[1.3rem] leading-snug tracking-tight sm:odd:pr-8 sm:even:pl-8 md:text-[1.35rem]"
          >
            {area.title}
          </li>
        ))}
      </ul>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-flex min-h-14 items-center justify-center bg-accent px-7 text-[16px] font-medium text-accent-ink transition-opacity hover:opacity-90"
      >
        Termin buchen
      </a>
    </div>
  );
}
