import { readFileSync, writeFileSync } from "fs";
import { Feature } from "geojson";

export function readJsonFile(filePath) {
  try {
    const fileContent = readFileSync(filePath, "utf8");
    return JSON.parse(fileContent);
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    process.exit(1);
  }
}

// Function to write the updated JSON back to the file
export function writeJsonFile(filePath, data) {
  try {
    const fileContent = JSON.stringify(data, null, 2); // Pretty print the JSON
    writeFileSync(filePath, fileContent, "utf8");
  } catch (error) {
    console.error(`Error writing file ${filePath}:`, error);
    process.exit(1);
  }
}

type PersonProperties = {
  name?: string | null;
  address: string | null;
  phone: string | null;
  email: string | null;
  image?: string | null;
  twitterUrl?: string | null;
  website?: string | null;
};

export function amendFeature(feature: Feature, properties: PersonProperties) {
  feature.properties = {
    ...feature.properties,
    ...properties,
  };
}
