import express, { RequestHandler } from "express";
import { adminOnly } from "../middlewares/auth.js";
import { newProduct } from "../controller/product.js";
import { singleUpload } from "../middlewares/multer.js";

const app = express.Router();

//route- api/v1/user
app.post("/new", singleUpload, newProduct as RequestHandler);

export default app;
