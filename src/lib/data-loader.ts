import wardsData from "../assets/chicago-wards.json";
import illinoisHouseData from "../assets/illinois-house.json";
import stateSenateData from "../assets/illinois-senate.json";
import chicagoPoliceDistrictData from "../assets/chicago-police-districts.json";
import chicagoSchoolBoard from "../assets/chicago-school-board.json";
import cookCommissionersData from "../assets/cook-county-commissioners.json";

import { MultiPolygon, Polygon, type FeatureCollection } from "geojson";

export type Boundary = {
  id:
    | "illinois-house"
    | "illinois-senate"
    | "chicago-police"
    | "chicago-school"
    | "wards"
    | "cook-commissioners";
  name: string;
  description: string;
  data: FeatureCollection<MultiPolygon | Polygon>;
};

export const boundaries: Boundary[] = [
  {
    id: "illinois-house",
    name: "Illinois House Districts",
    description: "Boundaries for Illinois House Representative Districts.",
    data: illinoisHouseData as FeatureCollection<MultiPolygon | Polygon>,
  },
  {
    id: "illinois-senate",
    name: "Illinois Senate Districts",
    description: "Boundaries for Illinois Senate Districts.",
    data: stateSenateData as FeatureCollection<MultiPolygon | Polygon>,
  },
  {
    id: "chicago-police",
    name: "Chicago Police Districts",
    description: "Boundaries for Chicago Police Districts.",
    data: chicagoPoliceDistrictData as FeatureCollection<
      MultiPolygon | Polygon
    >,
  },
  {
    id: "chicago-school",
    name: "Chicago School Board",
    description:
      "Boundaries for Chicago School Board. 2024 elections will determine who represents each district.",
    data: chicagoSchoolBoard as FeatureCollection<MultiPolygon | Polygon>,
  },
  {
    id: "wards",
    name: "Wards",
    description: "Boundaries for Chicago Wards and Aldermen.",
    data: wardsData as FeatureCollection<MultiPolygon | Polygon>,
  },
  {
    id: "cook-commissioners",
    name: "Cook County Commissioners",
    description: "Boundaries for Cook County Commissioners.",
    data: cookCommissionersData as FeatureCollection<MultiPolygon | Polygon>,
  },
];
