import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { validateCreateProduct, validateIdParam, validateUpdateProduct } from "../middleware/validate.js";
import {
  listProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = Router();

router.get("/", listProducts);
router.get("/:id", validateIdParam, getProductById);
router.post("/", requireAuth, validateCreateProduct, createProduct);
router.put("/:id", requireAuth, validateIdParam, validateUpdateProduct, updateProduct);
router.delete("/:id", requireAuth, validateIdParam, deleteProduct);

export default router;
