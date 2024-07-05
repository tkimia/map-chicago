import { JSDOM } from "jsdom";
import { amendFeature, readJsonFile, writeJsonFile } from "./utils";
import { FeatureCollection } from "geojson";

const SENATE_URL =
  "https://www.ilga.gov/senate/default.asp?sortby=DistrictNumber&sortbyformer=&sortbyGA=103";
const HOUSE_URL =
  "https://www.ilga.gov/house/default.asp?sortby=DistrictNumber&sortbyformer=&sortbyGA=103";
const SENATE_JSON = "./src/assets/illinois-senate.json";
const HOUSE_JSON = "./src/assets/illinois-house.json";

const arr = [
  "/house/Rep.asp?GA=103&MemberID=3148",
  "/house/Rep.asp?GA=103&MemberID=3037",
  "/house/Rep.asp?GA=103&MemberID=3165",
  "/house/Rep.asp?GA=103&MemberID=3226",
  "/house/Rep.asp?GA=103&MemberID=3252",
  "/house/Rep.asp?GA=103&MemberID=3097",
  "/house/Rep.asp?GA=103&MemberID=3071",
  "/house/Rep.asp?GA=103&MemberID=3036",
  "/house/Rep.asp?GA=103&MemberID=3255",
  "/house/Rep.asp?GA=103&MemberID=3160",
  "/house/Rep.asp?GA=103&MemberID=3054",
  "/house/Rep.asp?GA=103&MemberID=3176",
  "/house/Rep.asp?GA=103&MemberID=3227",
  "/house/Rep.asp?GA=103&MemberID=3057",
  "/house/Rep.asp?GA=103&MemberID=3201",
  "/house/Rep.asp?GA=103&MemberID=3228",
  "/house/Rep.asp?GA=103&MemberID=3141",
  "/house/Rep.asp?GA=103&MemberID=3045",
  "/house/Rep.asp?GA=103&MemberID=3163",
  "/house/Rep.asp?GA=103&MemberID=3162",
  "/house/Rep.asp?GA=103&MemberID=3229",
  "/house/Rep.asp?GA=103&MemberID=3199",
  "/house/Rep.asp?GA=103&MemberID=3166",
  "/house/Rep.asp?GA=103&MemberID=3107",
  "/house/Rep.asp?GA=103&MemberID=3145",
  "/house/Rep.asp?GA=103&MemberID=3158",
  "/house/Rep.asp?GA=103&MemberID=3104",
  "/house/Rep.asp?GA=103&MemberID=3027",
  "/house/Rep.asp?GA=103&MemberID=3050",
  "/house/Rep.asp?GA=103&MemberID=3026",
  "/house/Rep.asp?GA=103&MemberID=3020",
  "/house/Rep.asp?GA=103&MemberID=3200",
  "/house/Rep.asp?GA=103&MemberID=3058",
  "/house/Rep.asp?GA=103&MemberID=3118",
  "/house/Rep.asp?GA=103&MemberID=3251",
  "/house/Rep.asp?GA=103&MemberID=3049",
  "/house/Rep.asp?GA=103&MemberID=3260",
  "/house/Rep.asp?GA=103&MemberID=3139",
  "/house/Rep.asp?GA=103&MemberID=3091",
  "/house/Rep.asp?GA=103&MemberID=3084",
  "/house/Rep.asp?GA=103&MemberID=3182",
  "/house/Rep.asp?GA=103&MemberID=3137",
  "/house/Rep.asp?GA=103&MemberID=3085",
  "/house/Rep.asp?GA=103&MemberID=3038",
  "/house/Rep.asp?GA=103&MemberID=3230",
  "/house/Rep.asp?GA=103&MemberID=3234",
  "/house/Rep.asp?GA=103&MemberID=3150",
  "/house/Rep.asp?GA=103&MemberID=3231",
  "/house/Rep.asp?GA=103&MemberID=3184",
  "/house/Rep.asp?GA=103&MemberID=3159",
  "/house/Rep.asp?GA=103&MemberID=3232",
  "/house/Rep.asp?GA=103&MemberID=3185",
  "/house/Rep.asp?GA=103&MemberID=3262",
  "/house/Rep.asp?GA=103&MemberID=3233",
  "/house/Rep.asp?GA=103&MemberID=3074",
  "/house/Rep.asp?GA=103&MemberID=3052",
  "/house/Rep.asp?GA=103&MemberID=3259",
  "/house/Rep.asp?GA=103&MemberID=3142",
  "/house/Rep.asp?GA=103&MemberID=3136",
  "/house/Rep.asp?GA=103&MemberID=3047",
  "/house/Rep.asp?GA=103&MemberID=3147",
  "/house/Rep.asp?GA=103&MemberID=3235",
  "/house/Rep.asp?GA=103&MemberID=3109",
  "/house/Rep.asp?GA=103&MemberID=3151",
  "/house/Rep.asp?GA=103&MemberID=3149",
  "/house/Rep.asp?GA=103&MemberID=3193",
  "/house/Rep.asp?GA=103&MemberID=3135",
  "/house/Rep.asp?GA=103&MemberID=3186",
  "/house/Rep.asp?GA=103&MemberID=3053",
  "/house/Rep.asp?GA=103&MemberID=3120",
  "/house/Rep.asp?GA=103&MemberID=3113",
  "/house/Rep.asp?GA=103&MemberID=3236",
  "/house/Rep.asp?GA=103&MemberID=3111",
  "/house/Rep.asp?GA=103&MemberID=3237",
  "/house/Rep.asp?GA=103&MemberID=3223",
  "/house/Rep.asp?GA=103&MemberID=3146",
  "/house/Rep.asp?GA=103&MemberID=3224",
  "/house/Rep.asp?GA=103&MemberID=3046",
  "/house/Rep.asp?GA=103&MemberID=3171",
  "/house/Rep.asp?GA=103&MemberID=3044",
  "/house/Rep.asp?GA=103&MemberID=3138",
  "/house/Rep.asp?GA=103&MemberID=3256",
  "/house/Rep.asp?GA=103&MemberID=3225",
  "/house/Rep.asp?GA=103&MemberID=3077",
  "/house/Rep.asp?GA=103&MemberID=3187",
  "/house/Rep.asp?GA=103&MemberID=3059",
  "/house/Rep.asp?GA=103&MemberID=3238",
  "/house/Rep.asp?GA=103&MemberID=3154",
  "/house/Rep.asp?GA=103&MemberID=3108",
  "/house/Rep.asp?GA=103&MemberID=3239",
  "/house/Rep.asp?GA=103&MemberID=3240",
  "/house/Rep.asp?GA=103&MemberID=3042",
  "/house/Rep.asp?GA=103&MemberID=3244",
  "/house/Rep.asp?GA=103&MemberID=3055",
  "/house/Rep.asp?GA=103&MemberID=3246",
  "/house/Rep.asp?GA=103&MemberID=3080",
  "/house/Rep.asp?GA=103&MemberID=3241",
  "/house/Rep.asp?GA=103&MemberID=3079",
  "/house/Rep.asp?GA=103&MemberID=3089",
  "/house/Rep.asp?GA=103&MemberID=3081",
  "/house/Rep.asp?GA=103&MemberID=3153",
  "/house/Rep.asp?GA=103&MemberID=3189",
  "/house/Rep.asp?GA=103&MemberID=3086",
  "/house/Rep.asp?GA=103&MemberID=3257",
  "/house/Rep.asp?GA=103&MemberID=3242",
  "/house/Rep.asp?GA=103&MemberID=3250",
  "/house/Rep.asp?GA=103&MemberID=3114",
  "/house/Rep.asp?GA=103&MemberID=3243",
  "/house/Rep.asp?GA=103&MemberID=3082",
  "/house/Rep.asp?GA=103&MemberID=3156",
  "/house/Rep.asp?GA=103&MemberID=3190",
  "/house/Rep.asp?GA=103&MemberID=3112",
  "/house/Rep.asp?GA=103&MemberID=3083",
  "/house/Rep.asp?GA=103&MemberID=3245",
  "/house/Rep.asp?GA=103&MemberID=3192",
  "/house/Rep.asp?GA=103&MemberID=3110",
  "/house/Rep.asp?GA=103&MemberID=3155",
  "/house/Rep.asp?GA=103&MemberID=3191",
  "/house/Rep.asp?GA=103&MemberID=3116",
  "/house/Rep.asp?GA=103&MemberID=3169",
  "/house/Rep.asp?GA=103&MemberID=3249",
  "/house/Rep.asp?GA=103&MemberID=3072",
  "/house/Rep.asp?GA=103&MemberID=3122",
  "/house/Rep.asp?GA=103&MemberID=3174",
  "/house/Rep.asp?GA=103&MemberID=3143",
  "/house/Rep.asp?GA=103&MemberID=3140",
];

async function main() {
  const districtData = readJsonFile(SENATE_JSON) as FeatureCollection;

  let i = 0;
  await findMemberURLs(SENATE_URL, (url) => {
    amendFeature(districtData.features[i], {
      website: url,
    });
    i++;
  });

  writeJsonFile(SENATE_JSON, districtData);

  const houseData = readJsonFile(HOUSE_JSON) as FeatureCollection;
  for (let j = 0; j < arr.length; j++) {
    try {
      amendFeature(houseData.features[j], {
        website: `https://www.ilga.gov${arr[j]}`,
      });
    } catch {}
  }

  writeJsonFile(HOUSE_JSON, houseData);
}

async function findMemberURLs(mainUrl: string, onUrl: (url: string) => void) {
  const dom = await JSDOM.fromURL(SENATE_URL);

  const rows = dom.window.document.querySelectorAll('[name="member"] tbody tr');
  console.log(rows.length, "rows found on ", mainUrl);

  rows.forEach((row) => {
    const nameCell = row.querySelector("td a.notranslate");
    if (nameCell) {
      const path = nameCell.getAttribute("href");

      try {
        onUrl(`https://www.ilga.gov${path}`);
      } catch {}
    }
  });
}

main().catch(console.error);
