import fs from "fs";
import path from "path";
import type { ResolvedAssets, ResolvedImage, SalonAssets, SalonImage } from "@/types/salon";

function publicFileExists(src: string): boolean {
  const relative = src.replace(/^\//, "").replace(/\//g, path.sep);
  return fs.existsSync(path.join(process.cwd(), "public", relative));
}

function resolveImage(image: SalonImage): ResolvedImage {
  return {
    ...image,
    missing: !publicFileExists(image.src),
  };
}

function resolveList(images: SalonImage[]): ResolvedImage[] {
  return images.map(resolveImage).filter((image) => !image.missing);
}

export function resolveAssets(assets: SalonAssets): ResolvedAssets {
  const heroCandidates = resolveList(assets.heroCandidates);
  const logo = assets.logo ? resolveImage(assets.logo) : undefined;

  return {
    logo: logo && !logo.missing ? logo : undefined,
    hero: heroCandidates[0],
    heroCandidates,
    interior: resolveList(assets.interior),
    services: resolveList(assets.services),
    gallery: resolveList(assets.gallery),
    team: resolveList(assets.team),
    storefront: resolveList(assets.storefront),
  };
}
