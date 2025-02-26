import { Router } from "express";
import { checkStatus } from "../controllers/statusController.js";

const router = Router();

/**
 * @swagger
 * /status/{requestId}:
 *   get:
 *     summary: Get the status of an image processing request
 *     description: Retrieves the current status of a request, including the download link if available.
 *     parameters:
 *       - in: path
 *         name: requestId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the request to check status for
 *     responses:
 *       200:
 *         description: Status retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 requestId:
 *                   type: string
 *                 status:
 *                   type: string
 *                 downloadLink:
 *                   type: string
 *       404:
 *         description: Request not found
 *       500:
 *         description: Server error
 */
router.get("/status/:requestId", checkStatus);

export default router;