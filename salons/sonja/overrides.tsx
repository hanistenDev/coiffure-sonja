import type { ReactNode } from "react";
import { FadeUp } from "@/components/shared/FadeUp";
import { HoursTable } from "@/components/shared/HoursTable";
import { MapEmbed } from "@/components/shared/Map";
import { Visual } from "@/components/shared/Photo";
import { cn } from "@/lib/cn";
import {
  GOOGLE_REVIEWS_URL,
  TREATWELL_URL,
  WHATSAPP_URL,
  aboutParagraphs,
  sonjaTraits,
} from "./facts";
import { SonjaNav } from "./SonjaNav";
import { SonjaReviewsCarousel } from "./SonjaReviewsCarousel";
import { SonjaServicesPanel } from "./SonjaServicesPanel";
import { SonjaSocial } from "./SonjaSocial";
import type { SalonOverrides, SectionProps } from "@/types/salon";

function treatwellUrl(salon: SectionProps["salon"]) {
  return salon.booking.externalUrl ?? TREATWELL_URL;
}

function TreatwellCta({
  salon,
  className,
  children = "Termin buchen",
}: {
  salon: SectionProps["salon"];
  className?: string;
  children?: ReactNode;
}) {
  return (
    <a
      href={treatwellUrl(salon)}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}

function WhatsAppCta({
  salon,
  className,
  children = "WhatsApp",
}: {
  salon: SectionProps["salon"];
  className?: string;
  children?: ReactNode;
}) {
  return (
    <a
      href={WHATSAPP_URL || salon.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}

function primaryBtn(className?: string) {
  return cn(
    "inline-flex min-h-14 items-center justify-center bg-accent px-7 text-[16px] font-medium text-accent-ink transition-opacity hover:opacity-90",
    className,
  );
}

function ghostBtn(className?: string) {
  return cn(
    "inline-flex min-h-14 items-center justify-center border border-ink/25 px-7 text-[16px] font-medium transition-colors hover:border-accent hover:text-accent",
    className,
  );
}

function SonjaHero({ salon }: SectionProps) {
  const hero = salon.assets.hero;
  const items = salon.content.trustItems ?? [];

  return (
    <section className="sonja-screen bg-canvas">
      <div className="mx-auto grid min-h-0 w-full max-w-[1240px] flex-1 items-center gap-6 px-5 py-8 md:gap-8 md:px-8 md:py-10 lg:max-w-[1340px] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.14fr)] lg:items-center lg:gap-8 lg:py-7 lg:pr-6 xl:max-w-[1420px] xl:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] xl:gap-9 xl:pr-6">
        <div className="order-2 flex min-w-0 flex-col justify-center lg:order-1 lg:py-4">
          <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-accent sm:tracking-[0.2em]">
            {salon.content.eyebrow}
          </p>
          <h1 className="mt-4 max-w-[14ch] whitespace-pre-line font-serif text-[2.35rem] font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-[clamp(2.4rem,4.2vw,3.4rem)]">
            {salon.content.headline}
          </h1>
          <p className="mt-5 max-w-[34rem] text-[17px] leading-relaxed text-muted">
            {salon.content.subheadline}
          </p>
          <div className="mt-6 flex w-full flex-row gap-3 sm:mt-8">
            <TreatwellCta salon={salon} className={primaryBtn("min-w-0 flex-1 px-4 sm:w-auto sm:flex-none sm:px-7")}>
              Termin buchen
            </TreatwellCta>
            <a href={salon.phoneTel} className={ghostBtn("min-w-0 flex-1 px-4 sm:w-auto sm:flex-none sm:px-7")}>
              Anrufen
            </a>
          </div>
          <p className="mt-7 text-[14px] text-muted">
            {sonjaTraits.join(" · ")}
          </p>
          <p className="mt-3 text-[15px] text-muted-dim">
            Nordstrasse 237 · 8037 Zürich-Wipkingen
          </p>
        </div>

        <div className="order-1 min-w-0 w-full lg:order-2 lg:flex lg:h-full lg:min-h-0 lg:items-center">
          <Visual
            image={hero}
            placeholderLabel={salon.content.name}
            sizes="(min-width: 1280px) 46vw, (min-width: 1024px) 48vw, 100vw"
            priority
            zoom={false}
            fit="cover"
            className="aspect-[3/2] w-full"
          />
        </div>
      </div>

      {items.length > 0 ? (
        <aside className="shrink-0 border-t border-line bg-surface">
          <ul className="mx-auto grid max-w-page grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((item) => (
              <li
                key={item}
                className="border-b border-line px-5 py-3.5 text-[14px] text-muted last:border-b-0 sm:border-b-0 sm:even:border-l lg:border-l lg:first:border-l-0 lg:px-6"
              >
                {item}
              </li>
            ))}
          </ul>
        </aside>
      ) : null}
    </section>
  );
}

function SonjaServices({ salon }: SectionProps) {
  return (
    <section id="leistungen" className="sonja-screen sonja-anchor bg-canvas">
      <FadeUp className="mx-auto flex w-full max-w-page flex-col justify-center px-5 py-14 md:px-8 md:py-20">
        <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-accent">
          Leistungen
        </p>
        <h2 className="mt-3 font-serif text-[2rem] font-semibold tracking-tight md:text-4xl">
          {salon.content.servicesTitle}
        </h2>
        <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-muted">
          {salon.content.servicesIntro}
        </p>
        <SonjaServicesPanel bookingUrl={treatwellUrl(salon)} phoneHref={salon.phoneTel} />
      </FadeUp>
    </section>
  );
}

function SonjaAbout({ salon }: SectionProps) {
  const photo = salon.assets.team[0] ?? salon.assets.hero;

  return (
    <>
      <section id="ueber-sonja" className="sonja-screen sonja-anchor bg-surface">
      <FadeUp className="mx-auto grid w-full max-w-page items-center gap-8 px-5 py-14 md:px-8 md:py-20 lg:grid-cols-2 lg:gap-16 lg:py-10">
        <Visual
          image={photo}
          placeholderLabel="Sonja Rémy"
          sizes="(min-width: 1024px) 50vw, 100vw"
          zoom={false}
          fit="cover"
          className="aspect-[3/2] w-full"
        />
        <div className="flex flex-col justify-center">
          <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-accent">
            Über Sonja
          </p>
          <h2 className="mt-3 font-serif text-[2rem] font-semibold leading-tight tracking-tight md:text-4xl">
            {salon.content.aboutTitle}
          </h2>
          <div className="mt-6 max-w-xl space-y-5 text-[17px] leading-relaxed text-muted">
            {aboutParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <p className="mt-8 font-serif text-2xl">Sonja Rémy</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <TreatwellCta salon={salon} className={primaryBtn("w-full sm:w-auto")}>
              Termin buchen
            </TreatwellCta>
            <a href={salon.phoneTel} className={ghostBtn("w-full sm:w-auto")}>
              Anrufen
            </a>
          </div>
        </div>
      </FadeUp>
    </section>
    <SonjaSignature />
    </>
  );
}

function SonjaSignature() {
  return (
    <section className="bg-canvas" aria-label="Sonjas Haltung">
      <FadeUp className="mx-auto flex w-full max-w-page flex-col justify-center px-5 py-8 md:px-8 md:py-10">
        <div className="mx-auto max-w-3xl border-y border-line py-7 text-center md:py-9">
          <div className="mx-auto mb-5 h-px w-10 bg-accent" aria-hidden />
          <p className="font-serif text-[1.85rem] font-semibold leading-[1.15] tracking-tight md:text-[2.45rem]">
            Schönheit kommt von aussen –
            <br />
            Haargesundheit von innen.
          </p>
          <p className="mt-4 text-[11px] font-medium uppercase tracking-[0.14em] text-muted sm:text-[12px] sm:tracking-[0.18em]">
            <span className="block sm:inline">Sonja Rémy</span>
            <span className="hidden sm:inline"> · </span>
            <span className="mt-1.5 block sm:mt-0 sm:inline">
              persönliche Beratung mit Zeit für Sie
            </span>
          </p>
        </div>
      </FadeUp>
    </section>
  );
}

function SonjaReviews({ salon }: SectionProps) {
  const rating = salon.content.rating;

  return (
    <section id="stimmen" className="sonja-anchor overflow-x-clip bg-canvas">
      <FadeUp className="mx-auto flex w-full max-w-page flex-col px-5 py-14 md:px-8 md:py-20">
        <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-accent">Stimmen</p>
        <div className="mt-3 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="font-serif text-[2rem] font-semibold tracking-tight md:text-4xl">
              {salon.content.reviewsTitle ?? "Google-Bewertungen"}
            </h2>
            {rating ? (
              <>
                <p className="mt-5 font-serif text-6xl font-semibold leading-none md:text-7xl">
                  {rating.value.toFixed(1)}
                  <span className="ml-2 text-[2rem] text-accent md:text-4xl">★</span>
                </p>
                <p className="mt-3 text-[15px] text-muted">auf Google</p>
              </>
            ) : null}
          </div>
          <div className="flex flex-col items-start gap-1 lg:items-end">
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center text-[15px] text-accent underline underline-offset-4 hover:opacity-80"
            >
              Google-Bewertungen ansehen
            </a>
            {rating ? (
              <p className="text-[13px] text-muted-dim">{rating.count} Bewertungen</p>
            ) : null}
          </div>
        </div>
        <SonjaReviewsCarousel />
      </FadeUp>
    </section>
  );
}

function SonjaGallery({ salon }: SectionProps) {
  const items = salon.assets.gallery;

  return (
    <section id="salon" className="sonja-screen sonja-anchor bg-canvas">
      <FadeUp className="mx-auto flex w-full max-w-page flex-col justify-center px-5 py-14 md:px-8 md:py-20">
        <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-accent">Salon</p>
        <h2 className="mt-3 font-serif text-[2rem] font-semibold tracking-tight md:text-4xl">
          {salon.content.galleryTitle}
        </h2>
        {salon.content.galleryIntro ? (
          <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-muted">
            {salon.content.galleryIntro}
          </p>
        ) : null}
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {items.map((item, index) => (
            <Visual
              key={item.src}
              image={item}
              sizes={index === 0 ? "(min-width: 768px) 100vw, 100vw" : "(min-width: 768px) 50vw, 100vw"}
              zoom={false}
              fit="cover"
              className={index === 0 ? "aspect-[3/2] w-full md:col-span-2" : "aspect-[3/2] w-full"}
            />
          ))}
        </div>
      </FadeUp>
    </section>
  );
}

function SonjaContact({ salon }: SectionProps) {
  return (
    <section id="kontakt" className="sonja-screen sonja-anchor bg-surface">
      <FadeUp className="mx-auto flex w-full max-w-page flex-col justify-center px-5 py-14 md:px-8 md:py-20 lg:h-full">
        <div className="grid grid-cols-1 gap-12 lg:h-full lg:min-h-0 lg:grid-cols-2">
          <div>
            <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-accent">Kontakt</p>
            <h2 className="mt-3 font-serif text-[2rem] font-semibold tracking-tight md:text-4xl">
              Kommen Sie vorbei
            </h2>
            <address className="mt-6 not-italic text-[17px] leading-relaxed">
              <a
                href={salon.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent"
              >
                <p>{salon.content.address.street}</p>
                <p>
                  {salon.content.address.zip} {salon.content.address.city}
                </p>
              </a>
              <p className="mt-1 text-muted">Wipkingen · Kreis 10</p>
            </address>
            <p className="mt-5 font-serif text-3xl">
              <a href={salon.phoneTel} className="hover:text-accent">
                {salon.phoneDisplay}
              </a>
            </p>
            <p className="mt-3 text-[15px] text-muted">
              <WhatsAppCta salon={salon} className="underline underline-offset-4 hover:text-accent">
                Oder per WhatsApp schreiben
              </WhatsAppCta>
            </p>
            <SonjaSocial className="mt-5" />
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <TreatwellCta salon={salon} className={primaryBtn()}>
                Termin buchen
              </TreatwellCta>
              <a href={salon.phoneTel} className={ghostBtn()}>
                Anrufen
              </a>
              <a
                href={salon.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className={ghostBtn()}
              >
                Route öffnen
              </a>
            </div>
            <HoursTable hours={salon.content.hours} />
          </div>
          <div className="flex min-h-[280px] flex-col border border-line bg-canvas lg:h-full lg:min-h-0">
            <MapEmbed
              salon={salon}
              className="h-[280px] w-full max-w-full grow lg:h-full lg:min-h-0"
            />
          </div>
        </div>
      </FadeUp>
    </section>
  );
}

function SonjaFinalCta({ salon }: SectionProps) {
  return (
    <section className="sonja-screen bg-canvas">
      <FadeUp className="mx-auto flex w-full max-w-page flex-col justify-center px-5 py-14 md:px-8 md:py-20">
        <div className="border-t-2 border-accent pt-10">
          <h2 className="max-w-xl font-serif text-[2rem] font-semibold leading-tight tracking-tight md:text-4xl">
            Ich freue mich auf Ihren Besuch.
          </h2>
          <p className="mt-4 max-w-md text-[17px] leading-relaxed text-muted">
            Im kleinen Salon an der Nordstrasse – persönlich und mit Zeit für Sie.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <TreatwellCta salon={salon} className={primaryBtn("w-full sm:w-auto")}>
              Termin buchen
            </TreatwellCta>
            <a href={salon.phoneTel} className={ghostBtn("w-full sm:w-auto")}>
              Anrufen
            </a>
          </div>
        </div>
      </FadeUp>
    </section>
  );
}

function SonjaFooter({ salon }: SectionProps) {
  return (
    <footer className="border-t border-line bg-canvas text-ink">
      <div className="mx-auto grid max-w-page grid-cols-1 gap-10 px-5 py-12 md:grid-cols-3 md:px-8">
        <div>
          <p className="font-serif text-xl font-semibold">{salon.content.name}</p>
          <p className="mt-1 text-[15px] text-muted">Sonja Rémy</p>
          <p className="mt-3 text-[15px] leading-relaxed text-muted">
            {salon.content.address.street}
            <br />
            {salon.content.address.zip} Zürich-Wipkingen
          </p>
          <p className="mt-3 text-[15px] text-muted">
            <a href={salon.phoneTel} className="hover:text-accent">
              {salon.phoneDisplay}
            </a>
          </p>
          <SonjaSocial className="mt-5" />
        </div>
        <div className="flex flex-col gap-2 text-[15px] text-muted">
          {salon.content.navLinks.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-accent">
              {link.label}
            </a>
          ))}
        </div>
        <div className="flex flex-col gap-2 text-[15px] text-muted">
          <TreatwellCta salon={salon} className="hover:text-accent">
            Termin buchen
          </TreatwellCta>
          <a href={salon.phoneTel} className="hover:text-accent">
            Anrufen
          </a>
        </div>
      </div>
    </footer>
  );
}

function SonjaSticky({ salon }: SectionProps) {
  return (
    <div className="mobile-book-bar fixed inset-x-0 bottom-0 z-40 border-t border-line bg-canvas p-3 lg:hidden">
      <div className="grid grid-cols-2 gap-2">
        <TreatwellCta salon={salon} className={primaryBtn("text-[15px]")}>
          Termin buchen
        </TreatwellCta>
        <a href={salon.phoneTel} className={ghostBtn("text-[15px]")}>
          Anrufen
        </a>
      </div>
    </div>
  );
}

export const overrides: SalonOverrides = {
  navigation: SonjaNav,
  hero: SonjaHero,
  reviews: SonjaReviews,
  services: SonjaServices,
  about: SonjaAbout,
  gallery: SonjaGallery,
  contact: SonjaContact,
  finalCTA: SonjaFinalCta,
  footer: SonjaFooter,
  stickyCta: SonjaSticky,
};
