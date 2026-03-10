import { getPrisma } from "../db.js"

/**
 * GET /api/products
 * Listar TODOS los productos disponibles (público)
 */
export const getAllProducts = async (req, res) => {
  try {
    const prisma = await getPrisma()
    const products = await prisma.product.findMany({
      include: { category: true }
    })
    
    // Convertir a formato esperado por el frontend
    const formatted = products.map(p => ({
      ...p,
      price: p.price // Ya está en la BD (en centavos si lo guardaste así)
    }))
    
    res.json(formatted)
  } catch (error) {
    console.error("Error al obtener productos:", error)
    res.status(500).json({ error: "Error interno del servidor" })
  }
}

/**
 * GET /api/products/:id
 * Obtener un producto específico por ID (público)
 */
export const getProductById = async (req, res) => {
  try {
    const prisma = await getPrisma()
    const { id } = req.params
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
      include: { category: true }
    })
    
    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" })
    }

    res.json(product)
  } catch (error) {
    console.error("Error al obtener producto:", error)
    res.status(500).json({ error: "Error interno del servidor" })
  }
}

/**
 * POST /api/products
 * Crear un nuevo producto (SOLO ADMIN)
 * Requiere token JWT válido
 */
export const createProduct = async (req, res) => {
  try {
    const prisma = await getPrisma()
    const { name, description, price, categoryId = 1, image, available = true, featured = false } = req.body
    
    if (!name || !description || price == null) {
      return res.status(400).json({ error: "Faltan campos requeridos" })
    }
    
    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price: parseInt(price),
        categoryId: parseInt(categoryId),
        image: image || "",
        available,
        featured
      },
      include: { category: true }
    })
    
    res.status(201).json(newProduct)
  } catch (error) {
    console.error("Error al crear producto:", error)
    res.status(500).json({ error: "Error interno del servidor" })
  }
}

/**
 * PUT /api/products/:id
 * Editar un producto existente (SOLO ADMIN)
 */
export const updateProduct = async (req, res) => {
  try {
    const prisma = await getPrisma()
    const { id } = req.params
    const { name, description, price, categoryId, image, available, featured } = req.body
    
    // Verificar que el producto existe
    const exists = await prisma.product.findUnique({
      where: { id: parseInt(id) }
    })
    
    if (!exists) {
      return res.status(404).json({ error: "Producto no encontrado" })
    }
    
    const data = {}
    if (name !== undefined) data.name = name
    if (description !== undefined) data.description = description
    if (price !== undefined) data.price = parseInt(price)
    if (categoryId !== undefined) data.categoryId = parseInt(categoryId)
    if (image !== undefined) data.image = image
    if (available !== undefined) data.available = available
    if (featured !== undefined) data.featured = featured
    
    const updated = await prisma.product.update({
      where: { id: parseInt(id) },
      data,
      include: { category: true }
    })
    
    res.json(updated)
  } catch (error) {
    console.error("Error al actualizar producto:", error)
    res.status(500).json({ error: "Error interno del servidor" })
  }
}

/**
 * DELETE /api/products/:id
 * Eliminar un producto (SOLO ADMIN)
 */
export const deleteProduct = async (req, res) => {
  try {
    const prisma = await getPrisma()
    const { id } = req.params
    
    const exists = await prisma.product.findUnique({
      where: { id: parseInt(id) }
    })
    
    if (!exists) {
      return res.status(404).json({ error: "Producto no encontrado" })
    }
    
    await prisma.product.delete({
      where: { id: parseInt(id) }
    })
    
    res.json({ message: "Producto eliminado" })
  } catch (error) {
    console.error("Error al eliminar producto:", error)
    res.status(500).json({ error: "Error interno del servidor" })
  }
}
