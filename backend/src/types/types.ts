import { NextFunction, Request, Response } from "express";

export interface NewUserRequestBody {
  _id: string;
  name: string;
  photo: string;
  email: string;
  gender: string;
  dob: Date;
}
export interface NewProductRequestBody {
  name: string;
  category: string;
  price: number;
  stock: number;
}

export type ControllerTypes<T = any> = (
  req: Request<{}, {}, T>,
  res: Response,
  next: NextFunction
) => Promise<void | Response<any, Record<string, any>>>;

export type SearchRequestQuery = {
  search?: string;
  price?: string;
  category?: string;
  sort?: string;
  page?: string;
};

export interface BaseQuery {
  name?: {
    $regex: string;
    $options: string;
  };
  price?: {
    $lte: number;
  };
  category?: string;
}

export type InvalidateCacheProps = {
  admin?: boolean;
  product?: boolean;
  order?: boolean;
  userId?: string;
  orderId?: string;
  productId?: string | string[];
};

export type OrderItemsType = {
  name: string;
  photo: string;
  price: number;
  quantity: number;
  productId: string;
};
export type ShippingInfoType = {
  address: string;
  city: string;
  pinCode: number;
  country: string;
  state: string;
};

export interface NewOrderRequestBody {
  shippingInfo: ShippingInfoType;
  user: string;
  subTotal: number;
  tax: number;
  shippingCharges: number;
  total: number;
  discount: number;
  orderItems: OrderItemsType[];
}
