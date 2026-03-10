import jwt from "jsonwebtoken"

/**
 * Middleware para verificar JWT
 * POR QUÉ: Protege rutas que solo el admin debe acceder
 * 
 * Flujo:
 * 1. Cliente envía request con header: Authorization: "Bearer token123"
 * 2. Este middleware extrae el token
 * 3. Verifica que el token sea válido con JWT_SECRET
 * 4. Si es válido, continúa. Si no, retorna 401
 */
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization

  // Extrae el token del header: "Bearer token123" → "token123"
  const token = authHeader && authHeader.split(" ")[1]

  if (!token) {
    return res.status(401).json({ error: "Token no proporcionado" })
  }

  try {
    // Verifica que el token sea válido
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
    // Guarda el userId en la request para usarlo después
    req.userId = decoded.userId
    
    next() // Continúa a la siguiente ruta
  } catch (error) {
    return res.status(403).json({ error: "Token inválido o expirado" })
  }
}
