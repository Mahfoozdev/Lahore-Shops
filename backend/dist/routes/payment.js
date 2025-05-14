import express from "express";
import { jazzCashPayment } from "../controller/payment.js";
const app = express.Router();
//route- api/v1/user
app.post("/checkout", jazzCashPayment);
export default app;
