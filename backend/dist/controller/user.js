import { User } from "../models/user.js";
import { TryCatch } from "../middlewares/error.js";
export const newUser = TryCatch(async (req, res, next) => {
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
});
