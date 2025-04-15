import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";
import { useLoginMutation } from "../redux/api/userAPI";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { MessageResponse } from "../types/api-types";

const SignUp = () => {
  const [myError, setMyError] = useState("");
  const [gender, setGender] = useState("");
  const [date, setDate] = useState("");
  const [login] = useLoginMutation();
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
        setMyError(res.data?.message!);
      } else {
        const error = res.error as FetchBaseQueryError;
        const message = (error.data as MessageResponse).message;
        setMyError(message);
      }
    } catch (error) {
      setMyError("Login FAiled");
    }
  };
  return (
    <div className="w-full  flex flex-col items-center pb-32 pt-10">
      <h1 className="font-danger font-bold text-7xl pb-10"> Lahore Shops</h1>
      <h1 className="font-dance font-bold text-4xl">Sign Up</h1>
      <div className="pt-10 flex flex-col items-center gap-10">
        <div className="flex flex-col items-center gap-10">
          <div className="flex items-center gap-5">
            <label htmlFor="" className="font-primary">
              Gender :
            </label>
            <select
              className="border-2 border-black  p-3"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              id=""
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="flex items-center gap-5">
            <label htmlFor="" className="font-primary">
              Date Of Birth :
            </label>
            <input
              className="border-2 border-black p-3"
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
          className="bg-black hover:bg-white hover:text-black transition-all duration-300 border-2 border-black text-white text-xl p-5 cursor-pointer"
        >
          Sign In With Google
        </button>
        <div className="text-red-700 font-secondary">{myError}</div>
      </div>
    </div>
  );
};

export default SignUp;
