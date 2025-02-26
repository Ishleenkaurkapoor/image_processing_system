import { Request } from "../models/Request.js";

export async function checkStatus(req, res) {
    const request = await Request.findByPk(req.params.requestId);
    if (!request) return res.status(404).json({ error: "Request not found" });

    res.json({ requestId: request.id, status: request.status , downloadLink: request.downloadLink});
}
