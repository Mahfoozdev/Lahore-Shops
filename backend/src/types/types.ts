import { NextFunction, Request, Response } from "express";

export interface NewUserRequestBody {
  _id: string;
  name: string;
  photo: string;
  email: string;
  gender: string;
  dob: Date;
}

export type ControllerTypes = (
  req: Request<{}, {}, NewUserRequestBody>,
  res: Response,
  next: NextFunction
) => Promise<void | Response<any, Record<string, any>>>;
