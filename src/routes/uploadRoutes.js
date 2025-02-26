import { Router } from "express";
import multer from "multer";
import { uploadCSV } from "../controllers/uploadController.js";

 const router = Router();
const upload = multer({ dest: "uploads" });

/**
 * @swagger
 * /upload:
 *   post:
 *     summary: Upload CSV file for image processing
 *     description: Accepts a CSV file and processes the images.
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: file
 *         type: file
 *         required: true
 *         description: The CSV file to be uploaded
 *       - in: formData
 *         name: webhookUrl
 *         type: string
 *         required: true
 *         description: The webhook URL for callback
 *     responses:
 *       200:
 *         description: File uploaded successfully and processing started
 *       400:
 *         description: Bad request, missing parameters
 */

router.post("/upload", upload.single("file"), uploadCSV);

export default router;