import express from "express"
import { login, register } from "../controllers/authController.js"

const router = express.Router()

/**
 * POR QUÉ estas rutas:
 * - POST /api/auth/login: Admin se autentica y obtiene token
 * - POST /api/auth/register: Crear admin inicial o resetear contraseña en desarrollo.
 */

// Login: Admin envía email y password, recibe token JWT
router.post("/login", login)

// Register: habilitado solo en desarrollo.
router.post("/register", register)

export default router
