import { createReadStream } from "fs";
import csvParser from "csv-parser";

/**
 * Parses a CSV file and converts it into JSON format.
 * @param {string} filePath - The path to the uploaded CSV file.
 * @returns {Promise<Array>} - Resolves to an array of objects representing CSV data.
 */
async function parseCsv(filePath) {
    return new Promise((resolve, reject) => {
        const results = [];

        createReadStream(filePath)
            .pipe(csvParser())
            .on("data", (row) => {
                results.push(row);
            })
            .on("end", () => {
                resolve(results);
            })
            .on("error", (error) => {
                reject(error);
            });
    });
}

export default parseCsv;