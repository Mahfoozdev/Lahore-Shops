import mongoose from "mongoose";
import { Product } from "../models/product.js";
import { myCache } from "../app.js";
export const connectDB = (uri) => {
    mongoose
        .connect(uri, {
        dbName: "myStore",
    })
        .then((c) => console.log(`Database connected ${c.connection.host}`))
        .catch((e) => console.log(e));
};
export const invalidateCache = async ({ product, order, admin, userId, orderId, productId, }) => {
    if (product) {
        const productKeys = [
            "latest-products",
            "categories",
            "all-products",
        ];
        if (typeof productId === "string")
            productKeys.push(`products-${productId}`);
        if (typeof productId === "object")
            productId.forEach((i) => {
                productKeys.push(`products-${i}`);
            });
        myCache.del(productKeys);
        if (order) {
            const orderKeys = [
                "all-orders",
                `my-orders-${userId}`,
                `order-${orderId}`,
            ];
            myCache.del(orderKeys);
        }
    }
};
export const reduceStock = async (orderItems) => {
    for (let i = 0; i < orderItems.length; i++) {
        const order = orderItems[i];
        const product = await Product.findById(order.productId);
        if (!product)
            throw new Error("Product was Not Found");
        product.stock -= order.quantity;
        await product.save();
    }
};
