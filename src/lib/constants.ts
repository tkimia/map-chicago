export function toLayerId(sourceId: string) {
  return `${sourceId}-layer`;
}

export const CHICAGO_COORDINATES = [41.8781, -87.6298] as const;

export const DEFAULT_STYLE = {
  opacity: 0.7,
  fillColor: "#2577ff",
  weight: 2,
  color: "white",
  dashArray: "3",
  fillOpacity: 0.5,
};

export const TOOLTIP_Z_INDEX = 650;
export const TOOLTIP_FOCUS_Z_INDEX = 700;
