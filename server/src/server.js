import express from "express"
import cors from "cors"
import path from "path"
import { fileURLToPath } from "url"
import authRoutes from "./routes/auth.js"
import productRoutes from "./routes/products.js"
import categoryRoutes from "./routes/categories.js"
import uploadRoutes from "./routes/upload.js"
import runMigrations from "./migrate.js"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const app = express()
const PORT = process.env.PORT || 5000

// ==================== MIDDLEWARES ====================
// CORS: Permite solicitudes desde el frontend (Vite en localhost:5173)
const allowedOrigins = [
  "http://localhost:5173",      // Desarrollo local
  "http://localhost:3000",       // Desarrollo local alternativo
  "https://panaderia-blasco.vercel.app", // Producción
]

app.use(cors({
  origin: (origin, callback) => {
    // Permitir requests sin origin (móviles, servidores)
    if (!origin) return callback(null, true)
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true)
    } else if (process.env.NODE_ENV === "development") {
      // En desarrollo, permitir cualquier origen
      callback(null, true)
    } else {
      callback(new Error("CORS no permitido"))
    }
  },
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
(async () => {
  // En producción, ejecutar migraciones primero
  if (process.env.NODE_ENV === "production") {
    console.log("🚀 Ambiente de producción detectado");
    await runMigrations();
  }
  
  app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`)
  })
})()
