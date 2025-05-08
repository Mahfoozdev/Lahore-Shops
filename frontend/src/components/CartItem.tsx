import { CartItems } from "../types/types";
import { server } from "../redux/store";

interface CartItemProps {
  cartItem: CartItems;
  incrementHandler: (cartItem: CartItems) => void;
  decrementHandler: (cartItem: CartItems) => void;
  removeHandler: (id: string) => void;
}

const CartItem = ({
  cartItem,
  incrementHandler,
  decrementHandler,
  removeHandler,
}: CartItemProps) => {
  const { photo, productId, name, price, quantity } = cartItem;

  return (
    <div
      style={{
        border: "1px solid #ccc",
        marginBottom: "10px",
        padding: "10px",
      }}
    >
      <h3>{name}</h3>
      <img src={`${server}/${photo}`} alt="" height={100} width={100} />
      <p>Price: Rs. {price}</p>
      <p>Quantity: {quantity}</p>
      <p>Total: Rs. {price * quantity}</p>
      <div>
        <button onClick={() => decrementHandler(cartItem)}>-</button>
        <button onClick={() => incrementHandler(cartItem)}>+</button>

        <button onClick={() => removeHandler(productId)}>Remove Item</button>
      </div>
    </div>
  );
};

export default CartItem;
