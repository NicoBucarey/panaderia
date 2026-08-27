import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import {
  validateCreateCategory,
  validateUpdateCategory,
  validateIdParam,
} from "../middleware/validate.js";
import {
  listCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";

const router = Router();

router.get("/", listCategories);
router.get("/:id", validateIdParam, getCategoryById);
router.post("/", requireAuth, validateCreateCategory, createCategory);
router.put("/:id", requireAuth, validateIdParam, validateUpdateCategory, updateCategory);
router.delete("/:id", requireAuth, validateIdParam, deleteCategory);

export default router;
