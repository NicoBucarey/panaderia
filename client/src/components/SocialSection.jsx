function SocialSection() {
  const socialLinks = [
    {
      name: "Instagram",
      icon: "📷",
      url: "https://instagram.com", // Cambiar con tu URL
      color: "text-pink-600 hover:text-pink-700"
    },
    {
      name: "TikTok",
      icon: "🎵",
      url: "https://tiktok.com", // Cambiar con tu URL
      color: "text-black hover:text-gray-700"
    },
    {
      name: "Facebook",
      icon: "f",
      url: "https://facebook.com", // Cambiar con tu URL
      color: "text-blue-600 hover:text-blue-700"
    }
  ]

  return (
    <section className="bg-gradient-to-r from-yellow-50 to-amber-50 py-12 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Síguenos en nuestras redes
        </h2>
        <p className="text-gray-600 mb-8">
          Entérate de las novedades y promociones especiales
        </p>

        <div className="flex justify-center gap-8">
          {socialLinks.map(social => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform transform hover:scale-110"
              title={social.name}
            >
              <div className={`${social.color} text-4xl font-bold transition-colors`}>
                {social.icon}
              </div>
              <p className="text-sm text-gray-600 mt-2">{social.name}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SocialSection
