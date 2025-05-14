import express, { RequestHandler } from "express";
import { jazzCashPayment } from "../controller/payment.js";

const app = express.Router();

//route- api/v1/user
app.post("/checkout", jazzCashPayment as RequestHandler);

export default app;
