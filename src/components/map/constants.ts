import { Layer, type PathOptions } from "leaflet";

export const DEFAULT_STYLE: PathOptions = {
  opacity: 0.7,
  fillColor: "#2577ff",
  weight: 2,
  color: "white",
  dashArray: "3",
  fillOpacity: 0.5,
};

export const TOOLTIP_Z_INDEX = 650;
export const TOOLTIP_FOCUS_Z_INDEX = 700;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const tooltipElement = (layer: any) =>
  layer._tooltip.getElement() as HTMLElement;

export function focusTooltip(layer: Layer) {
  const element = tooltipElement(layer);
  element.style.fontSize = "16px";
  element.style.zIndex = TOOLTIP_FOCUS_Z_INDEX.toString();
  element.style.opacity = "1";
}

export function blurTooltip(layer: Layer) {
  const element = tooltipElement(layer);
  element.style.fontSize = "12px";
  element.style.zIndex = TOOLTIP_Z_INDEX.toString();
  element.style.opacity = "0.9";
}
