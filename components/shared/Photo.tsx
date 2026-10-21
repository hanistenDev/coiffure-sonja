import Image from "next/image";
import type { ResolvedImage } from "@/types/salon";
import { cn } from "@/lib/cn";
import { PlaceholderVisual } from "@/components/shared/PlaceholderVisual";

export function Photo({
  src,
  alt,
  className = "",
  sizes,
  priority = false,
  position = "center",
  fit = "cover",
  zoom = true,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes: string;
  priority?: boolean;
  position?: string;
  fit?: "cover" | "contain";
  zoom?: boolean;
}) {
  const local = src.startsWith("/");

  return (
    <div className={cn("group overflow-hidden bg-surface", className)}>
      <div className="relative h-full min-h-[inherit] w-full">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          quality={90}
          unoptimized={local}
          className={cn(
            zoom && "img-zoom",
            fit === "contain" ? "object-contain" : "object-cover",
          )}
          style={{ objectPosition: position }}
        />
      </div>
    </div>
  );
}

export function Visual({
  image,
  alt,
  className,
  sizes,
  priority = false,
  zoom = true,
  fit = "cover",
  placeholderLabel,
}: {
  image?: ResolvedImage;
  alt?: string;
  className?: string;
  sizes: string;
  priority?: boolean;
  zoom?: boolean;
  fit?: "cover" | "contain";
  placeholderLabel?: string;
}) {
  const label = alt ?? image?.alt ?? placeholderLabel ?? "";
  if (!image || image.missing) {
    return <PlaceholderVisual label={placeholderLabel ?? label} className={className} />;
  }

  return (
    <Photo
      src={image.src}
      alt={label}
      className={className}
      sizes={sizes}
      priority={priority}
      position={image.objectPosition ?? "center center"}
      fit={fit}
      zoom={zoom}
    />
  );
}
