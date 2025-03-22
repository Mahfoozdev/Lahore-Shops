import express, { RequestHandler } from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
  newUser,
} from "../controller/user.js";
import { adminOnly } from "../middlewares/auth.js";

const app = express.Router();

//route- api/v1/user
app.post("/new", newUser as RequestHandler);
app.get("/all", getAllUsers as RequestHandler);
app.get("/:id", adminOnly, getUser as RequestHandler);
app.delete("/:id", adminOnly, deleteUser as RequestHandler);

export default app;
