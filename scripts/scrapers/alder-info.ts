import { JSDOM } from "jsdom";
import { amendFeature, readJsonFile, writeJsonFile } from "./utils";
import { type FeatureCollection } from "geojson";

const BASE_URL = "https://www.chicago.gov/city/en/about/wards/";
const IMAGE_PATH = "/images/alders";

async function main() {
  const wardData = readJsonFile(
    "./src/assets/chicago-wards.json"
  ) as FeatureCollection;

  for (const feature of wardData.features) {
    const { properties } = feature;
    const wardId: string | undefined = properties?.["ward_id"];
    if (!wardId) {
      console.error("Ward ID not found in feature properties", properties);
      continue;
    }
    const ward = wardId.padStart(2, "0");
    const url = `${BASE_URL}${ward}.html`;
    console.log(`Scraping ${url}`);
    const dom = await JSDOM.fromURL(url);
    const document = dom.window.document;
    const name = document.querySelector(".page-description h3")?.textContent;
    2;
    const tableData = {
      name,
      address: null as string | null,
      phone: null as string | null,
      email: null as string | null,
      image: `${IMAGE_PATH}/${ward}.jpg`,
      url,
    };
    Array.from(document.querySelectorAll(".page-description tr")).forEach(
      (row) => {
        const cells = Array.from(row.querySelectorAll("td"));
        const key = cells[0].textContent
          ?.trim()
          .replace(/:/g, "")
          .toLowerCase(); // Remove colon from the key
        const value = cells[1].textContent?.trim(); // Get the value

        if (!value) return;

        switch (key) {
          case "email":
            tableData.email = tableData.email ?? value;
            break;
          case "ward office":
            tableData.address = tableData.address ?? value;
            break;
          case "phone": {
            const values = value.split(/\s/);
            tableData.phone = tableData.phone ?? values[0].replace(/\D/g, "");
            break;
          }
          case "fax":
          case "city hall office":
            break;
          default:
            console.log(`Unknown key: ${key}`);
        }
      }
    );
    amendFeature(feature, tableData);
    feature.properties = { ...feature.properties, ...tableData };
  }
  writeJsonFile("./src/assets/chicago-wards.json", wardData);
}

main().catch(console.error);
