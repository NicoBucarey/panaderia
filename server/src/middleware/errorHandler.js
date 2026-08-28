export function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  console.error("Unhandled error:", err);

  const status = err.statusCode || 500;
  const message = err.message || "Error interno del servidor";

  res.status(status).json({
    error: message,
    message,
    details: process.env.NODE_ENV === "development" ? err.details || undefined : undefined,
  });
}
