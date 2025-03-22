import express from "express";
import { newProduct } from "../controller/product.js";
import { singleUpload } from "../middlewares/multer.js";
const app = express.Router();
//route- api/v1/user
app.post("/new", singleUpload, newProduct);
export default app;
