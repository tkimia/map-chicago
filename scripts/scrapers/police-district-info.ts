import { JSDOM } from "jsdom";
import { amendFeature, readJsonFile, writeJsonFile } from "./utils";
import { FeatureCollection } from "geojson";

const BASE_URL = "https://home.chicagopolice.org/about/police-districts/";
const JSON_FILE = "./src/assets/chicago-police-districts.json";

async function main() {
  const districtData = readJsonFile(JSON_FILE) as FeatureCollection;

  const dom = await JSDOM.fromURL(BASE_URL);

  const links = dom.window.document.querySelectorAll("#main .cg-text a");

  for (const link of links) {
    const url = link.getAttribute("href");
    if (!url) {
      console.error("URL not found in link", link);
      continue;
    }
    const districtNum = url?.match(/\d+/g)?.[0];
    if (!districtNum) {
      console.error("District number not found in URL", url);
      continue;
    }

    const featureToAmend = districtData.features.find(
      (f) => f.properties?.dist_num === districtNum
    );
    if (!featureToAmend) {
      console.error("District not found in data", districtNum);
      continue;
    }

    const districtDom = await JSDOM.fromURL(url);
    const document = districtDom.window.document;
    const main = document.querySelector("#main");
    if (!main) continue;

    const name = main.querySelector("h3")?.textContent?.split(",")[0];
    const address = main
      .querySelector(".col-md-9 p")
      ?.innerHTML.replace(/<br>/g, ", ")
      .trim();
    // EMAIL IS OBFUSCATED BY CLOUDFLARE! FOR NOW JUST ASSUME
    const email = `CAPS.0${districtNum}District@chicagopolice.org`;
    const phone = main
      .querySelector(".fa-phone")
      ?.nextSibling?.textContent?.trim()
      .split(" ")[1];
    const twitterUrl = main
      .querySelector("a[href^='https://www.twitter.com']")
      ?.getAttribute("href");
    const imgUrl = main.querySelector("img")?.getAttribute("src");

    amendFeature(featureToAmend, {
      name,
      addresses: address ? [address] : [],
      phoneNumbers: phone ? [phone] : [],
      emails: email ? [email] : [],
      image: imgUrl,
      twitterUrl,
    });

    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  writeJsonFile(JSON_FILE, districtData);
}

main().catch(console.error);
