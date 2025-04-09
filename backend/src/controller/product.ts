import { Request } from "express";
import { myCache } from "../app.js";
import {
  errorHandlerMiddleware,
  TryCatch,
  TryCatchId,
} from "../middlewares/error.js";
import {
  BaseQuery,
  NewProductRequestBody,
  SearchRequestQuery,
} from "../types/types.js";
import { Product } from "../models/product.js";
import ErrorHandler from "../utils/utility-class.js";
import { rm } from "fs";
import { invalidateCache } from "../utils/features.js";

export const newProduct = TryCatch(
  async (req: Request<{}, {}, NewProductRequestBody>, res, next) => {
    const { name, stock, price, category } = req.body;
    const photo = req.file;
    if (!photo) return next(new ErrorHandler("Please Enter Photo", 400));
    if (!name || !price || !category || !stock) {
      rm(photo.path, () => {
        console.log("photo deleted");
      });

      return next(new ErrorHandler("Please Fil in All Fields", 400));
    }
    await Product.create({
      name,
      stock,
      price,
      photo: photo?.path,
      category: category.toLocaleLowerCase(),
    });
    await invalidateCache({ product: true });

    return res.status(201).json({
      success: true,
      message: "product Created successfully",
    });
  }
);

// Get latest product  api controller

export const getLatestProduct = TryCatch(async (req, res, next) => {
  let products;
  if (myCache.has("latest-products")) {
    products = JSON.parse(myCache.get("latest-products") as string);
  } else {
    products = await Product.find({}).sort({ createdAt: -1 }).limit(15);
    myCache.set("latest-products", JSON.stringify(products));
  }

  return res.status(200).json({
    success: true,
    products,
  });
});

// Get all categories of product  api controller

export const getAllCategories = TryCatch(async (req, res, next) => {
  let categories;
  if (myCache.has("category")) {
    categories = JSON.parse(myCache.get("category") as string);
  } else {
    categories = await Product.distinct("category");
    myCache.set("category", JSON.stringify(categories));
  }

  return res.status(200).json({
    success: true,
    categories,
  });
});

// update a product  api controller

export const updateProduct = TryCatchId(
  async (
    req: Request<{ id: string }, {}, NewProductRequestBody>,
    res,
    next
  ) => {
    const { id } = req.params;
    const { name, category, stock, price } = req.body;
    const photo = req.file;
    const product = await Product.findById(id);
    if (!product)
      return next(new ErrorHandler("invalid Id of te product", 400));
    if (photo) {
      rm(product?.photo!, () => {
        console.log("old photo deleted");
      });
      product?.photo != photo.path;
    }
    if (name) product?.name != name;
    if (category) product?.category != category;
    if (price) product?.price != price;
    if (stock) product?.stock != stock;

    await product?.save();

    await invalidateCache({ product: true });
    return res.status(200).json({
      success: true,
      message: "product updated successfully",
    });
  }
);

// Get all  single Product   api controller

export const singleProduct = TryCatchId(
  async (
    req: Request<{ id: string }, {}, NewProductRequestBody>,
    res,
    next
  ) => {
    const { id } = req.params;
    let product;
    if (myCache.has(`product-${id}`)) {
      product = JSON.parse(myCache.get(`product-${id}`) as string);
    } else {
      product = await Product.findById({ id });
      if (!product) return next(new ErrorHandler("Product was not found", 404));
      myCache.set(`product-${id}`, JSON.stringify(product));
    }
    return res.status(200).json({
      success: true,
      product,
    });
  }
);

// delete Product   api controller

export const deleteProduct = TryCatchId(
  async (
    req: Request<{ id: string }, {}, NewProductRequestBody>,
    res,
    next
  ) => {
    const { id } = req.params;
    const product = await Product.findById({ id });

    if (!product) return next(new ErrorHandler("Product was not found", 404));
    rm(product.photo, () => {
      console.log(" Product Photo Deleted");
    });

    await Product.deleteOne;

    await invalidateCache({ product: true });
    return res.status(200).json({
      success: true,
      message: "Product Deleted Successfully",
    });
  }
);

// admin products
export const adminProducts = TryCatch(async (req, res, next) => {
  let products;
  if (myCache.has("all-products")) {
    products = JSON.parse(myCache.get("all-products") as string);
  } else {
    products = await Product.find({});
    myCache.set("all-products", JSON.stringify(products));
  }

  return res.status(200).json({
    success: true,
    products,
  });
});

// Get all  products   api controller

export const allProducts = TryCatch(
  async (req: Request<{}, {}, {}, SearchRequestQuery>, res, next) => {
    const { search, sort, price, category } = req.query;
    const page = Number(req.query.page) || 1;
    const limit = Number(process.env.PRODUCT_PER_PAGE) || 7;
    const skip = (page - 1) * limit;

    const baseQuery: BaseQuery = {};

    if (search)
      baseQuery.name = {
        $regex: search,
        $options: "i",
      };

    if (price)
      baseQuery.price = {
        $lte: Number(price),
      };
    if (category) baseQuery.category = category;

    const [products, filteredProductsOnly] = await Promise.all([
      Product.find(baseQuery)
        .sort(sort && { price: sort === "asc" ? 1 : -1 })
        .limit(limit)
        .skip(skip),
      Product.find(baseQuery),
    ]);

    const totalPage = Math.ceil(filteredProductsOnly.length / limit);

    return res.status(200).json({
      success: true,
      products,
      totalPage,
    });
  }
);
