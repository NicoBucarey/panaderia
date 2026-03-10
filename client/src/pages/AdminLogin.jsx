import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { loginAdmin } from "../services/api"
import { AuthContext } from "../context/AuthContext"

function AdminLogin () {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const { login } = useContext(AuthContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    try {
      const data = await loginAdmin(email, password)
      // loginAdmin already stores token
      login()
      console.log("Login successful", data)
      navigate("/admin") // redirect to admin dashboard placeholder
    } catch (err) {
      setError(err.message || "Error desconocido")
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 pt-8">
      <h1 className="text-2xl font-bold mb-4">Panel Administrador</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-500">{error}</p>}
        <div>
          <label htmlFor="email" className="block font-medium">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border rounded px-2 py-1"
          />
        </div>
        <div>
          <label htmlFor="password" className="block font-medium">
            Contraseña:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border rounded px-2 py-1"
          />
        </div>
        <button
          type="submit"
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Iniciar sesión
        </button>
      </form>
    </div>
  )
}
export default AdminLogin