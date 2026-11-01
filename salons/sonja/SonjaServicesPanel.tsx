import { TREATWELL_URL } from "./facts";
import { sonjaServiceAreas } from "./services";

export function SonjaServicesPanel({
  bookingUrl,
  phoneHref,
}: {
  bookingUrl?: string;
  phoneHref: string;
}) {
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

      <div className="mt-10 max-w-xl border-t border-line pt-8">
        <p className="font-serif text-[1.25rem] font-semibold leading-snug tracking-tight md:text-[1.35rem]">
          Zum ersten Mal bei Sonja oder unsicher, welche Leistung passt?
        </p>
        <p className="mt-3 text-[17px] leading-relaxed text-muted">
          Rufen Sie kurz an – gemeinsam finden wir den passenden Termin.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a
            href={phoneHref}
            className="inline-flex min-h-14 items-center justify-center bg-accent px-7 text-[16px] font-medium text-accent-ink transition-opacity hover:opacity-90"
          >
            Anrufen
          </a>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-14 items-center justify-center border border-ink/25 px-7 text-[16px] font-medium transition-colors hover:border-accent hover:text-accent"
          >
            Termin buchen
          </a>
        </div>
        <p className="mt-6 text-[14px] leading-relaxed text-muted">
          Bitte sagen Sie Termine mindestens 24 Stunden im Voraus ab. Bei
          kurzfristigeren Absagen wird eine Terminausfallentschädigung verrechnet.
        </p>
      </div>
    </div>
  );
}
