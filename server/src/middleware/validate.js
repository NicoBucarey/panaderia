export function validateBody(schema) {
  if (!schema) {
    return (_req, _res, next) => next();
  }

  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const details = result.error.issues.map((issue) => ({
        field: issue.path.join(".") || "body",
        message: issue.message,
      }));

      return res.status(400).json({ message: "Datos inválidos", details });
    }

    req.body = result.data;
    next();
  };
}

export function validateCreateCategory(req, res, next) {
  const name = String(req.body?.name ?? "").trim();

  if (!name) {
    return res.status(400).json({ message: "El nombre de la categoría es obligatorio" });
  }

  req.body = { name };
  next();
}

export function validateUpdateCategory(req, res, next) {
  const name = String(req.body?.name ?? "").trim();

  if (!name) {
    return res.status(400).json({ message: "El nombre de la categoría es obligatorio" });
  }

  req.body = { name };
  next();
}

function normalizePrice(value) {
  if (value === undefined || value === null || value === "") {
    return null;
  }

  const numeric = Number(value);
  return Number.isFinite(numeric) && numeric >= 0 ? numeric : null;
}

export function validateCreateProduct(req, res, next) {
  const { name, description, categoryId, price, varieties, unidadVenta, available, imageUrl, imagePublicId } = req.body ?? {};
  const normalizedPrice = normalizePrice(price);

  if (!String(name ?? "").trim() || !String(description ?? "").trim()) {
    return res.status(400).json({ message: "Nombre y descripción son obligatorios" });
  }

  if (categoryId === undefined || categoryId === null || Number(categoryId) <= 0) {
    return res.status(400).json({ message: "La categoría es obligatoria" });
  }

  if (normalizedPrice === null) {
    return res.status(400).json({ message: "El precio debe ser un número válido y no negativo" });
  }

  req.body = {
    name: String(name).trim(),
    description: String(description).trim(),
    categoryId: Number(categoryId),
    price: normalizedPrice,
    varieties: Array.isArray(varieties) ? varieties.map((item) => String(item).trim()).filter(Boolean) : [],
    unidadVenta: String(unidadVenta ?? "unidad").trim() || "unidad",
    available: available !== undefined ? Boolean(available) : true,
    imageUrl: imageUrl ?? null,
    imagePublicId: imagePublicId ?? null,
  };

  next();
}

export function validateUpdateProduct(req, res, next) {
  const payload = req.body ?? {};

  if (payload.name !== undefined && !String(payload.name).trim()) {
    return res.status(400).json({ message: "El nombre no puede quedar vacío" });
  }

  if (payload.description !== undefined && !String(payload.description).trim()) {
    return res.status(400).json({ message: "La descripción no puede quedar vacía" });
  }

  if (payload.categoryId !== undefined && (Number(payload.categoryId) <= 0 || !Number.isFinite(Number(payload.categoryId)))) {
    return res.status(400).json({ message: "La categoría es inválida" });
  }

  if (payload.price !== undefined) {
    const normalizedPrice = normalizePrice(payload.price);
    if (normalizedPrice === null) {
      return res.status(400).json({ message: "El precio debe ser un número válido y no negativo" });
    }
    payload.price = normalizedPrice;
  }

  if (payload.varieties !== undefined && !Array.isArray(payload.varieties)) {
    return res.status(400).json({ message: "Las variedades deben enviarse como un arreglo" });
  }

  if (payload.varieties) {
    payload.varieties = payload.varieties.map((item) => String(item).trim()).filter(Boolean);
  }

  if (payload.unidadVenta !== undefined) {
    payload.unidadVenta = String(payload.unidadVenta).trim() || "unidad";
  }

  req.body = payload;
  next();
}

export function validateIdParam(req, res, next) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ message: "ID inválido" });
  }

  req.params.id = String(id);
  next();
}
