import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { env } from "./src/config/env.js";

const prisma = new PrismaClient();

async function main() {
  if (!env.ADMIN_EMAIL || !env.ADMIN_PASSWORD) {
    throw new Error("ADMIN_EMAIL y ADMIN_PASSWORD son obligatorios");
  }

  const existing = await prisma.user.findUnique({
    where: { email: env.ADMIN_EMAIL },
  });

  if (existing) {
    console.log(`Administrador ya existe: ${env.ADMIN_EMAIL}`);
    return;
  }

  const passwordHash = await bcrypt.hash(env.ADMIN_PASSWORD, 12);

  const user = await prisma.user.create({
    data: {
      email: env.ADMIN_EMAIL,
      passwordHash,
    },
  });

  console.log(`Administrador creado con id ${user.id} y email ${user.email}`);
}

main()
  .catch((error) => {
    console.error("Error creando administrador:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
