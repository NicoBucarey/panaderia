import express from "express"
import cors from "cors"
import path from "path"
import { fileURLToPath } from "url"
import authRoutes from "./routes/auth.js"
import productRoutes from "./routes/products.js"
import categoryRoutes from "./routes/categories.js"
import uploadRoutes from "./routes/upload.js"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const app = express()
const PORT = process.env.PORT || 5000

// ==================== MIDDLEWARES ====================
// CORS: Permite solicitudes desde el frontend (Vite en localhost:5173)
app.use(cors({
  origin: process.env.NODE_ENV === "production" 
    ? "https://tudominio.vercel.app" 
    : "http://localhost:5173",
  credentials: true
}))

// JSON Parsing: Convierte el body de las requests en objetos JavaScript
app.use(express.json())

// Middleware para servir archivos estáticos con CORS
app.use("/uploads", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", "GET, OPTIONS")
  res.header("Cache-Control", "public, max-age=31536000") // Cache por 1 año
  next()
}, express.static(path.join(__dirname, "../uploads")))

// ==================== RUTAS ====================
// Ruta de prueba
app.get("/", (req, res) => {
  res.json({ message: "🥖 API Panadería funcionando" })
})

// Rutas de autenticación
app.use("/api/auth", authRoutes)

// Rutas de categorías
app.use("/api/categories", categoryRoutes)

// Rutas de productos
app.use("/api/products", productRoutes)

// Rutas de upload
app.use("/api/upload", uploadRoutes)

// ==================== MANEJO DE ERRORES ====================
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: "Error interno del servidor" })
})

// ==================== INICIAR SERVIDOR ====================
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`)
})
