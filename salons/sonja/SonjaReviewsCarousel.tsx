"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
} from "react";
import { cn } from "@/lib/cn";
import { sonjaReviews } from "./facts";

const AUTOPLAY_MS = 4200;
const SLIDE_MS = 600;
const SWIPE_PX = 48;
const START = 2;

type Review = (typeof sonjaReviews)[number];

function ReviewCard({ review, active }: { review: Review; active: boolean }) {
  return (
    <article
      className={cn(
        "flex h-full min-h-[17.5rem] flex-col justify-between border bg-surface px-5 py-6 md:min-h-[18.5rem] md:px-6 md:py-7",
        "transition-[opacity,box-shadow,border-color,color] duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
        active
          ? "border-ink/20 text-ink shadow-[0_10px_28px_rgba(36,28,22,0.07)]"
          : "border-line text-ink/75",
      )}
      aria-hidden={!active}
    >
      <p className="line-clamp-6 font-serif text-[1.15rem] leading-snug tracking-tight md:text-[1.28rem]">
        „{review.quote}“
      </p>
      <div className="mt-6">
        <p className="text-[15px] text-ink">{review.name}</p>
        <p className="mt-1 text-[12px] uppercase tracking-[0.16em] text-muted-dim">
          Google <span className="text-accent">★</span>
        </p>
      </div>
    </article>
  );
}

export function SonjaReviewsCarousel() {
  const count = sonjaReviews.length;
  const end = count + 1;
  const rightClone = count + 2;
  const slides: Review[] = [
    sonjaReviews[count - 2],
    sonjaReviews[count - 1],
    ...sonjaReviews,
    sonjaReviews[0],
    sonjaReviews[1],
  ];

  const [pos, setPos] = useState(START);
  const [instant, setInstant] = useState(false);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [ready, setReady] = useState(false);
  const viewportRef = useRef<HTMLDivElement>(null);
  const animatingRef = useRef(false);
  const posRef = useRef(pos);
  const reduceRef = useRef(reduceMotion);
  const goRef = useRef<(dir: 1 | -1) => void>(() => {});
  posRef.current = pos;
  reduceRef.current = reduceMotion;

  const realFromPos = useCallback(
    (p: number) => (((p - START) % count) + count) % count,
    [count],
  );

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(motion.matches);
    sync();
    setReady(true);
    motion.addEventListener("change", sync);
    return () => motion.removeEventListener("change", sync);
  }, []);

  const settle = useCallback(() => {
    const current = posRef.current;
    if (current === rightClone) {
      setInstant(true);
      posRef.current = START;
      setPos(START);
    } else if (current === 1) {
      setInstant(true);
      posRef.current = end;
      setPos(end);
    }
    animatingRef.current = false;
  }, [end, rightClone]);

  const lockNav = useCallback(() => {
    if (animatingRef.current) return false;
    animatingRef.current = !reduceRef.current;
    return true;
  }, []);

  const go = useCallback((dir: 1 | -1) => {
    if (!lockNav()) return;
    const next = posRef.current + dir;
    posRef.current = next;
    setPos(next);
  }, [lockNav]);
  goRef.current = go;

  const jumpTo = useCallback(
    (index: number) => {
      const next = index + START;
      if (next === posRef.current) return;
      if (!lockNav()) return;
      posRef.current = next;
      setPos(next);
    },
    [lockNav],
  );

  useEffect(() => {
    if (instant) return;
    if (reduceMotion) {
      settle();
      return;
    }
    const id = window.setTimeout(settle, SLIDE_MS + 50);
    return () => window.clearTimeout(id);
  }, [pos, instant, reduceMotion, settle]);

  useEffect(() => {
    if (!instant) return;
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setInstant(false));
    });
    return () => cancelAnimationFrame(id);
  }, [instant]);

  useEffect(() => {
    if (!ready || reduceMotion || paused) return;
    const id = window.setInterval(() => {
      goRef.current(1);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [ready, paused, reduceMotion]);

  const active = realFromPos(pos);
  const pointer = useRef<{ x: number; y: number; id: number } | null>(null);

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    pointer.current = { x: event.clientX, y: event.clientY, id: event.pointerId };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const start = pointer.current;
    pointer.current = null;
    if (!start || event.pointerId !== start.id) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) < SWIPE_PX || Math.abs(dx) < Math.abs(dy)) return;
    go(dx < 0 ? 1 : -1);
  };

  const pause = () => setPaused(true);
  const resume = () => setPaused(false);

  return (
    <div
      className="mt-10 min-w-0"
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      <div
        ref={viewportRef}
        className="sonja-review-viewport relative"
        role="region"
        aria-roledescription="Karussell"
        aria-label="Gästebewertungen"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            go(-1);
          }
          if (event.key === "ArrowRight") {
            event.preventDefault();
            go(1);
          }
        }}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => {
          pointer.current = null;
        }}
      >
        <div
          className={cn(
            "sonja-review-track",
            !instant && !reduceMotion && "is-animated",
          )}
          style={{ "--pos": String(pos) } as CSSProperties}
          onTransitionEnd={(event) => {
            if (event.target !== event.currentTarget) return;
            if (event.propertyName !== "transform") return;
            settle();
          }}
        >
          {slides.map((review, index) => (
            <div
              key={`${review.name}-${index}`}
              className="sonja-review-slide"
            >
              <ReviewCard review={review} active={index === pos} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center border border-line text-[18px] leading-none transition-colors hover:border-accent hover:text-accent"
            aria-label="Vorherige Bewertung"
            onClick={() => go(-1)}
          >
            ‹
          </button>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center border border-line text-[18px] leading-none transition-colors hover:border-accent hover:text-accent"
            aria-label="Nächste Bewertung"
            onClick={() => go(1)}
          >
            ›
          </button>
        </div>

        <div className="flex flex-nowrap items-center" aria-label="Position">
          {sonjaReviews.map((review, index) => (
            <button
              key={`${review.name}-${index}`}
              type="button"
              aria-label={`Bewertung ${index + 1} von ${count}: ${review.name}`}
              aria-current={index === active ? "true" : undefined}
              className="inline-flex h-7 w-7 shrink-0 items-center justify-center sm:h-8 sm:w-8"
              onClick={() => jumpTo(index)}
            >
              <span
                className={cn(
                  "h-2 w-2 rounded-full transition-colors",
                  index === active ? "bg-accent" : "bg-line",
                )}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
