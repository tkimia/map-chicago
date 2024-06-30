import { amendFeature, readJsonFile, writeJsonFile } from "./utils";
import { FeatureCollection } from "geojson";

const JSON_FILE = "./src/assets/cook-county-commissioners.json";

const fullURL =
  "https://gis.cookcountyil.gov/traditional/rest/services/politicalBoundary/MapServer/26/query?f=json&resultOffset=0&resultRecordCount=1000&where=RELATE_KEY%20LIKE%20%27CommissionerDistrict%25%27&outFields=OBJECTID%2Coffice%2Cjurisdiction%2CfirstName%2ClastName%2Cterm%2CaddressStreet_1%2CaddressSuite_1%2Ccity1%2Cstate1%2Czip1%2Cphone1%2Curl1%2Cemail1%2CaddressStreet_2%2CaddressSuite_2%2Ccity2%2Cstate2%2Czip2%2ClastElectedDate%2ClevelOfGovernment%2CjurisdictionType&outSR=102671&returnGeometry=false&spatialRel=";

async function main() {
  const districtData = readJsonFile(JSON_FILE) as FeatureCollection;

  const answer = await fetch(fullURL, {
    credentials: "omit",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:127.0) Gecko/20100101 Firefox/127.0",
      Accept: "*/*",
      "Accept-Language": "en-US,en;q=0.5",
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "cross-site",
      Priority: "u=4",
      Pragma: "no-cache",
      "Cache-Control": "no-cache",
    },
    referrer: "https://cookcountyil.maps.arcgis.com/",
    method: "GET",
    mode: "cors",
  });

  const body = await answer.json();

  const commissioners = body.features.map(
    (feature) => feature.attributes as Commissioner
  );

  for (const commissioner of commissioners) {
    const districtNum = commissioner.jurisdiction.match(/\d+/g)?.[0];
    if (!districtNum) {
      console.error("District number not found in jurisdiction", commissioner);
      continue;
    }

    const featureToAmend = districtData.features.find(
      (f) => f.properties?.DISTRICT_TXT === districtNum
    );
    if (!featureToAmend) {
      console.error("District not found in data", districtNum);
      continue;
    }

    amendFeature(featureToAmend, {
      name: `${commissioner.firstName} ${commissioner.lastName}`,
      address: `${commissioner.addressStreet_1} ${commissioner.city1}, ${commissioner.state1} ${commissioner.zip1}`,
      phone: commissioner.phone1,
      email: commissioner.email1,
    });
  }
  writeJsonFile(JSON_FILE, districtData);
}

main().catch(console.error);

type Commissioner = {
  jurisdiction: string;
  firstName: string;
  lastName: string;
  addressStreet_1: string;
  addressSuite_1: null;
  city1: string;
  state1: string;
  zip1: null;
  phone1: string;
  url1: string;
  email1: string;
  addressStreet_2: string;
  addressSuite_2: null;
  city2: string;
  state2: string;
  zip2: null;
  levelOfGovernment: string;
  jurisdictionType: string;
};
