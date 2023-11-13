import { Router } from "express";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
} from "../controllers/productController.js";
import { productValidation ,validateCreateProduct } from "../validator/productValidator.js";
import { runValidation } from "../validator/runValidator.js";

const router = Router();

router.get("/", getAllProducts); // GET: /products -> get all products

router.post("/", validateCreateProduct , runValidation,  addProduct);

router.get("/:id", productValidation, runValidation,  getSingleProduct); // GET: /products/:id -> get a single product based on id

router.delete("/:id", productValidation, runValidation,  deleteProduct);

router.put("/:id", updateProduct);

export default router;
