import React from "react"

function Modal({ isOpen, title, message, type = "info", onConfirm, onCancel, confirmText = "Confirmar", cancelText = "Cancelar" }) {
  if (!isOpen) return null

  const bgColor = {
    success: "bg-green-50 border-green-200",
    error: "bg-red-50 border-red-200",
    warning: "bg-yellow-50 border-yellow-200",
    info: "bg-blue-50 border-blue-200"
  }

  const iconColor = {
    success: "text-green-600",
    error: "text-red-600",
    warning: "text-yellow-600",
    info: "text-blue-600"
  }

  const buttonColor = {
    success: "bg-green-500 hover:bg-green-600",
    error: "bg-red-500 hover:bg-red-600",
    warning: "bg-yellow-500 hover:bg-yellow-600",
    info: "bg-blue-500 hover:bg-blue-600"
  }

  const icons = {
    success: "✓",
    error: "✕",
    warning: "⚠",
    info: "ℹ"
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`${bgColor[type]} border-2 rounded-lg shadow-2xl p-8 max-w-md w-full mx-4`}>
        {/* Header con icono */}
        <div className="flex items-center gap-3 mb-4">
          <div className={`${iconColor[type]} text-3xl font-bold`}>
            {icons[type]}
          </div>
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        </div>

        {/* Mensaje */}
        <p className="text-gray-700 mb-6 text-base">
          {message}
        </p>

        {/* Botones */}
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg font-medium bg-gray-300 hover:bg-gray-400 text-gray-800 transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`${buttonColor[type]} text-white px-6 py-2 rounded-lg font-medium transition-colors`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal
