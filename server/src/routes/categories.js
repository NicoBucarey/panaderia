import express from "express"
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
} from "../controllers/categoryController.js"
import { verifyToken } from "../middleware/auth.js"

const router = express.Router()

/**
 * Rutas de CATEGORÍAS
 * 
 * Públicas (sin autenticación):
 * - GET /api/categories → listar todas
 * - GET /api/categories/:id → detalle
 * 
 * Privadas (solo admin):
 * - POST /api/categories → crear
 * - PUT /api/categories/:id → editar
 * - DELETE /api/categories/:id → eliminar
 */

// PÚBLICAS - Sin necesidad de autenticación
router.get("/", getAllCategories)
router.get("/:id", getCategoryById)

// PRIVADAS - Requieren token JWT (middleware verifyToken)
router.post("/", verifyToken, createCategory)
router.put("/:id", verifyToken, updateCategory)
router.delete("/:id", verifyToken, deleteCategory)

export default router
