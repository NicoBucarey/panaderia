import express from "express"
import cors from "cors"
import authRoutes from "./routes/auth.js"
import productRoutes from "./routes/products.js"
import categoryRoutes from "./routes/categories.js"

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

// ==================== MANEJO DE ERRORES ====================
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: "Error interno del servidor" })
})

// ==================== INICIAR SERVIDOR ====================
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`)
})
