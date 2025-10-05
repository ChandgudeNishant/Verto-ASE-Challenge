// index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/product.routes.js";
import connectDB from "./config/db.js";
import { swaggerUi, swaggerSpec } from "./swagger.js";


dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/products", productRoutes);

// swagger ui
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 404 handler for unknown routes
app.use((req, res, next) => {
  res.status(404).json({ error: "Not Found" });
});

// centralized error-handling middleware
app.use((err, req, res, next) => {
  // log full error for debugging
  console.error("Unhandled Error:", err);

  // friendly mapping
  const msg = err.message || "Internal Server Error";
  if (msg === "Invalid Product ID" || msg === "Insufficient stock" || msg.startsWith("Invalid amount")) {
    return res.status(400).json({ error: msg });
  }
  if (msg === "Product not found") {
    return res.status(404).json({ error: msg });
  }
  if (err.name === "ValidationError" || err.name === "CastError") {
    return res.status(400).json({ error: msg });
  }

  // default
  return res.status(500).json({ error: "Internal Server Error" });
});

// start server after DB connection
const PORT = process.env.PORT || 3000;
(async function start() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server listening on http://localhost:${PORT}`);
      console.log(`📘 Swagger UI available at http://localhost:${PORT}/api-docs`);
    });
  } catch (err) {
    console.error("Failed to start app:", err.message);
    process.exit(1);
  }
})();
