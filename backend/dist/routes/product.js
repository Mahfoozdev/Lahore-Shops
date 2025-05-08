import express from "express";
import { adminOnly } from "../middlewares/auth.js";
import { adminProducts, allProducts, deleteProduct, getAllCategories, getLatestProduct, newProduct, singleProduct, updateProduct, } from "../controller/product.js";
import { singleUpload } from "../middlewares/multer.js";
const app = express.Router();
//route- api/v1/user
app.post("/new", adminOnly, singleUpload, newProduct);
app.get("/latest", getLatestProduct);
app.get("/categories", getAllCategories);
app.get("/admin-products", adminOnly, adminProducts);
app.get("/all-products", allProducts);
app.delete("/:id", adminOnly, deleteProduct);
app.put("/:id", adminOnly, singleUpload, updateProduct);
app.get("/:id", singleProduct);
export default app;
