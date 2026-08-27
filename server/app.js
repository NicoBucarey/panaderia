import express from "express";
import cors from "cors";
import { env } from "./src/config/env.js";
import authRoutes from "./src/routes/auth.js";
import categoryRoutes from "./src/routes/categories.js";
import productRoutes from "./src/routes/products.js";
import uploadRoutes from "./src/routes/upload.js";
import { notFoundHandler } from "./src/middleware/notFound.js";
import { errorHandler } from "./src/middleware/errorHandler.js";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "http://127.0.0.1:5173",
  ...env.CORS_ORIGIN.split(",").map((origin) => origin.trim()).filter(Boolean),
];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("CORS not allowed"));
    },
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "panaderia-backend" });
});

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
