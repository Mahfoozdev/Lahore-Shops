import express from "express";
import { deleteUser, getAllUsers, getUser, newUser, } from "../controller/user.js";
import { adminOnly } from "../middlewares/auth.js";
const app = express.Router();
//route- api/v1/user
app.post("/new", newUser);
app.get("/all", getAllUsers);
app.get("/:id", getUser);
app.delete("/:id", adminOnly, deleteUser);
export default app;
