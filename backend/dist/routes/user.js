import express from "express";
import { newUser } from "../controller/user.js";
const app = express.Router();
//route- api/v1/user
app.post("/new", newUser);
export default app;
