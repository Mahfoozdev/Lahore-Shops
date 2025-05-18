import { useDispatch, useSelector } from "react-redux";
import {
  CartReducerInitialState,
  UserReducerInitialState,
} from "../types/reducer-types";
import {
  addToCart,
  calculatePrice,
  removeCartItem,
} from "../redux/reducer/cartReducer";
import { CartItems } from "../types/types";
import { AiOutlineSend } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { IoMdCheckmark } from "react-icons/io";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Chip,
  Alert,
} from "@mui/material";
import { MdDeleteForever } from "react-icons/md";
import { server } from "../redux/store";
import { FaRegFaceSadTear } from "react-icons/fa6";

const Cart = () => {
  const { cartItems, subtotal, tax, total, shippingCharges } = useSelector(
    (state: { cartReducer: CartReducerInitialState }) => state.cartReducer
  );
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const increaseHandler = (cartItem: CartItems) => {
    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity + 1 }));
    dispatch(calculatePrice());
  };

  const decreaseHandler = (cartItem: CartItems) => {
    if (cartItem.quantity > 1) {
      dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity - 1 }));
      dispatch(calculatePrice());
    }
  };

  const removingHandle = (productId: string) => {
    dispatch(removeCartItem(productId));
    dispatch(calculatePrice());
  };

  const placeOrderHandler = () => {
    if (!user) {
      toast.error("Please Login First");
      navigate("/login");
    } else {
      navigate("/shipping");
    }
  };

  return (
    <div className="w-full flex flex-col items-center pt-10 pb-32 px-5">
      {cartItems.length > 0 ? (
        <>
          <TableContainer
            component={Paper}
            sx={{
              maxWidth: 1200,
              background: "rgba(146, 141, 171, 0.3)",
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      borderBottom: "1px solid #1f1c2c",
                      color: "#928dab",
                      fontSize: "17px",
                    }}
                  >
                    Image
                  </TableCell>
                  <TableCell
                    sx={{
                      borderBottom: "1px solid #1f1c2c",
                      color: "#928dab",
                      fontSize: "17px",
                    }}
                  >
                    Name
                  </TableCell>
                  <TableCell
                    sx={{
                      borderBottom: "1px solid #1f1c2c",
                      color: "#928dab",
                      fontSize: "17px",
                    }}
                  >
                    Price
                  </TableCell>
                  <TableCell
                    sx={{
                      borderBottom: "1px solid #1f1c2c",
                      color: "#928dab",
                      fontSize: "17px",
                    }}
                  >
                    Quantity
                  </TableCell>
                  <TableCell
                    sx={{
                      borderBottom: "1px solid #1f1c2c",
                      color: "#928dab",
                      fontSize: "17px",
                    }}
                  >
                    Total
                  </TableCell>
                  <TableCell
                    sx={{
                      borderBottom: "1px solid #1f1c2c",
                      color: "#928dab",
                      fontSize: "17px",
                    }}
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartItems.map((item) => (
                  <TableRow key={item.productId}>
                    <TableCell sx={{ borderBottom: "1px solid #1f1c2c" }}>
                      <img
                        src={`${server}/${item.photo}`}
                        alt={item.name}
                        height={60}
                        width={60}
                        style={{ borderRadius: "3px" }}
                      />
                    </TableCell>
                    <TableCell
                      sx={{
                        borderBottom: "1px solid #1f1c2c",
                        color: "#928dab",
                      }}
                    >
                      {item.name}
                    </TableCell>
                    <TableCell
                      sx={{
                        borderBottom: "1px solid #1f1c2c",
                        color: "#928dab",
                        fontSize: "14px",
                      }}
                    >
                      Rs. {item.price}
                    </TableCell>
                    <TableCell sx={{ borderBottom: "1px solid #1f1c2c" }}>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => decreaseHandler(item)}
                        >
                          -
                        </Button>
                        <span>{item.quantity}</span>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => increaseHandler(item)}
                        >
                          +
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell
                      sx={{
                        borderBottom: "1px solid #1f1c2c",
                        color: "#928dab",
                        fontSize: "17px",
                      }}
                    >
                      Rs. {item.price * item.quantity}
                    </TableCell>
                    <TableCell sx={{ borderBottom: "1px solid #1f1c2c" }}>
                      <Chip
                        label="Remove"
                        color="primary"
                        deleteIcon={<MdDeleteForever />}
                        onDelete={() => removingHandle(item.productId)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <div className="pt-10">
            {shippingCharges > 0 ? (
              ""
            ) : (
              <Alert
                icon={<IoMdCheckmark fontSize="inherit" />}
                severity="success"
              >
                You are eligible for free shipping
              </Alert>
            )}
          </div>

          {/* Summary Section */}
          <div className="mt-5 w-full max-w-[500px] bg-primary p-5 text-secondary rounded shadow">
            <div className="flex justify-between p-2 border-b border-b-secondary/10 font-medium">
              <span>Subtotal</span>
              <span>Rs. {subtotal}</span>
            </div>
            <div className="flex justify-between p-2 border-b border-b-secondary/10">
              <span>Shipping Charges</span>
              <span>Rs. {shippingCharges}</span>
            </div>
            <div className="flex justify-between p-2 border-b border-b-secondary/10 font-medium">
              <span>Tax</span>
              <span>Rs. {tax}</span>
            </div>
            <div className="flex justify-between p-2  border-b border-b-secondary/10 font-bold text-lg">
              <span>Total</span>
              <span>Rs. {total}</span>
            </div>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              sx={{ marginTop: "20px" }}
              onClick={placeOrderHandler}
              endIcon={<AiOutlineSend />}
            >
              Place Order
            </Button>
          </div>
        </>
      ) : (
        <div className="text-4xl text-primary h-[650px] w-full flex flex-col items-center justify-center">
          <MdDeleteForever size={100} />
          <p className="text-2xl flex items-center gap-2">
            No Items in Cart <FaRegFaceSadTear />
          </p>
        </div>
      )}
    </div>
  );
};

export default Cart;
