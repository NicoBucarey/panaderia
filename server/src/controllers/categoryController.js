import prisma from "../config/prisma.js";

export async function listCategories(req, res, next) {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
      include: {
        _count: {
          select: { products: true },
        },
      },
    });

    return res.json(categories);
  } catch (error) {
    next(error);
  }
}

export async function getCategoryById(req, res, next) {
  try {
    const category = await prisma.category.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!category) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }

    return res.json(category);
  } catch (error) {
    next(error);
  }
}

export async function createCategory(req, res, next) {
  try {
    const { name } = req.body;

    if (!name || String(name).trim() === "") {
      return res.status(400).json({ message: "El nombre es obligatorio" });
    }

    const category = await prisma.category.create({
      data: {
        name: String(name).trim(),
      },
    });

    return res.status(201).json(category);
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(409).json({ message: "Ya existe una categoría con ese nombre" });
    }

    next(error);
  }
}

export async function updateCategory(req, res, next) {
  try {
    const { name } = req.body;

    if (!name || String(name).trim() === "") {
      return res.status(400).json({ message: "El nombre es obligatorio" });
    }

    const category = await prisma.category.update({
      where: { id: Number(req.params.id) },
      data: { name: String(name).trim() },
    });

    return res.json(category);
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }

    if (error.code === "P2002") {
      return res.status(409).json({ message: "Ya existe una categoría con ese nombre" });
    }

    next(error);
  }
}

export async function deleteCategory(req, res, next) {
  try {
    const categoryId = Number(req.params.id);

    const productsCount = await prisma.product.count({ where: { categoryId } });
    if (productsCount > 0) {
      return res.status(409).json({
        message: "No se puede eliminar una categoría con productos asociados. Reasigna o elimina los productos primero.",
      });
    }

    await prisma.category.delete({ where: { id: categoryId } });
    return res.status(204).send();
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }

    next(error);
  }
}
