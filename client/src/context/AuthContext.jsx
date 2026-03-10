import { createContext, useState, useEffect } from "react"

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("adminToken")
    setIsAuthenticated(!!token)
    setLoading(false)
  }, [])

  const logout = () => {
    localStorage.removeItem("adminToken")
    setIsAuthenticated(false)
  }

  const login = () => {
    setIsAuthenticated(true)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, logout, login, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
