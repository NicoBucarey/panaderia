import rateLimit from "express-rate-limit";

function rateLimitError(_req, _res, next) {
  const error = new Error("Demasiadas solicitudes. Intente nuevamente más tarde.");
  error.statusCode = 429;
  next(error);
}

const commonOptions = {
  standardHeaders: "draft-7",
  legacyHeaders: false,
  handler: rateLimitError,
};

export const loginRateLimit = rateLimit({
  ...commonOptions,
  windowMs: 15 * 60 * 1000,
  limit: 10,
});

export const uploadRateLimit = rateLimit({
  ...commonOptions,
  windowMs: 15 * 60 * 1000,
  limit: 30,
});
