import express, { RequestHandler } from "express";
import { adminOnly } from "../middlewares/auth.js";
import {
  adminProducts,
  allProducts,
  deleteProduct,
  getAllCategories,
  getLatestProduct,
  newProduct,
  singleProduct,
  updateProduct,
} from "../controller/product.js";
import { singleUpload } from "../middlewares/multer.js";

const app = express.Router();

//route- api/v1/user
app.post("/new", adminOnly, singleUpload, newProduct as RequestHandler);
app.get("/latest", getLatestProduct as RequestHandler);
app.get("/categories", getAllCategories as RequestHandler);
app.get("/admin-products", adminOnly, adminProducts as RequestHandler);
app.get("/all-products", allProducts as RequestHandler);
app.delete("/:id", adminOnly, deleteProduct as RequestHandler);
app.put("/:id", adminOnly, singleUpload, updateProduct as RequestHandler);
app.get("/:id", singleProduct as RequestHandler);

export default app;
