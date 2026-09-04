export function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  console.error("Unhandled error:", err);

  let status = err.statusCode || 500;
  let message = err.message || "Error interno del servidor";

  if (err.code === "ERR_ERL_UNEXPECTED_X_FORWARDED_FOR") {
    status = 500;
    message = "Error de configuración del proxy";
  } else if (err.code === "LIMIT_FILE_SIZE") {
    status = 413;
    message = "La imagen no puede superar los 5 MB";
  } else if (err.code === "LIMIT_FILE_COUNT" || err.code === "LIMIT_UNEXPECTED_FILE") {
    status = 400;
    message = "Solo se permite una imagen por solicitud";
  } else if (err.code === "INVALID_FILE_TYPE") {
    status = 400;
    message = "Solo se permiten imágenes JPEG, PNG o WebP";
  }

  res.status(status).json({
    error: message,
    message,
    details: process.env.NODE_ENV === "development" ? err.details || undefined : undefined,
  });
}
