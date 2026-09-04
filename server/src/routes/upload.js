import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { uploadImage } from "../middleware/upload.js";
import { cloudinaryService } from "../services/cloudinaryService.js";

const router = Router();

router.post("/", requireAuth, uploadImage.single("image"), async (req, res, next) => {
  try {
    if (!req.file) {
      const message = "Se requiere una imagen";
      return res.status(400).json({ error: message, message });
    }

    if (!cloudinaryService.isConfigured) {
      const message = "Cloudinary no está configurado. Complete CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY y CLOUDINARY_API_SECRET.";
      return res.status(500).json({ error: message, message });
    }

    const result = await cloudinaryService.uploadBuffer(req.file.buffer, req.file.originalname);

    return res.status(201).json({
      url: result.secure_url,
      publicId: result.public_id,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
