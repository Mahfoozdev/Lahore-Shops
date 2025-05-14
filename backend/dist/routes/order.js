import express from "express";
import { adminOnly } from "../middlewares/auth.js";
import { allOrders, deleteOrder, myOrder, newOrder, processOrder, singleOrder, } from "../controller/order.js";
const app = express.Router();
//route- api/v1/order
app.post("/new", newOrder);
app.get("/my", myOrder);
app.get("/all", adminOnly, allOrders);
app.put("/:id", adminOnly, processOrder);
app.delete("/:id", adminOnly, deleteOrder);
app.get("/:id", singleOrder);
export default app;
