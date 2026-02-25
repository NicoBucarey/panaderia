function HoursSection() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-4xl mx-auto">

        <h2 className="text-3xl font-bold text-center mb-10">
          Horarios de Atención
        </h2>

        <div className="bg-gray-100 rounded-2xl shadow-md p-8">

          <div className="flex justify-between mb-4">
            <span className="font-medium">Lunes a Viernes</span>
            <span className="text-gray-600">08:00 - 21:00</span>
          </div>

          <div className="flex justify-between mb-4">
            <span className="font-medium">Sabado y Domingo</span>
            <span className="text-gray-600">08:00 - 15:00</span>
          </div>


        </div>

      </div>
    </section>
  )
}

export default HoursSection
