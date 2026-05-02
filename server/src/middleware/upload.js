import multer from "multer"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Configurar almacenamiento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../uploads"))
  },
  filename: (req, file, cb) => {
    // Renombrar archivo: timestamp + nombre original
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
    cb(null, uniqueSuffix + path.extname(file.originalname))
  }
})

// Filtrar solo imágenes
const fileFilter = (req, file, cb) => {
  const allowedExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"])
  const allowedMimeTypes = new Set([
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/avif",
    "image/gif",
  ])

  const extension = path.extname(file.originalname).toLowerCase()
  const extname = allowedExtensions.has(extension)
  const mimetype = allowedMimeTypes.has(file.mimetype)

  if (mimetype && extname) {
    return cb(null, true)
  } else {
    cb(new Error("Formato no compatible. Usa JPG, JPEG, PNG, WebP, AVIF o GIF. Si la foto sale desde iPhone/Android puede estar en HEIC y necesitas convertirla antes de subirla."))
  }
}

// Configurar multer
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB máximo
})

export default upload
