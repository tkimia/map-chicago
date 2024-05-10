import wardsData from "../assets/chicago-wards.json";
import zipCodesData from "../assets/chicago-zip-codes.json";
import stateSenateData from "../assets/state-senate.json";
import illinoisHouseData from "../assets/illinois-house.json";

import { type Feature, type FeatureCollection } from "geojson";

type MapConfig = {
  data: FeatureCollection;
  getTooltip: (feature: Feature) => string;
};

export const boundaries: Record<string, MapConfig> = {
  "Illinois House Districts": {
    data: illinoisHouseData as FeatureCollection,
    getTooltip: (feature) => feature.properties?.name,
  },
  Wards: {
    data: wardsData as FeatureCollection,
    getTooltip: (feature) => `Ward ${feature.properties?.ward}`,
  },
  "Zip Codes": {
    data: zipCodesData as FeatureCollection,
    getTooltip: (feature) => feature.properties?.zip,
  },
  "State Senate Districts": {
    data: stateSenateData as FeatureCollection,
    getTooltip: (feature) => feature.properties?.DISTRICT,
  },
};
