import wardsData from "../assets/chicago-wards.json";
import zipCodesData from "../assets/chicago-zip-codes.json";
import illinoisHouseData from "../assets/illinois-house.json";
import stateSenateData from "../assets/illinois-senate.json";
import chicagoPoliceDistrictData from "../assets/chicago-police-districts.json";
import chicagoSchoolBoard from "../assets/chicago-school-board.json";

import {
  MultiPolygon,
  Polygon,
  type Feature,
  type FeatureCollection,
} from "geojson";

type MapConfig = {
  data: FeatureCollection<MultiPolygon | Polygon>;
  getTooltip: (feature: Feature) => string;
};

export const boundaries: Record<string, MapConfig> = {
  "Illinois House Districts": {
    data: illinoisHouseData as FeatureCollection<MultiPolygon | Polygon>,
    getTooltip: (feature) => feature.properties?.name,
  },
  "Illinois Senate Districts": {
    data: stateSenateData as FeatureCollection<MultiPolygon | Polygon>,
    getTooltip: (feature) => feature.properties?.name,
  },
  "Chicago Police Districts": {
    data: chicagoPoliceDistrictData as FeatureCollection<
      MultiPolygon | Polygon
    >,
    getTooltip: (feature) => feature.properties?.dist_label,
  },
  "Chicago School Board": {
    data: chicagoSchoolBoard as FeatureCollection<MultiPolygon | Polygon>,
    getTooltip: (feature) => feature.properties?.Name,
  },
  Wards: {
    data: wardsData as FeatureCollection<MultiPolygon | Polygon>,
    getTooltip: (feature) => `Ward ${feature.properties?.ward}`,
  },
  "Zip Codes": {
    data: zipCodesData as FeatureCollection<MultiPolygon | Polygon>,
    getTooltip: (feature) => feature.properties?.zip,
  },
};
