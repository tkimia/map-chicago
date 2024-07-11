import { JSDOM } from "jsdom";
import { readJsonFile, writeJsonFile } from "./utils";
import { type FeatureCollection } from "geojson";

const BASE_URL =
  "https://www.chicago.gov/city/en/depts/ccpsa/supp_info/district-council-pages/";
const JSON_FILE = "./src/assets/chicago-police-districts.json";

async function main() {
  const districtData = readJsonFile(JSON_FILE) as FeatureCollection;

  for (const feature of districtData.features) {
    const properties = feature.properties;
    const councilId: string | undefined = properties?.["dist_num"];
    if (!councilId) {
      console.error(
        "District Council ID not found in feature properties",
        properties
      );
      continue;
    }
    const council = councilId.padStart(3, "0");
    const url = `${BASE_URL}DC${council}.html`;

    console.log(`Scraping ${url}`);

    const dom = await JSDOM.fromURL(url);
    const document = dom.window.document;
    const emailLinks = document.querySelectorAll("ul a[href^='mailto:']");

    const scrapedData: CouncilData = {
      ccpsaUrl: url,
    };

    for (let i = 0; i < emailLinks.length; i++) {
      const link = emailLinks[i];
      const nameAndTitle = link.parentElement?.textContent;

      if (!nameAndTitle) {
        console.error("Name and title not found in scraped data");
        continue;
      }

      const [name, title, email] = nameAndTitle.split(/\s\W\s/);
      console.log(`NAME: ${name}, TITLE: ${title}, EMAIL: ${email}`);

      if (Object.values(scrapedData).includes(name)) {
        console.error(name, "already exists in scraped data");
        continue;
      }

      scrapedData[`person_${i + 1}_name`] = name;
      scrapedData[`person_${i + 1}_title`] = title;
      scrapedData[`person_${i + 1}_email`] = email;
    }

    feature.properties = { ...feature.properties, ...scrapedData };
  }
  writeJsonFile(JSON_FILE, districtData);
}

main().catch(console.error);

type CouncilData = {
  ccpsaUrl: string;
  [key: `person_${number}_name`]: string | undefined;
  [key: `person_${number}_email`]: string | undefined;
  [key: `person_${number}_title`]: string | undefined;
};
