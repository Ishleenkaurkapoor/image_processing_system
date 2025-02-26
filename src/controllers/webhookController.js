import axios from "axios";
import { Request } from "../models/Request.js";

export async function triggerWebhook(requestId, csvFilePath) {
    try {
        // Fetch the webhook URL from the database
        const request = await Request.findOne({ where: {id: requestId } });
        console.log("request",request)

        if (!request) {
            console.log(`No webhook URL found for request: ${requestId}`);
            return;
        }

        console.log(`Triggering webhook for request ${requestId}...`);

        // Define the payload to send to the webhook
        const payload = {
            requestId,
            status: "COMPLETED",
            downloadLink: `${csvFilePath}`
        };

        // Make a POST request to the webhook URL
        const response = await axios.post(request.webhookUrl, payload, {
            headers: { "Content-Type": "application/json" }
        });

        console.log(" Webhook triggered successfully:", response.status);
    } catch (error) {
        console.error("Error triggering webhook:", error);
    }
}
