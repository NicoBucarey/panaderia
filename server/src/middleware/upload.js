import multer from "multer";

const allowedMimeTypes = new Set(["image/jpeg", "image/png", "image/webp"]);

function imageFileFilter(_req, file, callback) {
  if (!allowedMimeTypes.has(file.mimetype)) {
    const error = new Error("Solo se permiten imágenes JPEG, PNG o WebP");
    error.code = "INVALID_FILE_TYPE";
    error.statusCode = 400;
    callback(error);
    return;
  }

  callback(null, true);
}

export const uploadImage = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 1,
  },
  fileFilter: imageFileFilter,
});
