import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";
import { useLoginMutation } from "../redux/api/userAPI";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { MessageResponse } from "../types/api-types";
import { BsGoogle } from "react-icons/bs";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [gender, setGender] = useState("");
  const [date, setDate] = useState("");
  const [register, setRegister] = useState(true);
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const loginHandler = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);

      const res = await login({
        name: user.displayName!,
        email: user.email!,
        photo: user.photoURL!,
        gender: gender,
        role: "user",
        dob: date,
        _id: user.uid,
      });

      if ("data" in res) {
        toast.success(res.data?.message!);
        navigate("/");
      } else {
        const error = res.error as FetchBaseQueryError;
        const message = (error.data as MessageResponse).message;
        toast.error(message);
      }
    } catch (error) {
      toast.error("Login Failed");
    }
  };
  const toggleHandler = () => {
    setRegister(!register);
  };
  return (
    <div className="w-full  flex flex-col items-center pb-32 pt-10">
      {register && (
        <div className="pt-10 flex flex-col  gap-10 bg-primary text-secondary lg:w-[30%] w-[90%] p-5">
          <div className="w-full border-b-[1px]  border-[rgba(0,0,0,0.1)] p-3">
            <p className="text-xl font-semibold text-secondary">REGISTER</p>
            <p className="font-light">|</p>
            <button
              onClick={toggleHandler}
              className="cursor-pointer text-secondary/80"
            >
              SIGN IN
            </button>
          </div>
          <div className="flex flex-col  gap-10">
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="">
                Gender :
              </label>
              <select
                className="border border-secondary/20 cursor-pointer p-3 w-full"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                id=""
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="">
                Date Of Birth :
              </label>
              <input
                className="border w-full border-secondary/20 p-3 cursor-pointer"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                name=""
                id=""
              />
            </div>
          </div>

          <button
            onClick={loginHandler}
            className="bg-secondary hover:bg-primary hover:text-secondary transition-all duration-300 border border-secondary text-primary  px-5 py-3 cursor-pointer flex items-center justify-center gap-3 rounded"
          >
            <span>
              <BsGoogle />
            </span>
            Register with Google
          </button>
          <button
            className="underline underline-offset-1 cursor-pointer text-sm text-secondary"
            onClick={toggleHandler}
          >
            {" "}
            Already Registered - Sign In
          </button>
        </div>
      )}

      {!register && (
        <div className="pt-10 flex flex-col  gap-2 bg-primary shadow-xl lg:w-[30%] w-[90%] p-5">
          <div className="w-full border-b-[1px] border-secondary/20 p-3">
            <p className="text-xl font-semibold text-secondary">SIGN IN</p>
            <p className="font-light text-secondary">|</p>
            <button
              onClick={toggleHandler}
              className="cursor-pointer text-secondary/80"
            >
              REGISTER
            </button>
          </div>

          <button
            onClick={loginHandler}
            className="bg-secondary hover:bg-primary mt-5 hover:text-secondary transition-all duration-300 border border-secondary text-primary  px-5 py-3 cursor-pointer flex items-center justify-center gap-3 rounded"
          >
            <span>
              <BsGoogle />
            </span>
            Log-In with Google
          </button>
          <button
            className="underline underline-offset-1 cursor-pointer text-sm text-secondary"
            onClick={toggleHandler}
          >
            {" "}
            Register if not registered before
          </button>
        </div>
      )}
    </div>
  );
};

export default SignUp;
