import bcrypt from "bcryptjs"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function seed() {
  try {
    console.log("🌱 Iniciando seed de datos...")

    // ========== CREAR ADMIN ==========
    console.log("\n📝 Creando usuario admin...")
    
    const hashedPassword = await bcrypt.hash("admin123", 10)
    
    const admin = await prisma.user.upsert({
      where: { email: "admin@panaderia.com" },
      update: {},
      create: {
        email: "admin@panaderia.com",
        password: hashedPassword
      }
    })
    
    console.log(`✅ Admin creado: ${admin.email}`)

    // ========== CREAR CATEGORÍAS ==========
    console.log("\n📂 Creando categorías...")
    
    const categories = [
      { name: "panificados" },
      { name: "facturas" },
      { name: "pasteleria" },
      { name: "tortas" }
    ]

    const createdCategories = {}
    
    for (const cat of categories) {
      const category = await prisma.category.upsert({
        where: { name: cat.name },
        update: {},
        create: cat
      })
      createdCategories[cat.name] = category.id
      console.log(`✅ Categoría: ${cat.name}`)
    }

    // ========== CREAR PRODUCTOS ==========
    console.log("\n🥖 Creando productos...")

    const products = [
      {
        name: "Pan Francés",
        description: "Clásico pan crujiente recién horneado",
        price: 1200,
        categoryId: createdCategories.panificados,
        image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec",
        available: true,
        featured: true
      },
      {
        name: "Medialunas de Manteca",
        description: "Suaves y doradas, ideales para el desayuno",
        price: 2500,
        categoryId: createdCategories.facturas,
        image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec",
        available: true,
        featured: true
      },
      {
        name: "Medialunas de Grasa",
        description: "Tradicionales y sabrosas",
        price: 2300,
        categoryId: createdCategories.facturas,
        image: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b",
        available: true,
        featured: false
      },
      {
        name: "Donas Glaseadas",
        description: "Esponjosas con cobertura dulce",
        price: 1800,
        categoryId: createdCategories.pasteleria,
        image: "https://images.unsplash.com/photo-1551024506-0bccd828d307",
        available: true,
        featured: false
      },
      {
        name: "Torta de Chocolate",
        description: "Húmeda y rellena con ganache",
        price: 8500,
        categoryId: createdCategories.tortas,
        image: "https://images.unsplash.com/photo-1605478371310-a9f1e96b4ff4",
        available: true,
        featured: true
      },
      {
        name: "Tarta de Frutilla",
        description: "Base crocante con crema pastelera",
        price: 7800,
        categoryId: createdCategories.tortas,
        image: "https://images.unsplash.com/photo-1464306076886-debede1f1575",
        available: true,
        featured: false
      }
    ]

    for (const prod of products) {
      await prisma.product.upsert({
        where: { id: prod.name === "Pan Francés" ? 1 : undefined },
        update: {},
        create: prod
      })
      console.log(`✅ Producto: ${prod.name}`)
    }

    console.log("\n✨ Seed completado exitosamente!")
    console.log("\n📊 Datos iniciales:")
    console.log(`- 1 Admin: admin@panaderia.com (password: admin123)`)
    console.log(`- 4 Categorías`)
    console.log(`- 6 Productos`)

  } catch (error) {
    console.error("❌ Error en seed:", error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

seed()
