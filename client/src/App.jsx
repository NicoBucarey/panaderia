import QRPage from "./pages/QRPage"
import MainLayout from "./layouts/MainLayout"
import Home from "./pages/Home"
import AdminLogin from "./pages/AdminLogin"
import AdminDashboard from "./pages/AdminDashboard"
import AdminProducts from "./pages/AdminProducts"
import AdminCategories from "./pages/AdminCategories"
import ProtectedRoute from "./components/ProtectedRoute"
import { Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import { CartProvider } from "./context/CartContext"


function App() {
  return (
   <AuthProvider>
     <CartProvider>
       <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/productos" element={<ProtectedRoute><AdminProducts /></ProtectedRoute>} />
            <Route path="/admin/categorias" element={<ProtectedRoute><AdminCategories /></ProtectedRoute>} />
            <Route path="/qr" element={<QRPage />} />
          </Routes>
       </MainLayout>
     </CartProvider>
   </AuthProvider>
  )
}

export default App
