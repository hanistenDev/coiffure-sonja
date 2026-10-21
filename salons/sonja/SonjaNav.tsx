"use client";

import { useEffect, useRef, useState } from "react";
import { TREATWELL_URL } from "./facts";
import type { SectionProps } from "@/types/salon";

function treatwellUrl(salon: SectionProps["salon"]) {
  return salon.booking.externalUrl ?? TREATWELL_URL;
}

export function SonjaNav({ salon }: SectionProps) {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const sync = () => {
      document.documentElement.style.setProperty(
        "--sonja-nav-h",
        `${el.getBoundingClientRect().height}px`,
      );
    };

    sync();
    const observer = new ResizeObserver(sync);
    observer.observe(el);
    window.addEventListener("resize", sync);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", sync);
      document.documentElement.style.removeProperty("--sonja-nav-h");
    };
  }, [open]);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 border-b border-line bg-canvas"
    >
      <div className="mx-auto flex h-16 min-w-0 max-w-page items-center justify-between gap-3 px-4 lg:px-8">
        <a href="#home" className="min-w-0 truncate font-serif text-[18px] font-semibold tracking-tight">
          {salon.content.shortName ?? salon.content.name}
        </a>

        <nav className="hidden items-center gap-5 xl:gap-7 lg:flex" aria-label="Hauptnavigation">
          {salon.content.navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap text-[14px] text-muted transition-colors hover:text-ink xl:text-[15px]"
            >
              {link.label}
            </a>
          ))}
          <a href={salon.phoneTel} className="whitespace-nowrap text-[15px] text-muted hover:text-ink">
            Anrufen
          </a>
          <a
            href={treatwellUrl(salon)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center bg-accent px-5 text-[14px] font-medium text-accent-ink transition-opacity hover:opacity-90"
          >
            Termin buchen
          </a>
        </nav>

        <div className="flex shrink-0 items-center gap-2 lg:hidden">
          <a
            href={treatwellUrl(salon)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center bg-accent px-4 text-[13px] font-medium text-accent-ink"
          >
            Buchen
          </a>
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center border border-line"
            aria-expanded={open}
            aria-controls="sonja-mobile-nav"
            aria-label={open ? "Menü schliessen" : "Menü öffnen"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="text-xl leading-none">{open ? "×" : "☰"}</span>
          </button>
        </div>
      </div>

      {open ? (
        <div id="sonja-mobile-nav" className="border-t border-line bg-canvas px-5 py-5 lg:hidden">
          <nav className="flex flex-col gap-3" aria-label="Mobiles Menü">
            {salon.content.navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-serif text-2xl"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a href={salon.phoneTel} className="pt-2 text-[16px] text-muted">
              Anrufen · {salon.phoneDisplay}
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
