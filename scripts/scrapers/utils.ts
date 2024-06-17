import { readFileSync, writeFileSync } from "fs";

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
