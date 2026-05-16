import { useState, useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import Modal from "../components/Modal"
import Toast from "../components/Toast"
import {
  fetchProducts,
  fetchCategories,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
} from "../services/api"

function AdminProducts() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const isCreateMode = searchParams.get("mode") === "create"
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editingId, setEditingId] = useState(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [form, setForm] = useState({
    name: "",
    price: "",
    categoryId: "",
    image: "",
    unidadVenta: "unidad",
    varietiesText: "",
    available: true,
  })
  const [uploading, setUploading] = useState(false)
  const [modal, setModal] = useState({ isOpen: false, type: "info", title: "", message: "", action: null, targetId: null })
  const [toast, setToast] = useState({ isVisible: false, message: "", type: "success" })

  useEffect(() => {
    const token = localStorage.getItem("authToken")
    if (!token) {
      navigate("/admin/login")
    }
  }, [navigate])

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    setError(null)
    try {
      const [productsData, categoriesData] = await Promise.all([
        fetchProducts({ includeUnavailable: true }),
        fetchCategories(),
      ])
      setProducts(productsData)
      setCategories(categoriesData)
      if (categoriesData.length > 0 && !form.categoryId) {
        setForm((prev) => ({ ...prev, categoryId: String(categoriesData[0].id), unidadVenta: "unidad" }))
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      setUploading(true)
      setError(null)
      const result = await uploadImage(file)
      setForm((prev) => ({ ...prev, image: result.url }))
    } catch (err) {
      setError(err.message)
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setError(null)

    if (!form.image) {
      setError("Por favor sube una imagen")
      return
    }

    const isEditing = Boolean(editingId)
    setModal({
      isOpen: true,
      type: "info",
      title: isEditing ? "Editar Producto" : "Crear Producto",
      message: isEditing
        ? `¿Quieres guardar los cambios en "${form.name}"?`
        : `¿Quieres crear el producto "${form.name}"?`,
      action: "save",
      targetId: editingId,
    })
  }

  const handleConfirmAction = async () => {
    try {
      if (modal.action === "save") {
        const payload = {
          ...form,
          categoryId: parseInt(form.categoryId),
          price: parseFloat(form.price),
          unidadVenta: form.unidadVenta,
          varieties: form.varietiesText
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
          available: form.available,
        }

        if (modal.targetId) {
          await updateProduct(modal.targetId, payload)
          setToast({ isVisible: true, message: `"${form.name}" actualizado correctamente`, type: "success" })
        } else {
          await createProduct(payload)
          setToast({ isVisible: true, message: `"${form.name}" creado correctamente`, type: "success" })
        }

        setModal((prev) => ({ ...prev, isOpen: false }))
        setTimeout(() => {
          resetForm()
          loadData()
        }, 500)
      } else if (modal.action === "delete") {
        await deleteProduct(modal.targetId)
        setToast({ isVisible: true, message: "Producto eliminado correctamente", type: "success" })
        setModal((prev) => ({ ...prev, isOpen: false }))
        setTimeout(() => {
          loadData()
        }, 500)
      }
    } catch (err) {
      setError(err.message)
      setModal((prev) => ({ ...prev, isOpen: false }))
    }
  }

  const handleEdit = (product) => {
    setEditingId(product.id)
    setForm({
      name: product.name,
      price: String(product.price),
      categoryId: String(product.categoryId),
      image: product.image,
      unidadVenta: product.unidadVenta || "unidad",
      varietiesText: Array.isArray(product.varieties)
        ? product.varieties.join(", ")
        : "",
      available: product.available ?? true,
    })
    setIsEditModalOpen(true)
  }

  const handleDelete = (id, productName) => {
    setModal({
      isOpen: true,
      type: "error",
      title: "Eliminar Producto",
      message: `¿Estás seguro que quieres eliminar "${productName}"? Esta acción no se puede deshacer.`,
      action: "delete",
      targetId: id,
    })
  }

  const resetForm = () => {
    setForm({
      name: "",
      price: "",
      categoryId: categories.length > 0 ? String(categories[0].id) : "",
      image: "",
      unidadVenta: "unidad",
      varietiesText: "",
      available: true,
    })
    setEditingId(null)
    setIsEditModalOpen(false)
  }

  const renderImagePreview = () => {
    if (!form.image) return null

    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000"
    const imageUrl = form.image.startsWith("http") ? form.image : `${apiUrl}${form.image}`

    return (
      <div className="mt-3">
        <p className="text-sm text-gray-600 mb-2">Vista previa:</p>
        <img
          src={imageUrl}
          alt="preview"
          className="h-32 w-auto rounded-lg border border-gray-300"
          onError={() => console.error("Error cargando preview:", imageUrl)}
        />
      </div>
    )
  }

  const renderProductForm = (submitLabel, cancelAction) => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre
          </label>
          <input
            type="text"
            name="name"
            placeholder="Ej: Pan Francés"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Categoría
          </label>
          <select
            name="categoryId"
            value={form.categoryId}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Precio ($)
          </label>
          <input
            type="number"
            step="0.01"
            name="price"
            placeholder="Ej: 150.50"
            value={form.price}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Unidad de Venta
          </label>
          <select
            name="unidadVenta"
            value={form.unidadVenta}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="unidad">Unidad</option>
            <option value="docena">Docena</option>
            <option value="porcion">Porción</option>
            <option value="kg">kg</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Variedades (opcional)
        </label>
        <input
          type="text"
          name="varietiesText"
          placeholder="Ej: Membrillo, Batata"
          value={form.varietiesText}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
        <p className="mt-2 text-xs text-gray-500">
          Sepáralas con coma. Ejemplo: Queso, Integral, Sésamo, Clásico.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Estado de stock
        </label>
        <label className="inline-flex items-center gap-3 rounded-lg border border-gray-300 px-4 py-3 cursor-pointer select-none">
          <input
            type="checkbox"
            name="available"
            checked={form.available}
            onChange={handleChange}
            className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
          />
          <span className={`font-medium ${form.available ? "text-green-700" : "text-red-600"}`}>
            {form.available ? "En stock" : "Sin stock"}
          </span>
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Subir Imagen
        </label>
        <input
          type="file"
          accept=".jpg,.jpeg,.png,.webp,.avif,.gif,image/jpeg,image/png,image/webp,image/avif,image/gif"
          onChange={handleImageUpload}
          disabled={uploading}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
        <p className="mt-2 text-xs text-gray-500">
          Formatos soportados: JPG, JPEG, PNG, WebP, AVIF y GIF.
        </p>
        {uploading && <p className="text-sm text-gray-500 mt-2">Subiendo...</p>}
        {renderImagePreview()}
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
        >
          {submitLabel}
        </button>
        <button
          type="button"
          onClick={cancelAction}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg font-medium transition-colors"
        >
          Cancelar
        </button>
      </div>
    </form>
  )

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Toast
        isVisible={toast.isVisible}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast((prev) => ({ ...prev, isVisible: false }))}
      />

      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <button
              onClick={() => navigate("/admin")}
              className="text-blue-600 hover:underline text-sm mb-2"
            >
              ← Volver al panel
            </button>
            <h1 className="text-3xl font-bold text-gray-900">
              {isCreateMode ? "Crear Producto" : "Gestionar Productos"}
            </h1>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {isCreateMode && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Nuevo Producto</h2>
            {renderProductForm("Crear Producto", resetForm)}
          </div>
        )}

        {!isCreateMode && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                Productos ({products.length})
              </h2>
            </div>

            {loading ? (
              <div className="p-6 text-center text-gray-600">Cargando productos...</div>
            ) : products.length === 0 ? (
              <div className="p-6 text-center text-gray-600">
                No hay productos aún. ¡Crea uno para comenzar!
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Nombre</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Categoría</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Precio</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Unidad</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Variedades</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Stock</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {products.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium text-gray-900">{product.name}</td>
                        <td className="px-6 py-4 text-gray-600">{product.Category.name}</td>
                        <td className="px-6 py-4 font-semibold text-green-600">${product.price.toFixed(2)}</td>
                        <td className="px-6 py-4 text-gray-600">{product.unidadVenta || "unidad"}</td>
                        <td className="px-6 py-4 text-gray-600">
                          {Array.isArray(product.varieties) && product.varieties.length > 0
                            ? `${product.varieties.length} variedad${product.varieties.length !== 1 ? "es" : ""}`
                            : "-"}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${product.available ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                            {product.available ? "En stock" : "Sin stock"}
                          </span>
                        </td>
                        <td className="px-6 py-4 space-x-2">
                          <button
                            onClick={() => handleEdit(product)}
                            className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleDelete(product.id, product.name)}
                            className="text-red-600 hover:text-red-800 font-medium text-sm"
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      <Modal
        isOpen={modal.isOpen}
        title={modal.title}
        message={modal.message}
        type={modal.type}
        onConfirm={handleConfirmAction}
        onCancel={() => setModal((prev) => ({ ...prev, isOpen: false }))}
        confirmText={modal.action === "delete" ? "Eliminar" : "Guardar"}
        cancelText="Cancelar"
      />

      {isEditModalOpen && (
        <div className="fixed inset-0 z-[60] overflow-y-auto bg-black/50 px-4 py-6">
          <div className="mx-auto w-full max-w-4xl rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Editar Producto</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Actualiza la información del producto y guarda los cambios desde este modal.
                </p>
              </div>
              <button
                type="button"
                onClick={resetForm}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-xl text-gray-600 transition-colors hover:bg-gray-200"
                aria-label="Cerrar modal de edición"
              >
                ✕
              </button>
            </div>

            {renderProductForm("Guardar Cambios", resetForm)}
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminProducts
