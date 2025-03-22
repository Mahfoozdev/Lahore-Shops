import { Request, NextFunction, Response } from "express";
import { User } from "../models/user.js";
import { NewUserRequestBody } from "../types/types.js";
import ErrorHandler from "../utils/utility-class.js";
import { TryCatch } from "../middlewares/error.js";

export const newUser = TryCatch(
  async (
    req: Request<{}, {}, NewUserRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { name, email, gender, photo, dob, _id } = req.body;

    let user = await User.findById(_id);
    if (user) {
      return res.status(200).json({
        success: true,
        message: `Welcome,${user.name}`,
      });
    }

    user = await User.create({
      name,
      email,
      gender,
      photo,
      dob: new Date(dob),
      _id,
    });

    return res.status(201).json({
      success: true,
      message: `Welcome,${user.name}`,
    });
  }
);
