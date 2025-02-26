import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Image Processing API",
            version: "1.0.0",
            description: "API Documentation for the image processing service",
        },
    },
    apis: ["./src/routes/*.js"], // Adjust path based on where your routes are
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export default function setupSwagger(app) {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
}
