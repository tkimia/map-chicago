/** Illinois Policy JSON to GeoJSON:
 * https://www.illinoispolicy.org/maps/ has data in some custom JSON format.
 * This script converts that data to GeoJSON.
 */
import fs from "fs";
import path from "path";
import { Feature, FeatureCollection } from "geojson";

type IllinoisPolicyData = {
  data: {
    lat: number;
    lng: number;
  }[];
  name: string;
  slug: string;
  person: {
    id: number;
    name: string;
    phone: string;
    email: string;
    image: string;
    district_office: string;
    central_office: string;
    districtId: number;
    party: string;
    partyClass: string;
  };
};

// use cli argument to specify filename
const filename = process.argv[2];
if (!filename) {
  console.error("Please provide a filename as an argument.");
  process.exit(1);
}

const data = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, filename), {
    encoding: "utf-8",
  })
) as IllinoisPolicyData[];

const features = data
  .filter((d) => d.data.length > 0)
  .map((d) => {
    const feature: Feature = {
      type: "Feature",
      properties: {
        name: d.name,
        slug: d.slug,
        person: d.person,
      },
      geometry: {
        type: "MultiPolygon",
        coordinates: [[d.data.map((coord) => [coord.lng, coord.lat])]],
      },
    };
    return feature;
  });

const result: FeatureCollection = {
  type: "FeatureCollection",
  features,
};

// write to file
fs.writeFileSync(
  path.resolve(__dirname, filename.replace(".json", ".geojson")),
  JSON.stringify(result, null, 2)
);
