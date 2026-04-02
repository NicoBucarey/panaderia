/**
 * API Service - Comunicación con el Backend
 * 
 * Este archivo centraliza todas las solicitudes HTTP hacia el servidor
 * en http://localhost:5000 (desarrollo) o la URL de producción
 */

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000"

/**
 * PRODUCTOS - Rutas públicas (sin autenticación)
 */

/**
 * Obtener todos los productos disponibles
 * GET /api/products
 */
export const fetchProducts = async () => {
  try {
    const response = await fetch(`${API_URL}/api/products`)
    
    if (!response.ok) {
      throw new Error(`Error ${response.status}: No se pudieron obtener los productos`)
    }
    
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error en fetchProducts:", error)
    throw error
  }
}

/**
 * Obtener un producto específico por ID
 * GET /api/products/:id
 */
export const fetchProductById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/api/products/${id}`)
    
    if (!response.ok) {
      throw new Error(`Error ${response.status}: Producto no encontrado`)
    }
    
    const data = await response.json()
    return data
  } catch (error) {
    console.error(`Error en fetchProductById(${id}):`, error)
    throw error
  }
}

/**
 * AUTENTICACIÓN
 */

/**
 * Login del administrador
 * POST /api/auth/login
 * @param {string} email - Email del admin
 * @param {string} password - Contraseña del admin
 * @returns {Object} { token, user }
 */
export const loginAdmin = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    })
    
    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.error || "Error en login")
    }
    
    // Guardar token en localStorage para futuras peticiones autenticadas
    if (data.token) {
      localStorage.setItem("authToken", data.token)
    }
    
    return data
  } catch (error) {
    console.error("Error en loginAdmin:", error)
    throw error
  }
}

/**
 * Logout - limpiar token del localStorage
 */
export const logoutAdmin = () => {
  localStorage.removeItem("authToken")
}

/**
 * PRODUCTOS - Rutas privadas (requieren autenticación)
 * Todas estas requieren el token JWT
 */

/**
 * Crear un nuevo producto
 * POST /api/products
 */
export const createProduct = async (productData) => {
  try {
    const token = localStorage.getItem("authToken")
    
    if (!token) {
      throw new Error("No hay sesión activa")
    }
    
    const response = await fetch(`${API_URL}/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(productData)
    })
    
    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.error || "Error al crear producto")
    }
    
    return data
  } catch (error) {
    console.error("Error en createProduct:", error)
    throw error
  }
}

/**
 * Actualizar un producto existente
 * PUT /api/products/:id
 */
export const updateProduct = async (id, productData) => {
  try {
    const token = localStorage.getItem("authToken")
    
    if (!token) {
      throw new Error("No hay sesión activa")
    }
    
    const response = await fetch(`${API_URL}/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(productData)
    })
    
    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.error || "Error al actualizar producto")
    }
    
    return data
  } catch (error) {
    console.error(`Error en updateProduct(${id}):`, error)
    throw error
  }
}

/**
 * Eliminar un producto
 * DELETE /api/products/:id
 */
export const deleteProduct = async (id) => {
  try {
    const token = localStorage.getItem("authToken")
    
    if (!token) {
      throw new Error("No hay sesión activa")
    }
    
    const response = await fetch(`${API_URL}/api/products/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    
    if (!response.ok) {
      const data = await response.json()
      throw new Error(data.error || "Error al eliminar producto")
    }
    
    return { success: true }
  } catch (error) {
    console.error(`Error en deleteProduct(${id}):`, error)
    throw error
  }
}

/**
 * Obtener el token actual del localStorage
 */
export const getAuthToken = () => {
  return localStorage.getItem("authToken")
}

/**
 * Verificar si hay sesión activa
 */
export const isAuthenticated = () => {
  return !!localStorage.getItem("authToken")
}

/**
 * CATEGORÍAS - Rutas públicas
 */

/**
 * Obtener todas las categorías
 * GET /api/categories
 */
export const fetchCategories = async () => {
  try {
    const response = await fetch(`${API_URL}/api/categories`)
    
    if (!response.ok) {
      throw new Error(`Error ${response.status}: No se pudieron obtener las categorías`)
    }
    
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error en fetchCategories:", error)
    throw error
  }
}

/**
 * CATEGORÍAS - Rutas privadas (requieren autenticación)
 */

/**
 * Crear una nueva categoría
 * POST /api/categories
 */
export const createCategory = async (name) => {
  try {
    const token = localStorage.getItem("authToken")
    
    if (!token) {
      throw new Error("No hay sesión activa")
    }
    
    const response = await fetch(`${API_URL}/api/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ name })
    })
    
    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.error || "Error al crear categoría")
    }
    
    return data
  } catch (error) {
    console.error("Error en createCategory:", error)
    throw error
  }
}

/**
 * Actualizar una categoría
 * PUT /api/categories/:id
 */
export const updateCategory = async (id, name) => {
  try {
    const token = localStorage.getItem("authToken")
    
    if (!token) {
      throw new Error("No hay sesión activa")
    }
    
    const response = await fetch(`${API_URL}/api/categories/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ name })
    })
    
    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.error || "Error al actualizar categoría")
    }
    
    return data
  } catch (error) {
    console.error(`Error en updateCategory(${id}):`, error)
    throw error
  }
}

/**
 * Eliminar una categoría
 * DELETE /api/categories/:id
 */
export const deleteCategory = async (id) => {
  try {
    const token = localStorage.getItem("authToken")
    
    if (!token) {
      throw new Error("No hay sesión activa")
    }
    
    const response = await fetch(`${API_URL}/api/categories/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    
    if (!response.ok) {
      const data = await response.json()
      throw new Error(data.error || "Error al eliminar categoría")
    }
    
    return { success: true }
  } catch (error) {
    console.error(`Error en deleteCategory(${id}):`, error)
    throw error
  }
}

/**
 * UPLOAD - Subir imágenes
 */

/**
 * Subir una imagen
 * POST /api/upload
 * @param {File} file - Archivo de imagen
 * @returns {Object} { success, url, filename }
 */
export const uploadImage = async (file) => {
  try {
    const formData = new FormData()
    formData.append("image", file)

    const response = await fetch(`${API_URL}/api/upload`, {
      method: "POST",
      body: formData
      // NO incluir Content-Type: application/json porque es multipart/form-data
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || "Error al subir imagen")
    }

    return data
  } catch (error) {
    console.error("Error en uploadImage:", error)
    throw error
  }
}
