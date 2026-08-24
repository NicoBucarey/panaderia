import express from "express"
import upload from "../middleware/upload.js"
import { verifyToken } from "../middleware/auth.js"
import { isCloudinaryEnabled, uploadBufferToCloudinary } from "../utils/cloudinary.js"

const router = express.Router()

/**
 * POST /api/upload
 * Subir una imagen
 */
router.post("/", verifyToken, upload.single("image"), async (req, res) => {
  try {
    if (!isCloudinaryEnabled) {
      return res.status(503).json({
        error: "Cloudinary no está configurado. Definí CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY y CLOUDINARY_API_SECRET."
      })
    }

    if (!req.file) {
      return res.status(400).json({ error: "No se subió ningún archivo" })
    }

    const result = await uploadBufferToCloudinary(req.file.buffer, req.file.originalname)

    res.status(201).json({
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
      filename: result.public_id,
      image: {
        url: result.secure_url,
        publicId: result.public_id,
      },
      message: "Imagen subida correctamente en Cloudinary"
    })

    console.log("✅ Imagen subida a Cloudinary:", result.secure_url)
  } catch (error) {
    console.error("Error al subir imagen:", error)
    res.status(500).json({ error: error.message || "Error al subir imagen" })
  }
})

export default router
