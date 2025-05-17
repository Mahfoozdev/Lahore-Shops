import { signOut } from "firebase/auth";
import { User } from "../types/types";
import { auth } from "../firebase";
import { Link } from "react-router-dom";
import { BsCart2, BsMenuButtonWide } from "react-icons/bs";
import { toast } from "react-toastify";
import { FaPowerOff } from "react-icons/fa6";
import { IoHomeOutline } from "react-icons/io5";
import { CartReducerInitialState } from "../types/reducer-types";
import { useSelector } from "react-redux";
import {
  Avatar,
  Box,
  Chip,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { RiMenu3Line } from "react-icons/ri";
import { useState } from "react";
import { MdLogin, MdOutlineContactPage } from "react-icons/md";
interface PropsTypes {
  user: User | null;
}

const Header = ({ user }: PropsTypes) => {
  const [open, setOpen] = useState(false);
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
    toggleDrawer(false)();
  };
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const mobileCategory = () => {
    toggleDrawer(false)();
  };
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box
      sx={{ width: 250, background: "#928dab", height: "100vh" }}
      role="presentation"
    >
      <List className="bg-primary">
        {user && (
          <ListItem>
            <Chip
              avatar={<Avatar alt={user.name} src={user.photo} />}
              title={user.name}
              sx={{ background: "#1f1c2c", color: "#928dab" }}
              label={user.name.split(" ")[1]}
            />
          </ListItem>
        )}
        {user && <Divider />}
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to="/"
            title="Home"
            onClick={() => mobileCategory()}
          >
            <ListItemIcon sx={{ minWidth: 45 }}>
              <span className="bg-secondary text-primary p-2 rounded-full">
                <IoHomeOutline />
              </span>
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>

        {user && (
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/orders"
              title="Check Your Orders"
              onClick={() => mobileCategory()}
            >
              <ListItemIcon sx={{ minWidth: 45 }}>
                <span className="bg-secondary text-primary p-2 rounded-full">
                  {" "}
                  <BsMenuButtonWide />
                </span>
              </ListItemIcon>
              <ListItemText primary="My Orders" />
            </ListItemButton>
          </ListItem>
        )}

        {user && (
          <ListItem disablePadding>
            <ListItemButton onClick={logoutHandler} title="Logout">
              <ListItemIcon sx={{ minWidth: 45 }}>
                <span className="bg-secondary text-primary p-2 rounded-full">
                  <FaPowerOff />
                </span>
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        )}

        {!user && (
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/login"
              onClick={() => mobileCategory()}
            >
              <ListItemIcon sx={{ minWidth: 45 }}>
                <span className="bg-secondary text-primary p-2 rounded-full">
                  {" "}
                  <MdLogin />
                </span>
              </ListItemIcon>
              <ListItemText
                primary="Login"
                primaryTypographyProps={{
                  sx: {},
                }}
              />
            </ListItemButton>
          </ListItem>
        )}

        <Divider />

        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to="/contact"
            onClick={() => mobileCategory()}
          >
            <ListItemIcon sx={{ minWidth: 45 }}>
              <span className="bg-secondary text-primary p-2 rounded-full">
                {" "}
                <MdOutlineContactPage />
              </span>
            </ListItemIcon>
            <ListItemText primary="Contact Us" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
  return (
    <div className="w-full flex justify-center bg-primary text-secondary">
      <main className="lg:w-[90%] w-[95%] flex gap-32 font-bold  justify-between items-center py-5 text-xl">
        <Link to="/" className="flex gap-3">
          <h1>LS</h1> <h2 className="underline">lahoreShops</h2>
        </Link>

        <div className="flex items-center gap-7 lg:hidden ">
          <Link to="/search" className="font-normal text-[14px]">
            Shop
          </Link>
          <Link
            to="/cart"
            title="Cart"
            className="font-bold text-xl font-secondary relative"
          >
            <BsCart2 />
            <p className="bg-primary rounded-full text-sm px-[6px]  absolute -top-3 left-3 w-fit h-fit">
              {totalItems}
            </p>
          </Link>
          <div>
            <button onClick={toggleDrawer(true)}>
              <RiMenu3Line />
            </button>
            <Drawer open={open} onClose={toggleDrawer(false)}>
              {DrawerList}
            </Drawer>
          </div>
        </div>
        <div className="lg:flex hidden  items-center gap-10">
          <Link to="/" title="Home">
            <IoHomeOutline />
          </Link>

          <p className="font-light">|</p>
          <Link to="/search" className="font-normal text-[16px]">
            Shop
          </Link>
          <p className="font-light">|</p>
          <Link
            to="/cart"
            title="Cart"
            className="font-bold text-xl font-secondary relative"
          >
            <BsCart2 />
            <p className="bg-primary rounded-full text-sm px-[6px]  absolute -top-3 left-3 w-fit h-fit">
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
                background: "#1f1c2c",
                color: "#928dab",
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
                className="bg-primary rounded px-3 py-2 font-normal cursor-pointer text-secondary"
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
