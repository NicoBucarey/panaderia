// db.js - Lazy loading de Prisma Client
import "dotenv/config"
import { PrismaClient } from "@prisma/client"

let prisma = null

export async function getPrisma() {
  if (!prisma) {
    prisma = new PrismaClient()
  }
  return prisma
}


