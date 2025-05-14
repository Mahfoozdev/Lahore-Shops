import express from "express";
import { connectDB } from "./utils/features.js";
import userRoute from "./routes/user.js";
import productRoute from "./routes/product.js";
import orderRoute from "./routes/order.js";
import paymentRoute from "./routes/payment.js";
import NodeCache from "node-cache";
import { errorHandlerMiddleware } from "./middlewares/error.js";
import { config } from "dotenv";
import morgan from "morgan";
import cors from "cors";

config({
  path: "./.env",
});
const port = process.env.PORT || 4000;
const frontendApi = process.env.FRONTEND_API;
const mongoURI = process.env.MONGO_URI || "";

connectDB(mongoURI);

export const myCache = new NodeCache();

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Api working.");
});

app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/order", orderRoute);
app.use("/api/v1/payment", paymentRoute);

app.use("/uploads", express.static("uploads"));
app.use(errorHandlerMiddleware);

app.listen(port, () => {
  console.log(`app is running on localhost:${port}`);
});
