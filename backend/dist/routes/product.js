import express from "express";
import { adminOnly } from "../middlewares/auth.js";
import { adminProducts, allProducts, deleteProduct, getAllCategories, getLatestProduct, newProduct, singleProduct, updateProduct, } from "../controller/product.js";
import { singleUpload } from "../middlewares/multer.js";
const app = express.Router();
//route- api/v1/user
app.post("/new", adminOnly, singleUpload, newProduct);
app.get("/latest", getLatestProduct);
app.get("/categories", getAllCategories);
app.put("/:id", updateProduct);
app.get("/:id", singleProduct);
app.get("/all-products", allProducts);
app.get("/admin-products", adminProducts);
app.delete("/delete-product", adminOnly, deleteProduct);
export default app;
