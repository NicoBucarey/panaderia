import { Link } from "react-router-dom"

function AdminCard({ icon, title, description, link, color = "blue" }) {
  const colorClasses = {
    blue: "border-blue-500 hover:bg-blue-200 hover:border-blue-700",
    green: "border-green-500 hover:bg-green-200 hover:border-green-700",
    purple: "border-purple-500 hover:bg-purple-200 hover:border-purple-700",
    orange: "border-orange-500 hover:bg-orange-200 hover:border-orange-700",
  }

  return (
    <Link
      to={link}
      className={`border-l-4 ${colorClasses[color]} bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:scale-105 hover:-translate-y-1 cursor-pointer`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="text-3xl mb-2">{icon}</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
          <p className="text-gray-600 text-sm mb-4">{description}</p>
        </div>
      </div>
    </Link>
  )
}

export default AdminCard
