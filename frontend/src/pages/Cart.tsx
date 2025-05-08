import { useDispatch, useSelector } from "react-redux";
import { CartReducerInitialState } from "../types/reducer-types";
import CartItem from "../components/CartItem";
import { addToCart, removeCartItem } from "../redux/reducer/cartReducer";
import { CartItems } from "../types/types";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItems, subtotal, discount, tax, total, shippingCharges } =
    useSelector(
      (state: { cartReducer: CartReducerInitialState }) => state.cartReducer
    );
  const dispatch = useDispatch();
  const increaseHandler = (cartItem: CartItems) => {
    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity + 1 }));
  };
  const decreaseHandler = (cartItem: CartItems) => {
    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity - 1 }));
  };
  const removingHandler = (productId: string) => {
    dispatch(removeCartItem(productId));
  };
  return (
    <div>
      <main>
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
          <h1>No item added</h1>
        )}

        <aside
          style={{
            marginTop: "20px",
            padding: "10px",
            borderTop: "1px solid #eee",
          }}
        >
          <p>Subtotal: Rs. {subtotal}</p>
          <p>Shipping Charges: Rs. {shippingCharges}</p>
          <p>Tax: Rs. {tax}</p>
          <p>Discount: Rs. {discount}</p>
          <h3>Total: Rs. {total}</h3>
        </aside>
        <Link
          className="bg-primary px-3 py-1 rounded text-white"
          to="/shipping"
        >
          {" "}
          Place Order
        </Link>
      </main>
    </div>
  );
};

export default Cart;
