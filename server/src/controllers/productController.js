import prisma from "../config/prisma.js";
import { cloudinaryService } from "../services/cloudinaryService.js";
import { parseDecimal } from "../utils/http.js";

function sanitizeProductPayload(payload) {
  const price = parseDecimal(payload.price);

  if (price === null || price < 0) {
    throw Object.assign(new Error("El precio debe ser un número válido y no negativo"), { statusCode: 400 });
  }

  return {
    name: String(payload.name ?? "").trim(),
    description: String(payload.description ?? "").trim(),
    price,
    categoryId: Number(payload.categoryId),
    varieties: Array.isArray(payload.varieties) ? payload.varieties.map((item) => String(item).trim()).filter(Boolean) : [],
    unidadVenta: String(payload.unidadVenta ?? "unidad").trim() || "unidad",
    available: payload.available !== undefined ? Boolean(payload.available) : true,
    imageUrl: payload.imageUrl ?? null,
    imagePublicId: payload.imagePublicId ?? null,
  };
}

export async function listProducts(req, res, next) {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
      include: { category: true },
    });

    return res.json(products.map((product) => ({
      ...product,
      price: Number(product.price),
    })));
  } catch (error) {
    next(error);
  }
}

export async function getProductById(req, res, next) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: Number(req.params.id) },
      include: { category: true },
    });

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    return res.json({
      ...product,
      price: Number(product.price),
    });
  } catch (error) {
    next(error);
  }
}

export async function createProduct(req, res, next) {
  try {
    const payload = sanitizeProductPayload(req.body);

    if (!payload.name || !payload.description || !payload.categoryId) {
      return res.status(400).json({ message: "Nombre, descripción, categoría y precio son obligatorios" });
    }

    const category = await prisma.category.findUnique({ where: { id: payload.categoryId } });
    if (!category) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }

    const product = await prisma.product.create({
      data: payload,
      include: { category: true },
    });

    return res.status(201).json({
      ...product,
      price: Number(product.price),
    });
  } catch (error) {
    next(error);
  }
}

export async function updateProduct(req, res, next) {
  try {
    const productId = Number(req.params.id);
    const existing = await prisma.product.findUnique({ where: { id: productId } });

    if (!existing) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    const nextPayload = sanitizeProductPayload({
      ...existing,
      ...req.body,
    });

    if (!nextPayload.name || !nextPayload.description || !nextPayload.categoryId) {
      return res.status(400).json({ message: "Nombre, descripción, categoría y precio son obligatorios" });
    }

    const category = await prisma.category.findUnique({ where: { id: nextPayload.categoryId } });
    if (!category) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }

    if (
      nextPayload.imagePublicId &&
      existing.imagePublicId &&
      existing.imagePublicId !== nextPayload.imagePublicId
    ) {
      try {
        await cloudinaryService.deleteByPublicId(existing.imagePublicId);
      } catch (error) {
        console.error("No se pudo reemplazar la imagen anterior:", error);
      }
    }

    if (!nextPayload.imagePublicId && existing.imagePublicId) {
      try {
        await cloudinaryService.deleteByPublicId(existing.imagePublicId);
      } catch (error) {
        console.error("No se pudo eliminar la imagen anterior:", error);
      }
      nextPayload.imageUrl = null;
      nextPayload.imagePublicId = null;
    }

    const updated = await prisma.product.update({
      where: { id: productId },
      data: nextPayload,
      include: { category: true },
    });

    return res.json({
      ...updated,
      price: Number(updated.price),
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteProduct(req, res, next) {
  try {
    const productId = Number(req.params.id);
    const product = await prisma.product.findUnique({ where: { id: productId } });

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    if (product.imagePublicId) {
      try {
        await cloudinaryService.deleteByPublicId(product.imagePublicId);
      } catch (error) {
        console.error("No se pudo eliminar la imagen de Cloudinary:", error);
      }
    }

    await prisma.product.delete({ where: { id: productId } });

    return res.status(204).send();
  } catch (error) {
    next(error);
  }
}
