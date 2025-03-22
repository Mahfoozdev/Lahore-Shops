import { Request } from "express";
import { TryCatch } from "../middlewares/error.js";
import { NewProductRequestBody } from "../types/types.js";
import { Product } from "../models/product.js";

export const newProduct = TryCatch(
  async (req: Request<{}, {}, NewProductRequestBody>, res, next) => {
    const { name, stock, price, category } = req.body;
    const photo = req.file;

    await Product.create({
      name,
      stock,
      price,
      photo: photo?.path,
      category: category.toLocaleLowerCase(),
    });

    return res.status(201).json({
      success: true,
      message: "product Created successfully",
    });
  }
);
