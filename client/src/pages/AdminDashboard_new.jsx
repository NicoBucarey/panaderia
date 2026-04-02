import { useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import AdminCard from "../components/AdminCard"

function AdminDashboard() {
  const navigate = useNavigate()
  const { logout } = useContext(AuthContext)

  useEffect(() => {
    const token = localStorage.getItem("authToken")
    if (!token) {
      navigate("/admin/login")
    }
  }, [navigate])

  const handleLogout = () => {
    logout()
    navigate("/admin/login")
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Panel de Administración
            </h1>
            <p className="text-gray-600">Bienvenido a tu dashboard</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Cerrar sesión
          </button>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AdminCard
            icon="➕"
            title="Agregar Producto"
            description="Crea un nuevo producto y agrega detalles, precio e imagen"
            link="/admin/productos?action=create"
            color="green"
          />
          <AdminCard
            icon="📦"
            title="Ver Productos"
            description="Visualiza, edita o elimina los productos existentes"
            link="/admin/productos"
            color="blue"
          />
          <AdminCard
            icon="🏷️"
            title="Agregar Categoría"
            description="Crea nuevas categorías para organizar tus productos"
            link="/admin/categorias?action=create"
            color="purple"
          />
          <AdminCard
            icon="📂"
            title="Ver Categorías"
            description="Gestiona todas las categorías disponibles"
            link="/admin/categorias"
            color="orange"
          />
        </div>

        {/* Stats Section (opcional) */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-gray-600 text-sm mb-2">Total Productos</p>
            <p className="text-3xl font-bold text-blue-600">--</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-gray-600 text-sm mb-2">Total Categorías</p>
            <p className="text-3xl font-bold text-purple-600">--</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-gray-600 text-sm mb-2">Último acceso</p>
            <p className="text-3xl font-bold text-green-600">Hoy</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
