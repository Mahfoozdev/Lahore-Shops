import express, { RequestHandler } from "express";
import { adminOnly } from "../middlewares/auth.js";
import {
  allOrders,
  deleteOrder,
  myOrder,
  newOrder,
  processOrder,
  singleOrder,
} from "../controller/order.js";
import { singleUpload } from "../middlewares/multer.js";

const app = express.Router();

//route- api/v1/order
app.post("/new", newOrder as RequestHandler);
app.get("/my", myOrder as RequestHandler);
app.get("/all", adminOnly, allOrders as RequestHandler);
app.put("/:id", adminOnly, processOrder as RequestHandler);
app.delete("/:id", adminOnly, deleteOrder as RequestHandler);
app.get("/:id", singleOrder as RequestHandler);

export default app;
