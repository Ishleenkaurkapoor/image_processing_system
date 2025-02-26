import csvParser  from "csv-parser";
import fs from "fs";
import {Request} from "../models/Request.js";
import {Product }from "../models/Product.js";
import { imageQueue }  from "../config/redis.js";

export async function uploadCSV(req, res) {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    try {

        const { webhookUrl } = req.body;

        if (!webhookUrl) {
            return res.status(400).json({ error: "webhookUrl is required" });
        }
        const request = await Request.create({ webhookUrl });


        const products = [];

        fs.createReadStream(req.file.path)
        .pipe(csvParser())
        .on("data", async (row) => {
            const imageUrls = row["Input Image Urls"].split(",").map(url => url.trim()); // Convert to array

            const product = await Product.create({
                requestId: request.id,
                productName: row["Product Name"],
                inputImageUrl: imageUrls,
                status: "PENDING"
            });

            // ✅ Add each image URL to the processing queue
            imageUrls.forEach((imageUrl) => {
                imageQueue.add("processImage", {
                    productId: product.id,
                    imageUrl
                });
            });
        })
        .on("end", async () => {
            res.json({ requestId: request.id, message: "File uploaded and processing started" });
            await startWorker();
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to process CSV", details: error.message });
    }
}
