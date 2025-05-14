import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  NewPaymentRequest,
  PaymentMessageResponse,
} from "../../types/api-types";

export const paymentApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/payment`,
  }),
  endpoints: (builder) => ({
    newPayment: builder.mutation<PaymentMessageResponse, NewPaymentRequest>({
      query: (amount) => ({ url: "checkout", method: "POST", body: amount }),
    }),
  }),
});

export const { useNewPaymentMutation } = paymentApi;
