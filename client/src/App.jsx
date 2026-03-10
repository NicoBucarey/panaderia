import MainLayout from "./layouts/MainLayout"
import Home from "./pages/Home"
import AdminLogin from "./pages/AdminLogin"
import AdminDashboard from "./pages/AdminDashboard"
import { Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"


function App() {
  return (
   <AuthProvider>
     <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
     </MainLayout>
   </AuthProvider>
  )
}

export default App
