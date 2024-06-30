import { readJsonFile, writeJsonFile } from "./utils";
import { FeatureCollection } from "geojson";

// Got this data from https://news.wttw.com/2024/06/25/47-candidates-file-petitions-run-chicagos-board-education

const CANDIDATE_DATA = [
  ["Jennifer Custer", "Charles (Chuck) Hernandez", "Michelle N. Pierre"],

  [
    "Ebony L. DeBerry",
    "Kate Doyle",
    "Daniel Steven Kleinman",
    "Margaret “Maggie” Cullerton Hooper",
    "Bruce Leon",
  ],

  ["Carlos A. Rivas Jr.", "Jason C. Dones", "Kirk J. Ortiz"],

  [
    "Kimberly Brown",
    "Karen Zaccor",
    "Ellen Rosenfeld",
    "Thomas Day",
    "Andrew A. Davis",
    "Carmen Gioiosa",
  ],

  [
    "Anthony Hargrove",
    "Aaron “Jitu” Brown",
    "Kernetha Jones",
    "Jousef M. Shkoukani",
    "Michilla “Kyla” Blaise",
  ],

  [
    "Jessica Biggs",
    "Anusha Thotakura",
    "Brenda I. Delgado",
    "Danielle J. Wallace",
    "Andre Smith",
  ],

  [
    "Yesenia Lopez",
    "Jesus Ayala Jr.",
    "Felipe “Phil” Luna Jr.",
    "Eva A. Villalobos",
    "Raquel Don",
  ],

  ["Angel Gutierrez", "Felix Ponce", "Darius Dee Nix"],

  [
    "Brittany Bailey Preston",
    "Therese Boyle",
    "Lanetta M. Thomas",
    "Miquel Lewis",
    "La’Mont Raymond Williams",
  ],

  [
    "Che “Rhymefest” Smith",
    "Adam Parrott-Sheffer",
    "Karin Norington-Reaves",
    "Robert Jones",
    "Nathaniel “Nate” Ward",
    "Rosita Chatonda",
    "James M. Walton Jr.",
  ],
];

const JSON_FILE = "./src/assets/chicago-school-board.json";

async function main() {
  const districtData = readJsonFile(JSON_FILE) as FeatureCollection;

  for (let i = 0; i < CANDIDATE_DATA.length; i++) {
    const districtRegex = new RegExp(`District ${i + 1}[A|B]`);

    const districtsToUpdate = districtData.features.filter((f) =>
      districtRegex.test(f.properties?.Name || "")
    );

    for (let j = 0; j < CANDIDATE_DATA[i].length; j++) {
      const candidate = CANDIDATE_DATA[i][j];

      for (const district of districtsToUpdate) {
        if (!district.properties) {
          continue;
        }

        district.properties[`candidate_${j + 1}`] = candidate;
      }
    }
  }

  writeJsonFile(JSON_FILE, districtData);
}

main().catch(console.error);
