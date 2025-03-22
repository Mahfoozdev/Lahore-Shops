import express, { RequestHandler } from "express";
import { newUser } from "../controller/user.js";

const app = express.Router();

//route- api/v1/user
app.post("/new", newUser as RequestHandler);

export default app;
