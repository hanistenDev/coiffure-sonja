import type { CSSProperties, ReactNode } from "react";
import type { ResolvedSalon, SalonTheme } from "@/types/salon";
import { cn } from "@/lib/cn";

export function themeStyle(theme: SalonTheme): CSSProperties {
  return {
    ["--background" as string]: theme.background,
    ["--surface" as string]: theme.surface,
    ["--foreground" as string]: theme.foreground,
    ["--accent" as string]: theme.accent,
    ["--accent-foreground" as string]: theme.accentForeground,
    ["--muted" as string]: theme.muted,
    ["--muted-dim" as string]: theme.mutedDim,
    ["--border" as string]: theme.border,
    ["--overlay" as string]: theme.overlay,
    ["--display-font" as string]: theme.displayFont,
    ["--body-font" as string]: theme.bodyFont,
    colorScheme: theme.colorScheme,
    backgroundColor: theme.background,
    color: theme.foreground,
    fontFamily: theme.bodyFont,
  };
}

export function SalonRoot({
  salon,
  children,
}: {
  salon: ResolvedSalon;
  children: ReactNode;
}) {
  return (
    <div
      className={cn("salon-root min-h-dvh max-w-[100%] overflow-x-clip pb-24 lg:pb-0")}
      style={themeStyle(salon.theme)}
    >
      {children}
    </div>
  );
}
