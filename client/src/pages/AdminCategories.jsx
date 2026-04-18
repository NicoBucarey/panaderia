import { useState, useEffect, useContext } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import Modal from "../components/Modal"
import Toast from "../components/Toast"
import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../services/api"

function AdminCategories() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const isCreateMode = searchParams.get("mode") === "create"
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(isCreateMode)
  const [editingId, setEditingId] = useState(null)
  const [formValue, setFormValue] = useState("")
  const [modal, setModal] = useState({ isOpen: false, type: "info", title: "", message: "", action: null, targetId: null, value: "" })
  const [toast, setToast] = useState({ isVisible: false, message: "", type: "success" })

  useEffect(() => {
    const token = localStorage.getItem("authToken")
    if (!token) {
      navigate("/admin/login")
    }
  }, [navigate])

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchCategories()
      setCategories(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError(null)
    const normalizedValue = formValue.trim()

    if (!normalizedValue) {
      setError("El nombre de la categoría es requerido")
      return
    }
    
    const isEditing = editingId ? true : false
    setModal({
      isOpen: true,
      type: "info",
      title: isEditing ? "Editar Categoría" : "Crear Categoría",
      message: isEditing 
        ? `¿Quieres guardar los cambios en "${normalizedValue}"?`
        : `¿Quieres crear la categoría "${normalizedValue}"?`,
      action: "save",
      targetId: editingId,
      value: normalizedValue
    })
  }

  const handleConfirmAction = async () => {
    try {
      if (modal.action === "save") {
        if (modal.targetId) {
          await updateCategory(modal.targetId, modal.value)
          setToast({ isVisible: true, message: `"${modal.value}" actualizada correctamente`, type: "success" })
        } else {
          await createCategory(modal.value)
          setToast({ isVisible: true, message: `"${modal.value}" creada correctamente`, type: "success" })
        }
        setModal({ ...modal, isOpen: false })
        setTimeout(() => {
          resetForm()
          loadCategories()
          setShowForm(false)
        }, 500)
      } else if (modal.action === "delete") {
        await deleteCategory(modal.targetId)
        setToast({ isVisible: true, message: "Categoría eliminada correctamente", type: "success" })
        setModal({ ...modal, isOpen: false })
        setTimeout(() => {
          loadCategories()
        }, 500)
      }
    } catch (err) {
      setError(err.message)
      setModal({ ...modal, isOpen: false })
    }
  }

  const handleEdit = (category) => {
    setEditingId(category.id)
    setFormValue(category.name)
    setShowForm(true)
  }

  const handleDelete = (id, categoryName) => {
    setModal({
      isOpen: true,
      type: "error",
      title: "Eliminar Categoría",
      message: `¿Estás seguro que quieres eliminar "${categoryName}"? Esta acción no se puede deshacer.`,
      action: "delete",
      targetId: id
    })
  }

  const resetForm = () => {
    setFormValue("")
    setEditingId(null)
    setShowForm(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Toast 
        isVisible={toast.isVisible} 
        message={toast.message} 
        type={toast.type}
        onClose={() => setToast({ ...toast, isVisible: false })}
      />
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <button
              onClick={() => navigate("/admin")}
              className="text-blue-600 hover:underline text-sm mb-2"
            >
              ← Volver al panel
            </button>
            <h1 className="text-3xl font-bold text-gray-900">
              {isCreateMode ? "Crear Categoría" : "Gestionar Categorías"}
            </h1>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Formulario - Solo en modo crear o si showForm es true */}
        {(isCreateMode || showForm) && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">
              {editingId ? "Editar Categoría" : "Nueva Categoría"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre de la Categoría
                </label>
                <input
                  type="text"
                  placeholder="Ej: Panificados"
                  value={formValue}
                  onChange={(e) => setFormValue(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  {editingId ? "Guardar Cambios" : "Crear Categoría"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Lista de Categorías - Solo mostrar en Vista Normal */}
        {!isCreateMode && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                Categorías ({categories.length})
              </h2>
            </div>

            {loading ? (
              <div className="p-6 text-center text-gray-600">Cargando categorías...</div>
            ) : categories.length === 0 ? (
              <div className="p-6 text-center text-gray-600">
                No hay categorías aún. ¡Crea una para comenzar!
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {categories.map(category => (
                  <div
                    key={category.id}
                    className="px-6 py-4 flex justify-between items-center hover:bg-gray-50 transition-colors"
                  >
                    <div>
                      <h3 className="font-semibold text-gray-900">{category.name}</h3>
                    </div>
                    <div className="space-x-2">
                      <button
                        onClick={() => handleEdit(category)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-medium transition-colors"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(category.id, category.name)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded font-medium transition-colors"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}
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
        onCancel={() => setModal({ ...modal, isOpen: false })}
        confirmText={modal.action === "delete" ? "Eliminar" : "Guardar"}
        cancelText="Cancelar"
      />    </div>
  )
}

export default AdminCategories
