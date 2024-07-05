import { readJsonFile, writeJsonFile } from "./utils";
import { FeatureCollection } from "geojson";

// Got this data from https://news.wttw.com/2024/06/25/47-candidates-file-petitions-run-chicagos-board-education
type Candidate = {
  name: string;
  url?: string;
};

const CANDIDATE_DATA: Candidate[][] = [
  [
    { name: "Jennifer Custer", url: "https://www.jennifercuster.com/" },
    { name: "Charles (Chuck) Hernandez" },
    {
      name: "Michelle N. Pierre",
      url: "https://okra-blackbird-4579.squarespace.com/",
    },
  ],

  [
    { name: "Ebony L. DeBerry", url: "https://ebony4education.org/" },
    { name: "Kate Doyle", url: "https://www.katedoyleforchicago.com/" },
    { name: "Daniel Steven Kleinman", url: "https://danielkleinman.org/" },
    {
      name: "Margaret “Maggie” Cullerton Hooper",
      url: "https://www.maggieforchicago.com/",
    },
    { name: "Bruce Leon" },
  ],

  [
    { name: "Carlos A. Rivas Jr.", url: "https://www.votecarlosrivas.com/" },
    { name: "Jason C. Dones", url: "https://www.donesforschoolboard.com/" },
    { name: "Kirk J. Ortiz", url: "https://www.friendsofkirk.com/" },
  ],

  [
    { name: "Kimberly Brown", url: "https://www.kimberlybrownforchicago.org/" },
    { name: "Karen Zaccor", url: "https://x.com/Kjzaccor" },
    { name: "Ellen Rosenfeld", url: "https://www.ellenforeducation.org/" },
    { name: "Thomas Day", url: "https://www.thomasday.org/" },
    { name: "Andrew A. Davis", url: "https://andrewadavis.com/" },
    { name: "Carmen Gioiosa" },
  ],

  [
    { name: "Anthony Hargrove" },
    { name: "Aaron “Jitu” Brown" },
    { name: "Kernetha Jones" },
    { name: "Jousef M. Shkoukani" },
    {
      name: "Michilla “Kyla” Blaise",
      url: "https://www.blaiseforschoolboard.com/",
    },
  ],

  [
    { name: "Jessica Biggs", url: "https://www.biggs4chicago.com/" },
    { name: "Anusha Thotakura", url: "https://www.anushaforcps.com/" },
    { name: "Brenda I. Delgado" },
    { name: "Danielle J. Wallace" },
    { name: "Andre Smith" },
  ],

  [
    { name: "Yesenia Lopez" },
    {
      name: "Jesus Ayala Jr.",
      url: "https://www.instagram.com/jesus.ayala.jr.for.cps7/",
    },
    { name: "Felipe “Phil” Luna Jr." },
    { name: "Eva A. Villalobos" },
    { name: "Raquel Don" },
  ],

  [
    { name: "Angel Gutierrez" },
    { name: "Felix Ponce" },
    { name: "Darius Dee Nix" },
  ],

  [
    { name: "Brittany Bailey Preston" },
    { name: "Therese Boyle" },
    { name: "Lanetta M. Thomas", url: "https://www.friendsforlanetta.org/" },
    { name: "Miquel Lewis", url: "https://www.miquellewisforeducation.com/" },
    {
      name: "La’Mont Raymond Williams",
      url: "https://lamontraymondwilliams.wordpress.com/",
    },
  ],

  [
    { name: "Che “Rhymefest” Smith", url: "https://rhymefestforcps.com/" },
    { name: "Adam Parrott-Sheffer", url: "https://adam4chi.com/" },
    { name: "Karin Norington-Reaves" },
    { name: "Robert Jones" },
    { name: "Nathaniel “Nate” Ward", url: "https://ward4theboard.com/" },
    { name: "Rosita Chatonda" },
    { name: "James M. Walton Jr." },
  ],
];

const JSON_FILE = "./src/assets/chicago-school-board2.json";

async function main() {
  const districtData = readJsonFile(JSON_FILE) as FeatureCollection;

  for (let i = 0; i < CANDIDATE_DATA.length; i++) {
    const districtsToUpdate = districtData.features.filter(
      (f) => f.id === i + 1
    );

    for (let j = 0; j < CANDIDATE_DATA[i].length; j++) {
      const candidate = CANDIDATE_DATA[i][j];

      for (const district of districtsToUpdate) {
        if (!district.properties) {
          continue;
        }

        district.properties[`candidate_${j + 1}`] = candidate.name;
        if (candidate.url) {
          district.properties[`candidate_${j + 1}_url`] = candidate.url;
        }
      }
    }
  }

  writeJsonFile(JSON_FILE, districtData);
}

main().catch(console.error);
