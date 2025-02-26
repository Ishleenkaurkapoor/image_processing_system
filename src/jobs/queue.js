import { Worker } from "bullmq";
import {processImage }from "./imageProcessor.js";
import dotenv from "dotenv";
dotenv.config(); 

export async function startWorker() {
const worker = new Worker(
    "image-processing",
    async (job) => {
        console.log("Processing job:", job.name); 
        console.log("job data" ,job.data);
        if (job.name === "processImage") {
            await processImage(job.data.productId,job.data.imageUrl);
        }
    },
    { 
        connection: {
            host: process.env.REDIS_HOST,
            port: 15886,
            username: 'default',
            password: process.env.REDIS_PASSWORD
        } }
);

worker.on("completed", (job) => {
    console.log(`Job ${job.id} completed!`);
});

worker.on("failed", (job, err) => {
    console.error(` Job ${job.id} failed:`, err);
});
}