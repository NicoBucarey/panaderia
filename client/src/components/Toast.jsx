import { useEffect } from "react"

function Toast({ message, type = "success", isVisible, onClose }) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 3000)
      return () => clearTimeout(timer)
    }
  }, [isVisible, onClose])

  if (!isVisible) return null

  const bgColor = type === "success" ? "bg-green-500" : "bg-red-500"
  const icon = type === "success" ? "✓" : "✕"

  return (
    <div className={`fixed top-4 left-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 z-50 animate-fade-in`}>
      <span className="text-xl font-bold">{icon}</span>
      <span className="font-medium">{message}</span>
    </div>
  )
}

export default Toast
