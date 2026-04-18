import { getPrisma } from "../db.js"

/**
 * GET /api/categories
 * Obtener todas las categorías
 */
export const getAllCategories = async (req, res) => {
  try {
    const prisma = await getPrisma()
    const categories = await prisma.category.findMany()
    res.json(categories)
  } catch (error) {
    console.error("Error al obtener categorías:", error)
    res.status(500).json({ error: "Error interno del servidor" })
  }
}

/**
 * GET /api/categories/:id
 * Obtener una categoría específica
 */
export const getCategoryById = async (req, res) => {
  try {
    const prisma = await getPrisma()
    const { id } = req.params
    const category = await prisma.category.findUnique({
      where: { id: parseInt(id) },
      include: { products: true }
    })

    if (!category) {
      return res.status(404).json({ error: "Categoría no encontrada" })
    }

    res.json(category)
  } catch (error) {
    console.error("Error al obtener categoría:", error)
    res.status(500).json({ error: "Error interno del servidor" })
  }
}

/**
 * POST /api/categories
 * Crear una nueva categoría (SOLO ADMIN)
 */
export const createCategory = async (req, res) => {
  try {
    const prisma = await getPrisma()
    const normalizedName = req.body.name?.trim()

    if (!normalizedName) {
      return res.status(400).json({ error: "El nombre es requerido" })
    }

    const category = await prisma.category.create({
      data: { name: normalizedName }
    })

    res.status(201).json(category)
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(400).json({ error: "Esta categoría ya existe" })
    }
    console.error("Error al crear categoría:", error)
    res.status(500).json({ error: "Error interno del servidor" })
  }
}

/**
 * PUT /api/categories/:id
 * Actualizar una categoría (SOLO ADMIN)
 */
export const updateCategory = async (req, res) => {
  try {
    const prisma = await getPrisma()
    const { id } = req.params
    const normalizedName = req.body.name?.trim()

    if (!normalizedName) {
      return res.status(400).json({ error: "El nombre es requerido" })
    }

    const exists = await prisma.category.findUnique({
      where: { id: parseInt(id) }
    })

    if (!exists) {
      return res.status(404).json({ error: "Categoría no encontrada" })
    }

    const category = await prisma.category.update({
      where: { id: parseInt(id) },
      data: { name: normalizedName }
    })

    res.json(category)
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(400).json({ error: "Este nombre ya existe" })
    }
    console.error("Error al actualizar categoría:", error)
    res.status(500).json({ error: "Error interno del servidor" })
  }
}

/**
 * DELETE /api/categories/:id
 * Eliminar una categoría (SOLO ADMIN)
 */
export const deleteCategory = async (req, res) => {
  try {
    const prisma = await getPrisma()
    const { id } = req.params

    const exists = await prisma.category.findUnique({
      where: { id: parseInt(id) },
      include: { Product: true }
    })

    if (!exists) {
      return res.status(404).json({ error: "Categoría no encontrada" })
    }

    if (exists.Product.length > 0) {
      return res.status(400).json({ 
        error: `No se puede eliminar. Esta categoría tiene ${exists.Product.length} producto(s)` 
      })
    }

    await prisma.category.delete({
      where: { id: parseInt(id) }
    })

    res.json({ message: "Categoría eliminada" })
  } catch (error) {
    console.error("Error al eliminar categoría:", error)
    res.status(500).json({ error: "Error interno del servidor" })
  }
}
