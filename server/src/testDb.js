import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    // Test: Contar registros en cada tabla
    const userCount = await prisma.user.count();
    const categoryCount = await prisma.category.count();
    const productCount = await prisma.product.count();

    console.log("✅ Conexión exitosa a PostgreSQL");
    console.log(`📊 Users: ${userCount}`);
    console.log(`📊 Categories: ${categoryCount}`);
    console.log(`📊 Products: ${productCount}`);
    console.log("\n✅ Base de datos lista para usar");
  } catch (error) {
    console.error("❌ Error al conectar a la BD:", error.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
