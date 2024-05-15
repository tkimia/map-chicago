import wardsData from "../assets/chicago-wards.json";
import zipCodesData from "../assets/chicago-zip-codes.json";
import illinoisHouseData from "../assets/illinois-house.json";
import stateSenateData from "../assets/illinois-senate.json";
import chicagoPoliceBeatData from "../assets/chicago-police-beats.json";

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
  "Illinois Senate Districts": {
    data: stateSenateData as FeatureCollection,
    getTooltip: (feature) => feature.properties?.name,
  },
  "Chicago Police Beats": {
    data: chicagoPoliceBeatData as FeatureCollection,
    getTooltip: (feature) => feature.properties?.beat_num,
  },
  Wards: {
    data: wardsData as FeatureCollection,
    getTooltip: (feature) => `Ward ${feature.properties?.ward}`,
  },
  "Zip Codes": {
    data: zipCodesData as FeatureCollection,
    getTooltip: (feature) => feature.properties?.zip,
  },
};
