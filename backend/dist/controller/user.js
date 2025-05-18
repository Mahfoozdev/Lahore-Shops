import { User } from "../models/user.js";
import ErrorHandler from "../utils/utility-class.js";
import { TryCatch, TryCatchId } from "../middlewares/error.js";
export const newUser = TryCatch(async (req, res, next) => {
    const { name, email, gender, photo, dob, _id } = req.body;
    let user = await User.findById(_id);
    if (user) {
        return res.status(200).json({
            success: true,
            message: `Welcome,${user.name}`,
        });
    }
    const role = email === "mahfoozdoit@gmail.com" ? "admin" : "user";
    user = await User.create({
        name,
        email,
        gender,
        role,
        photo,
        dob: new Date(dob),
        _id,
    });
    return res.status(201).json({
        success: true,
        message: `Welcome,${user.name}`,
    });
});
// get all users
export const getAllUsers = TryCatch(async (req, res, next) => {
    const users = await User.find({});
    return res.status(201).json({
        success: true,
        users,
    });
});
// get a single user
export const getUser = TryCatchId(async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
        return next(new ErrorHandler("User not found", 400));
    }
    return res.status(200).json({
        success: true,
        user,
    });
});
// delete a single user
export const deleteUser = TryCatchId(async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
        return next(new ErrorHandler("Invalid Id", 400));
    }
    await user.deleteOne();
    return res.status(200).json({
        success: true,
        message: "User deleted Successfully",
    });
});
