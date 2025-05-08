export interface User {
  name: string;
  role: string;
  photo: string;
  email: string;
  gender: string;
  dob: string;
  _id: string;
}

export interface Product {
  name: string;
  photo: string;
  category: string;
  price: number;
  stock: number;
  _id: string;
}

export type ShippingInfo = {
  address: string;
  city: string;
  state: string;
  country: string;
  pinCode: string;
};

export type CartItems = {
  productId: string;
  photo: string;
  name: string;
  price: number;
  quantity: number;
  stock: number;
};

export type OrderItems = Omit<CartItems, "stock"> & { _id: string };

export type Order = {
  orderItems: OrderItems[];
  shippingInfo: ShippingInfo;
  subtotal: number;
  tax: number;
  shippingCharges: number;
  discount: number;
  total: number;
  status: string;
  user: {
    name: string;
    _id: string;
  };
  _id: string;
};
