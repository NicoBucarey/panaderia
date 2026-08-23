import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import AdminCard from "../components/AdminCard"

function AdminDashboard() {
  const navigate = useNavigate()
  const { logout } = useContext(AuthContext)

  const handleLogout = () => {
    logout()
    navigate("/admin/login")
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Panel de Administración
            </h1>
            <p className="text-gray-600">Bienvenido a tu dashboard</p>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AdminCard
            icon="➕"
            title="Agregar Producto"
            description="Crea un nuevo producto y agrega detalles, precio e imagen"
            link="/admin/productos?mode=create"
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
            link="/admin/categorias?mode=create"
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
      </div>
    </div>
  )
}

export default AdminDashboard
