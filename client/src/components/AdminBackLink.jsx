import { FaArrowLeft } from "react-icons/fa6"

function AdminBackLink({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-amber-300 hover:bg-amber-50 hover:text-amber-700 hover:shadow-md"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors duration-200 group-hover:bg-amber-100 group-hover:text-amber-700">
        <FaArrowLeft className="text-xs" />
      </span>
      <span>Volver al panel</span>
    </button>
  )
}

export default AdminBackLink