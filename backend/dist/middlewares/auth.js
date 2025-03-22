// check if there is admin only
import { User } from "../models/user.js";
import ErrorHandler from "../utils/utility-class.js";
import { TryCatchId } from "./error.js";
export const adminOnly = TryCatchId(async (req, res, next) => {
    const { id } = req.query;
    if (!id)
        return next(new ErrorHandler("Please login First to access this Resource", 401));
    const user = await User.findById(id);
    if (!user)
        return next(new ErrorHandler("Invalid Id", 401));
    if (user.role !== "admin") {
        return next(new ErrorHandler("Admin Allowed Only", 401));
    }
    next();
});
