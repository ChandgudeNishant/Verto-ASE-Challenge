// swagger.js
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Inventory Management API",
      version: "1.0.0",
      description: "API for managing warehouse products and stock",
    },
    servers: [
      {
        url: "http://localhost:3000/api",
        description: "Local server (note: routes are mounted under /api)",
      },
    ],
  },
  apis: [path.join(process.cwd(), "routes", "*.js")], // point to route files
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerUi, swaggerSpec };
