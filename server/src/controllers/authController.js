import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { getPrisma } from "../db.js"

/**
 * POST /api/auth/login
 * Admin se autentica y obtiene token JWT
 */
export const login = async (req, res) => {
  try {
    const prisma = await getPrisma()
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: "Email y contraseña requeridos" })
    }

    // Buscar usuario en BD
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return res.status(401).json({ error: "Email o contraseña incorrectos" })
    }

    // Comparar contraseñas con bcrypt
    const passwordMatch = await bcrypt.compare(password, user.password)
    
    if (!passwordMatch) {
      return res.status(401).json({ error: "Email o contraseña incorrectos" })
    }

    // Generar JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    )

    res.json({
      message: "Login exitoso",
      token,
      user: { id: user.id, email: user.email }
    })
  } catch (error) {
    console.error("Error en login:", error)
    res.status(500).json({ error: "Error interno del servidor" })
  }
}

/**
 * POST /api/auth/register
 * Crear/actualizar usuario admin (desarrollo)
 * Para resetear contraseña, usa este endpoint
 */
export const register = async (req, res) => {
  try {
    const prisma = await getPrisma()
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: "Email y contraseña requeridos" })
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10)

    // Crear o actualizar usuario
    const user = await prisma.user.upsert({
      where: { email },
      update: { password: hashedPassword },
      create: { email, password: hashedPassword }
    })

    res.status(201).json({
      message: "Usuario registrado/actualizado correctamente",
      user: { id: user.id, email: user.email }
    })
  } catch (error) {
    console.error("Error en registro:", error)
    res.status(500).json({ error: "Error interno del servidor" })
  }
}
