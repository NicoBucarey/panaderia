import express from "express"
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from "../controllers/productController.js"
import { verifyToken } from "../middleware/auth.js"

const router = express.Router()

/**
 * Rutas de PRODUCTOS
 * 
 * Públicas (sin autenticación):
 * - GET /api/products → listar todos
 * - GET /api/products/:id → detalle
 * 
 * Privadas (solo admin):
 * - POST /api/products → crear
 * - PUT /api/products/:id → editar
 * - DELETE /api/products/:id → eliminar
 */

// PÚBLICAS - Sin necesidad de autenticación
router.get("/", getAllProducts)
router.get("/:id", getProductById)

// PRIVADAS - Requieren token JWT (middleware verifyToken)
router.post("/", verifyToken, createProduct)
router.put("/:id", verifyToken, updateProduct)
router.delete("/:id", verifyToken, deleteProduct)

export default router
