"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export function FadeUp({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"in" | "pending" | "visible">("in");

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("visible");
          observer.disconnect();
        } else {
          setState("pending");
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const motion =
    state === "pending" ? "is-pending" : state === "visible" ? "is-visible" : "";

  return (
    <div ref={ref} className={`fade-up ${motion} ${className}`}>
      {children}
    </div>
  );
}
