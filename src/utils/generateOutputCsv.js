import fs from "fs";
import { parseAsync } from "json2csv";
import { join } from "path";
import { Product } from "../models/Product.js";

export async function generateOutputCSV(requestId) {
    try {
        // Fetch all products for the given requestId
        const products = await Product.findAll({ where: { requestId } });

        if (!products.length) {
            throw new Error("No processed products found for this request.");
        }

        // Convert database results into CSV format
        const csvData = products.map((product, index) => ({
            "S. No.": index + 1,
            "Product Name": product.productName,
            "Input Image Urls": product.inputImageUrl, // Already stored in DB
            "Output Image Urls": product.outputImageUrl || "Processing..." // Ensure processed URL exists
        }));

        // Convert JSON to CSV format
        const csvString = await parseAsync(csvData, { fields: ["S. No.", "Product Name", "Input Image Urls", "Output Image Urls"] });

        // Define output file path
        const outputDir = join(process.cwd(), "uploads");
        if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

        const filePath = join(outputDir, `output_${requestId}.csv`);

        // Write CSV file
        fs.writeFileSync(filePath, csvString, "utf8");

        console.log(`CSV generated: ${filePath}`);

        return filePath; // Return the path for API response or webhook
    } catch (error) {
        console.error("Error generating CSV:", error);
        throw error;
    }
}
