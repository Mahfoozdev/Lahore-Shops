import mongoose from "mongoose";
export const connectDB = () => {
    mongoose
        .connect("mongodb://localhost:27017", {
        dbName: "myStore",
    })
        .then((c) => console.log(`Database connected ${c.connection.host}`))
        .catch((e) => console.log(e));
};
