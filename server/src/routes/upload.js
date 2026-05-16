import express from "express"
import upload from "../middleware/upload.js"
import { isCloudinaryEnabled, uploadBufferToCloudinary } from "../utils/cloudinary.js"

const router = express.Router()

/**
 * POST /api/upload
 * Subir una imagen
 */
router.post("/", upload.single("image"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No se subió ningún archivo" })
    }

    if (isCloudinaryEnabled) {
      uploadBufferToCloudinary(req.file.buffer, req.file.originalname)
        .then((result) => {
          res.json({
            success: true,
            filename: result.public_id,
            url: result.secure_url,
            message: "Imagen subida correctamente"
          })

          console.log("✅ Imagen subida a Cloudinary:", result.secure_url)
        })
        .catch((error) => {
          console.error("Error al subir imagen a Cloudinary:", error)
          res.status(500).json({ error: "Error al subir imagen" })
        })

      return
    }

    // Retornar solo la ruta relativa - el frontend resolverá la URL completa
    const imagePath = `/uploads/${req.file.filename}`

    res.json({
      success: true,
      filename: req.file.filename,
      url: imagePath,
      message: "Imagen subida correctamente"
    })

    console.log("✅ Imagen subida:", imagePath)
  } catch (error) {
    console.error("Error al subir imagen:", error)
    res.status(500).json({ error: error.message || "Error al subir imagen" })
  }
})

export default router
