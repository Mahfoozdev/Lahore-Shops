import express from "express";
import { connectDB } from "./utils/features.js";
import userRoute from "./routes/user.js";
import productRoute from "./routes/product.js";
import { errorHandlerMiddleware } from "./middlewares/error.js";
const port = 4000;
connectDB();
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Api working.");
});
app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/uploads", express.static("uploads"));
app.use(errorHandlerMiddleware);
app.listen(port, () => {
    console.log(`app is running on localhost:${port}`);
});
