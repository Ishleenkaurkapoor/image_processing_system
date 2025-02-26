import express, { json } from "express";
import cors from "cors";
import uploadRoutes from "./src/routes/uploadRoutes.js";
import statusRoutes from "./src/routes/statusRoutes.js";
import setupSwagger from "./swagger.js";

const app = express();

// Middleware
app.use(json());
app.use(cors()); // Enable CORS

// Routes
app.use("/api", uploadRoutes);
app.use("/api", statusRoutes);
setupSwagger(app); 

// Health check endpoint
app.get("/", (req, res) => {
    res.send(" Backend is running...");
});

export default app;