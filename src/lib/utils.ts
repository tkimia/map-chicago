import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Boundary } from "./data-loader";
import { GeoJsonProperties } from "geojson";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isDefined<T>(
  value: T | null | undefined
): value is NonNullable<T> {
  return value !== null && value !== undefined;
}

export function getTitle(id: Boundary["id"], properties: GeoJsonProperties) {
  switch (id) {
    case "cook-commissioners":
      return `District ${properties?.DISTRICT_TXT}`;

    case "wards":
      return `Ward ${properties?.ward}`;
    case "chicago-police":
      return `${properties?.dist_label?.toLowerCase()} District Council`;
    case "chicago-school":
      return `District ${properties?.elec_dist}`;

    case "illinois-house":
    case "illinois-senate":
      return properties?.name;
  }
}

// McKinzey write this function:
function formatPhoneForHref(phone: string): string {
  return phone.replace(/\D/g, "");
}
