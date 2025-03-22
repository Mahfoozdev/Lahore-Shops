import mongoose from "mongoose";
import validator from "validator";
const schema = new mongoose.Schema({
    _id: {
        type: String,
        required: [true, "Please Enter Id"],
    },
    name: {
        type: String,
        required: [true, "Please Enter Name"],
    },
    photo: {
        type: String,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        required: [true, "Please Enter Your Gender"],
    },
    email: {
        type: String,
        unique: [true, "Please Try Another One. Email Already Exists"],
        required: [true, "Please Enter Email"],
        validate: validator.default.isEmail,
    },
    dob: {
        type: Date,
        required: [true, "Please Enter Your Date Of Birth"],
    },
}, {
    timestamps: true,
});
schema.virtual("age").get(function () {
    let currentDate = new Date();
    let birthDate = this.dob;
    let currentYear = currentDate.getFullYear();
    let birthYear = birthDate.getFullYear();
    let currentMonth = currentDate.getMonth();
    let birthMonth = birthDate.getMonth();
    let age = currentYear - birthYear;
    if (currentMonth < birthMonth ||
        (currentMonth === birthMonth && currentDate.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
});
export const User = mongoose.model("User", schema);
