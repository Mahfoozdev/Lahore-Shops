import { signOut } from "firebase/auth";
import { User } from "../types/types";
import { auth } from "../firebase";
import { Link } from "react-router-dom";
import { BsCart2 } from "react-icons/bs";
import { toast } from "react-toastify";
import { FaPowerOff } from "react-icons/fa6";
import { IoHomeOutline } from "react-icons/io5";
import { CartReducerInitialState } from "../types/reducer-types";
import { useSelector } from "react-redux";
import { Avatar, Button, Chip } from "@mui/material";
interface PropsTypes {
  user: User | null;
}

const Header = ({ user }: PropsTypes) => {
  const { cartItems } = useSelector(
    (state: { cartReducer: CartReducerInitialState }) => state.cartReducer
  );
  const logoutHandler = async () => {
    try {
      await signOut(auth);
      toast.success("You Logged Out Successfully");
    } catch (error) {
      toast.error("Logging out Failed");
    }
  };
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="w-full flex justify-center bg-primary text-white">
      <main className="w-[90%] flex gap-32 font-bold  justify-between items-center py-5 text-xl font-secondary">
        <div>LOGO</div>

        <div className="flex items-center gap-10">
          <Link to="/" title="Home">
            <IoHomeOutline />
          </Link>

          <p className="font-light">|</p>
          <Link to="/search" className="font-normal text-[16px]">
            Shop
          </Link>
          <p className="font-light">|</p>
          <Link to="/cart" title="Cart" className="font-bold text-xl  relative">
            <BsCart2 />
            <p className="bg-primary rounded-full text-sm px-[6px] text-white absolute -top-3 left-3 w-fit h-fit">
              {totalItems}
            </p>
          </Link>

          <p className="font-light">|</p>
          {user && (
            <Link
              to="/orders"
              title="Check Your Orders"
              className="font-normal text-[16px]"
            >
              My Orders
            </Link>
          )}

          {user && (
            <Chip
              avatar={<Avatar alt={user.name} src={user.photo} />}
              title={user.name}
              sx={{
                background: "white",
              }}
              label={user.name.split(" ")[1]}
            />
          )}

          {user && (
            <button
              title="Logout"
              className=" font-light flex items-center gap-2 text-[18px] cursor-pointer"
              onClick={logoutHandler}
            >
              <span>
                <FaPowerOff />
              </span>
            </button>
          )}
          <div>
            {!user && (
              <Link
                to="/login"
                className="bg-primary rounded px-3 py-2 font-normal cursor-pointer text-white"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Header;
