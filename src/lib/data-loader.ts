import wardsData from "../assets/chicago-wards.json";
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

export type Boundary = {
  id:
    | "illinois-house"
    | "illinois-senate"
    | "chicago-police"
    | "chicago-school"
    | "wards";
  name: string;
  description: string;
  data: FeatureCollection<MultiPolygon | Polygon>;
  getTooltip: (feature: Feature) => string;
};

export const boundaries: Boundary[] = [
  {
    id: "illinois-house",
    name: "Illinois House Districts",
    description: "Boundaries for Illinois House Representative Districts.",
    data: illinoisHouseData as FeatureCollection<MultiPolygon | Polygon>,
    getTooltip: (feature) => feature.properties?.name,
  },
  {
    id: "illinois-senate",
    name: "Illinois Senate Districts",
    description: "Boundaries for Illinois Senate Districts.",
    data: stateSenateData as FeatureCollection<MultiPolygon | Polygon>,
    getTooltip: (feature) => feature.properties?.name,
  },
  {
    id: "chicago-police",
    name: "Chicago Police Districts",
    description: "Boundaries for Chicago Police Districts.",
    data: chicagoPoliceDistrictData as FeatureCollection<
      MultiPolygon | Polygon
    >,
    getTooltip: (feature) => feature.properties?.dist_label,
  },
  {
    id: "chicago-school",
    name: "Chicago School Board",
    description:
      "Boundaries for Chicago School Board. 2024 elections will determine who represents each district.",
    data: chicagoSchoolBoard as FeatureCollection<MultiPolygon | Polygon>,
    getTooltip: (feature) => feature.properties?.Name,
  },
  {
    id: "wards",
    name: "Wards",
    description: "Boundaries for Chicago Wards and Aldermen.",
    data: wardsData as FeatureCollection<MultiPolygon | Polygon>,
    getTooltip: (feature) => `Ward ${feature.properties?.ward}`,
  },
];
