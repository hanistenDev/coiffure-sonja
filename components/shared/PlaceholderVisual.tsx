import { cn } from "@/lib/cn";

export function PlaceholderVisual({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={cn("placeholder-visual relative flex overflow-hidden bg-surface", className)}
      aria-hidden
    >
      <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(135deg,transparent_0,transparent_46%,var(--border)_46%,var(--border)_47%,transparent_47%),linear-gradient(45deg,transparent_0,transparent_46%,var(--border)_46%,var(--border)_47%,transparent_47%)] [background-size:28px_28px]" />
      <div className="relative z-[1] flex h-full min-h-[inherit] w-full flex-col justify-end p-5">
        <span className="text-[11px] uppercase tracking-[0.18em] text-accent">
          Bildplatzhalter
        </span>
        {label ? (
          <span className="mt-2 max-w-[16rem] font-serif text-xl leading-tight">{label}</span>
        ) : null}
      </div>
    </div>
  );
}
