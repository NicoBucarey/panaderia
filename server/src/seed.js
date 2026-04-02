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
      { name: "tortas" },
      { name: "especialidades" },
      { name: "salado" }
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
        unidadVenta: "unidad",
        image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec",
        available: true,
        featured: true
      },
      {
        name: "Medialunas de Manteca",
        description: "Suaves y doradas, ideales para el desayuno",
        price: 2500,
        categoryId: createdCategories.facturas,
        unidadVenta: "docena",
        image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec",
        available: true,
        featured: true
      },
      {
        name: "Medialunas de Grasa",
        description: "Tradicionales y sabrosas",
        price: 2300,
        categoryId: createdCategories.facturas,
        unidadVenta: "docena",
        image: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b",
        available: true,
        featured: false
      },
      {
        name: "Donas Glaseadas",
        description: "Esponjosas con cobertura dulce",
        price: 1800,
        categoryId: createdCategories.pasteleria,
        unidadVenta: "docena",
        image: "https://images.unsplash.com/photo-1551024506-0bccd828d307",
        available: true,
        featured: false
      },
      {
        name: "Torta de Chocolate",
        description: "Húmeda y rellena con ganache",
        price: 8500,
        categoryId: createdCategories.tortas,
        unidadVenta: "unidad",
        image: "https://images.unsplash.com/photo-1605478371310-a9f1e96b4ff4",
        available: true,
        featured: true
      },
      {
        name: "Tarta de Frutilla",
        description: "Base crocante con crema pastelera",
        price: 7800,
        categoryId: createdCategories.tortas,
        unidadVenta: "unidad",
        image: "https://images.unsplash.com/photo-1464306076886-debede1f1575",
        available: true,
        featured: false
      },
      {
        name: "Budín Marmolado",
        description: "Vainilla y chocolate combinados",
        price: 4200,
        categoryId: createdCategories.pasteleria,
        unidadVenta: "unidad",
        image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c",
        available: true,
        featured: false
      },
      {
        name: "Pan Integral",
        description: "Elaborado con harina integral",
        price: 3200,
        categoryId: createdCategories.panificados,
        unidadVenta: "kg",
        image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73",
        available: true,
        featured: false
      },
      {
        name: "Chipa",
        description: "Clásico sabor a queso",
        price: 300,
        categoryId: createdCategories.panificados,
        unidadVenta: "unidad",
        image: "https://images.unsplash.com/photo-1599785209798-4e5f5f3b4e7f",
        available: true,
        featured: false
      },
      {
        name: "Masas Finas",
        description: "Surtido artesanal",
        price: 5200,
        categoryId: createdCategories.pasteleria,
        unidadVenta: "docena",
        image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c",
        available: true,
        featured: false
      },
      {
        name: "Alfajores Artesanales",
        description: "Rellenos con dulce de leche",
        price: 3000,
        categoryId: createdCategories.pasteleria,
        unidadVenta: "docena",
        image: "https://images.unsplash.com/photo-1612197527354-9b52e7f2b2d2",
        available: true,
        featured: false
      },
      {
        name: "Rosca de Pascua",
        description: "Tradicional con crema pastelera",
        price: 9500,
        categoryId: createdCategories.especialidades,
        unidadVenta: "unidad",
        image: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3",
        available: true,
        featured: false
      },
      {
        name: "Pan de Campo",
        description: "Corteza gruesa y miga aireada",
        price: 2800,
        categoryId: createdCategories.panificados,
        unidadVenta: "kg",
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff",
        available: true,
        featured: false
      },
      {
        name: "Tarta de Jamón y Queso",
        description: "Ideal para almuerzos rápidos",
        price: 6500,
        categoryId: createdCategories.salado,
        unidadVenta: "unidad",
        image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d",
        available: true,
        featured: false
      },
      {
        name: "Empanadas",
        description: "Carne, pollo o jamón y queso",
        price: 4200,
        categoryId: createdCategories.salado,
        unidadVenta: "docena",
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950",
        available: true,
        featured: false
      }
    ]

    // Eliminar productos existentes y crear nuevos
    await prisma.product.deleteMany({})
    
    for (const prod of products) {
      await prisma.product.create({
        data: prod
      })
      console.log(`✅ Producto: ${prod.name}`)
    }

    console.log("\n✨ Seed completado exitosamente!")
    console.log("\n📊 Datos iniciales:")
    console.log(`- 1 Admin: admin@panaderia.com (password: admin123)`)
    console.log(`- 6 Categorías`)
    console.log(`- 15 Productos (con unidadVenta)`)


  } catch (error) {
    console.error("❌ Error en seed:", error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

seed()
