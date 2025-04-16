import { signOut } from "firebase/auth";
import { User } from "../types/types";
import { auth } from "../firebase";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface PropsTypes {
  user: User | null;
}

const Header = ({ user }: PropsTypes) => {
  const [saying, setSaying] = useState("");
  const logoutHandler = async () => {
    try {
      await signOut(auth);
      setSaying("Logged out successfully");
      setTimeout(() => {
        setSaying("");
      }, 2000);
    } catch (error) {
      setSaying("Logging out failed");
    }
  };

  return (
    <div className="flex gap-32 font-bold w-full justify-center py-10 text-xl font-secondary">
      <div>{user && user.name}</div>
      <div>{user && user.email}</div>

      <div>{user ? "user is logged in " : "user not logged in"}</div>
      <div className="flex items-center gap-5">
        {user && (
          <button
            className="bg-amber-700 text-white p-3 cursor-pointer"
            onClick={logoutHandler}
          >
            Log out
          </button>
        )}
        <div className="text-blue-700">{saying}</div>
        <div>
          {!user && (
            <Link
              to="/login"
              className="bg-green-700 p-3 cursor-pointer text-white"
            >
              login
            </Link>
          )}
        </div>
        {user && <img src={user.photo} alt="" className="rounded-full" />}
      </div>
    </div>
  );
};

export default Header;
