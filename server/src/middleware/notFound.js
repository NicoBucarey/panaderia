export function notFoundHandler(req, res) {
  const message = `Ruta no encontrada: ${req.originalUrl}`;
  res.status(404).json({ error: message, message });
}
