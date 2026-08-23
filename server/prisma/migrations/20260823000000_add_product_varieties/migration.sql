-- AlterTable
ALTER TABLE "Product" ADD COLUMN "varieties" TEXT[] DEFAULT ARRAY[]::TEXT[];
