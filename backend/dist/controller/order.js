import { TryCatch, TryCatchId, } from "../middlewares/error.js";
import { Order } from "../models/order.js";
import { invalidateCache, reduceStock } from "../utils/features.js";
import ErrorHandler from "../utils/utility-class.js";
import { myCache } from "../app.js";
export const newOrder = TryCatch(async (req, res, next) => {
    console.log("Received req.body:", req.body);
    const { shippingInfo, shippingCharges, tax, discount, subtotal, paymentStatus, total, user, orderItems, } = req.body;
    if (!shippingInfo ||
        tax === undefined ||
        subtotal === undefined ||
        total === undefined ||
        !user ||
        !orderItems ||
        !Array.isArray(orderItems) ||
        orderItems.length === 0) {
        return next(new ErrorHandler("All required fields must be provided", 400));
    }
    const order = await Order.create({
        shippingInfo,
        shippingCharges,
        tax,
        paymentStatus,
        discount,
        subtotal,
        total,
        user,
        orderItems,
    });
    reduceStock(orderItems);
    await invalidateCache({
        order: true,
        product: true,
        admin: true,
        userId: user,
        productId: order.orderItems.map((i) => String(i.productId)),
    });
    return res.status(200).json({
        success: true,
        message: "Order Placed Successfully",
    });
});
export const myOrder = TryCatchId(async (req, res, next) => {
    const { id: user } = req.query;
    let orders = [];
    if (myCache.has(`my-orders-${user}`))
        orders = JSON.parse(myCache.get(`my-orders-${user}`));
    else {
        orders = await Order.find({ user });
        myCache.set(`my-orders-${user}`, JSON.stringify(orders));
    }
    return res.status(200).json({
        success: true,
        orders,
    });
});
export const allOrders = TryCatch(async (req, res, next) => {
    const key = `all-orders`;
    let orders = [];
    if (myCache.has(key))
        orders = JSON.parse(myCache.get(key));
    else {
        orders = await Order.find().populate("user", "name");
        myCache.set(key, JSON.stringify(orders));
    }
    return res.status(200).json({
        success: true,
        orders,
    });
});
export const processOrder = TryCatchId(async (req, res, next) => {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) {
        return next(new ErrorHandler("Order NOt Found", 404));
    }
    switch (order.status) {
        case "Processing":
            order.status = "Shipped";
            break;
        case "Shipped":
            order.status = "Delivered";
            break;
        default:
            order.status = "Delivered";
            break;
    }
    await order.save();
    await invalidateCache({
        product: false,
        order: true,
        admin: true,
        userId: order.user,
        orderId: String(order._id),
    });
    return res.status(200).json({
        success: true,
        message: `Order processed to ${order.status} successfully`,
    });
});
export const deleteOrder = TryCatchId(async (req, res, next) => {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) {
        return next(new ErrorHandler("Order was Not Found", 404));
    }
    await order.deleteOne();
    await invalidateCache({
        product: false,
        order: true,
        admin: true,
        userId: order.user,
        orderId: String(order._id),
    });
    return res.status(200).json({
        success: true,
        message: `Order Deleted successfully`,
    });
});
export const singleOrder = TryCatchId(async (req, res, next) => {
    const { id } = req.params;
    const key = `order-${id}`;
    let order;
    if (myCache.has(key))
        order = JSON.parse(myCache.get(key));
    else {
        order = await Order.findById(id).populate("user", "name");
        myCache.set(key, JSON.stringify(order));
    }
    return res.status(200).json({
        success: true,
        order,
    });
});
