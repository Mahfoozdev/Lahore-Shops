import { Request, Response, NextFunction } from "express";
import { TryCatch } from "../middlewares/error.js";
import { NewPaymentRequestBody } from "../types/types.js";
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();

const generateJazzCashPayload = (amount: number) => {
  const {
    JAZZCASH_MERCHANT_ID,
    JAZZCASH_PASSWORD,
    JAZZCASH_INTEGRITY_SALT,
    JAZZCASH_RETURN_URL,
    JAZZCASH_POST_URL,
  } = process.env;

  const date = new Date();
  const txnDateTime = date
    .toISOString()
    .replace(/[-:TZ.]/g, "")
    .substring(0, 14);
  const expiryDateTime = new Date(Date.now() + 3600000)
    .toISOString()
    .replace(/[-:TZ.]/g, "")
    .substring(0, 14);
  const txnRefNo = `T${txnDateTime}`;
  const amountStr = (amount * 100).toFixed(0);

  const payload: any = {
    pp_Version: "1.1",
    pp_TxnType: "MPAY",
    pp_Language: "EN",
    pp_MerchantID: JAZZCASH_MERCHANT_ID,
    pp_Password: JAZZCASH_PASSWORD,
    pp_TxnRefNo: txnRefNo,
    pp_Amount: amountStr,
    pp_TxnCurrency: "PKR",
    pp_TxnDateTime: txnDateTime,
    pp_BillReference: "billRef",
    pp_Description: "Order Payment",
    pp_TxnExpiryDateTime: expiryDateTime,
    pp_ReturnURL: JAZZCASH_RETURN_URL,
    pp_SecureHash: "",
    ppmpf_1: "custom1",
    ppmpf_2: "custom2",
    ppmpf_3: "",
    ppmpf_4: "",
    ppmpf_5: "",
  };

  const sortedString = [
    JAZZCASH_INTEGRITY_SALT,
    payload.pp_Amount,
    payload.pp_BillReference,
    payload.pp_Description,
    payload.pp_Language,
    payload.pp_MerchantID,
    payload.pp_Password,
    payload.pp_ReturnURL,
    payload.pp_TxnCurrency,
    payload.pp_TxnDateTime,
    payload.pp_TxnExpiryDateTime,
    payload.pp_TxnRefNo,
    payload.pp_TxnType,
    payload.pp_Version,
    payload.ppmpf_1,
    payload.ppmpf_2,
    payload.ppmpf_3,
    payload.ppmpf_4,
    payload.ppmpf_5,
  ].join("&");

  const secureHash = crypto
    .createHash("sha256")
    .update(sortedString)
    .digest("hex")
    .toUpperCase();
  payload.pp_SecureHash = secureHash;

  return { payload, postUrl: JAZZCASH_POST_URL };
};

export const jazzCashPayment = TryCatch(
  async (
    req: Request<{}, {}, NewPaymentRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid amount" });
    }

    const { payload, postUrl } = generateJazzCashPayload(amount);

    return res.status(200).json({
      success: true,
      message: "JazzCash payment initialized",
      postUrl,
      payload,
    });
  }
);
