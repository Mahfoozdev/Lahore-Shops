import { useDispatch, useSelector } from "react-redux";
import {
  CartReducerInitialState,
  UserReducerInitialState,
} from "../types/reducer-types";
import { MdRemoveShoppingCart } from "react-icons/md";
import CartItem from "../components/CartItem";
import {
  addToCart,
  calculatePrice,
  removeCartItem,
} from "../redux/reducer/cartReducer";
import { CartItems } from "../types/types";
import { AiOutlineSend } from "react-icons/ai";
import { FaFaceSadTear } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
    try {
      dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity + 1 }));
      dispatch(calculatePrice()); // <- ADD THIS
    } catch (err) {
      console.log(err);
    }
  };

  const decreaseHandler = (cartItem: CartItems) => {
    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity - 1 }));
    dispatch(calculatePrice()); // <- ADD THIS
  };

  const removingHandler = (productId: string) => {
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
    <div className="w-full flex justify-center pt-10 pb-32">
      <div className="w-[90%] gap-20 grid grid-cols-1 xl:grid-cols-3">
        <main className="xl:col-span-2">
          {cartItems.length > 0 ? (
            cartItems.map((item, idx) => (
              <CartItem
                key={idx}
                incrementHandler={increaseHandler}
                decrementHandler={decreaseHandler}
                removeHandler={removingHandler}
                cartItem={item}
              />
            ))
          ) : (
            <div className="text-7xl text-primary h-full w-full flex flex-col items-center justify-center">
              <MdRemoveShoppingCart />
              <h1 className="flex gap-3 text-xl items-center">
                No Items Added Yet{" "}
                <span>
                  <FaFaceSadTear />
                </span>
              </h1>
            </div>
          )}
        </main>
        <main>
          <aside
            style={{
              marginTop: "20px",
            }}
            className="bg-[whitesmoke] flex justify-center flex-col items-center gap-10 p-5"
          >
            <div className="flex justify-between w-full border-b-[1px] border-white bg-primary text-white p-5 ">
              <p className="font-comfort">Subtotal</p>
              <p>Rs. {subtotal}</p>
            </div>
            {subtotal > 0 && (
              <div className="flex justify-between w-full border-b-[1px] border-white bg-white  border-t-[1px]  p-5 ">
                <p className="font-comfort">Shipping Charges</p>
                <p>Rs. {shippingCharges}</p>
              </div>
            )}
            <div className="flex justify-between w-full border-b-[1px] border-white bg-primary text-white p-5 ">
              <p className="font-comfort">Tax</p>
              <p>Rs. {tax}</p>
            </div>

            <div className="flex justify-between w-full border-b-[1px]  border-t-[1px] bg-white border-white  p-5 ">
              <p className="font-comfort">Discount</p>
              <p>Rs. {discount}</p>
            </div>

            {subtotal > 0 && (
              <div className="flex justify-between w-full border-b-[1px] text-xl font-bold border-white bg-primary text-white p-5 ">
                <p className="font-comfort">Total</p>
                <p>Rs. {total}</p>
              </div>
            )}
            <button
              className="bg-primary  rounded py-3 w-full text-center hover:bg-primary/80 transition-all duration-200 text-white flex justify-center items-center gap-3"
              onClick={placeOrderHandler}
            >
              {" "}
              Place Order <AiOutlineSend />
            </button>
          </aside>
        </main>
      </div>
    </div>
  );
};

export default Cart;
