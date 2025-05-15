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

const Cart = () => {
  const { cartItems, subtotal, discount, tax, total, shippingCharges } =
    useSelector(
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
          <TableContainer component={Paper} sx={{ maxWidth: 1200 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartItems.map((item) => (
                  <TableRow key={item.productId}>
                    <TableCell>
                      <img
                        src={`${server}/${item.photo}`}
                        alt={item.name}
                        height={60}
                        width={60}
                        style={{ borderRadius: "10px" }}
                      />
                    </TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>Rs. {item.price}</TableCell>
                    <TableCell>
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
                    <TableCell>Rs. {item.price * item.quantity}</TableCell>
                    <TableCell>
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
          <div className="mt-5 w-full max-w-[500px] bg-[whitesmoke] p-5 rounded shadow">
            <div className="flex justify-between p-2 border-b border-b-[rgba(0,0,0,0.1)] font-medium">
              <span>Subtotal</span>
              <span>Rs. {subtotal}</span>
            </div>
            <div className="flex justify-between p-2 border-b border-b-[rgba(0,0,0,0.1)]">
              <span>Shipping Charges</span>
              <span>Rs. {shippingCharges}</span>
            </div>
            <div className="flex justify-between p-2 border-b border-b-[rgba(0,0,0,0.1)] font-medium">
              <span>Tax</span>
              <span>Rs. {tax}</span>
            </div>
            <div className="flex justify-between p-2  border-b border-b-[rgba(0,0,0,0.1)] font-bold text-lg">
              <span>Total</span>
              <span>Rs. {total}</span>
            </div>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ marginTop: "20px" }}
              onClick={placeOrderHandler}
              endIcon={<AiOutlineSend />}
            >
              Place Order
            </Button>
          </div>
        </>
      ) : (
        <div className="text-4xl text-primary h-full w-full flex flex-col items-center justify-center">
          <MdDeleteForever size={100} />
          <p>No Items in Cart</p>
        </div>
      )}
    </div>
  );
};

export default Cart;
