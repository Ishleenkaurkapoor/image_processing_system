import { Request } from "../models/Request.js";
import { Product } from "../models/Product.js";
import { existsSync, mkdirSync } from "fs";
import { join, basename } from "path";
import sharp from "sharp";
import saveToLocal from "../utils/uploadToLocal.js";
import { generateOutputCSV } from "../utils/generateOutputCsv.js";
import { triggerWebhook } from "../controllers/webhookController.js";

export async function processImage(productId, imagePath) {
    try {
        console.log("Processing image...");

        const processedDir = "../uploads/processed/";
        if (!existsSync(processedDir)) mkdirSync(processedDir, { recursive: true });

        const fileName = `processed_${basename(imagePath)}`;
        const outputPath = join(processedDir, fileName);

        console.log("Input Image Path:", imagePath);


        await sharp(imagePath)
            .resize(500)
            .jpeg({ quality: 50 })
            .toFile(outputPath);

        console.log("Image processing complete.");

    
        const localFilePath = await saveToLocal(outputPath);
     
        const product = await Product.findByPk(productId);
    
        const outputImageUrlList = product.outputImageUrl;
      
        


const udatedImageUrls = [...outputImageUrlList, localFilePath];
console.log(udatedImageUrls)



await Product.update(
    { outputImageUrl: udatedImageUrls, status: "PROCESSED" },
    { where: { id: product.id } }
);       

    
        const requestId = product.requestId;
        const allProcessed = await areAllImagesProcessed(requestId);

        if (allProcessed) {
          
            const csvFilePath = await generateOutputCSV(requestId);

            await Request.update({ status: "COMPLETED" , downloadLink : csvFilePath}, { where: { id: requestId } });

            console.log(`Request ${requestId} completed. CSV saved at: ${csvFilePath}`);
            await triggerWebhook(requestId, csvFilePath)
        }

        return localFilePath; 

    } catch (error) {
        console.error(" Error processing image:", error);
    }
}

async function areAllImagesProcessed(requestId) {
    const products = await Product.findAll({ where: { requestId } });
    return products.every((product) => product.outputImageUrl.length === product.inputImageUrl.length);
}
