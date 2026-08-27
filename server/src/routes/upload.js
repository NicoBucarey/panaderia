import { Router } from "express";
import multer from "multer";
import { requireAuth } from "../middleware/auth.js";
import { cloudinaryService } from "../services/cloudinaryService.js";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", requireAuth, upload.single("image"), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Se requiere una imagen" });
    }

    if (!cloudinaryService.isConfigured) {
      return res.status(500).json({
        message: "Cloudinary no está configurado. Complete CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY y CLOUDINARY_API_SECRET.",
      });
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
