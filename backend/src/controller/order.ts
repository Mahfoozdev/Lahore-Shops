import { Request } from "express";
import {
  errorHandlerMiddleware,
  TryCatch,
  TryCatchId,
} from "../middlewares/error.js";
import { NewOrderRequestBody } from "../types/types.js";
import { Order } from "../models/order.js";
import { invalidateCache, reduceStock } from "../utils/features.js";
import ErrorHandler from "../utils/utility-class.js";
import { myCache } from "../app.js";

export const newOrder = TryCatch(
  async (req: Request<{}, {}, NewOrderRequestBody>, res, next) => {
    console.log("Received req.body:", req.body);
    const {
      shippingInfo,
      shippingCharges,
      tax,
      discount,
      subtotal,
      paymentStatus,
      total,
      user,
      orderItems,
    } = req.body;

    if (
      !shippingInfo ||
      tax === undefined ||
      subtotal === undefined ||
      total === undefined ||
      !user ||
      !orderItems ||
      !Array.isArray(orderItems) ||
      orderItems.length === 0
    ) {
      return next(
        new ErrorHandler("All required fields must be provided", 400)
      );
    }

    await Order.create({
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

    return res.status(200).json({
      success: true,
      message: "Order Placed Successfully",
    });
  }
);

export const myOrder = TryCatchId(async (req, res, next) => {
  const { id: user } = req.query;
  let orders = [];

  orders = await Order.find({ user });
  return res.status(200).json({
    success: true,
    orders,
  });
});

export const allOrders = TryCatch(async (req, res, next) => {
  let orders = [];
  orders = await Order.find().populate("user", "name");
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

  return res.status(200).json({
    success: true,
    message: `Order Deleted successfully`,
  });
});

export const singleOrder = TryCatchId(async (req, res, next) => {
  const { id } = req.params;

  let order;
  order = await Order.findById(id).populate("user", "name");

  return res.status(200).json({
    success: true,
    order,
  });
});
