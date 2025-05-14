import { CartItems } from "../types/types";
import { server } from "../redux/store";
import { RxCross2 } from "react-icons/rx";

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
        borderBottom: "1px solid rgba(0,0,0,0.2)",
        marginBottom: "10px",
        padding: "10px",
      }}
      className=""
    >
      <main className="flex gap-10 items-center">
        <img
          src={`${server}/${photo}`}
          alt=""
          height={100}
          width={100}
          className="rounded-3xl"
        />
        <div className="flex gap-20">
          <h3 className="text-xl font-semibold">{name}</h3>
          <div className="flex flex-col gap-5 items-center">
            <p className="text-xl font-semibold">Price</p>
            <p className="text-primary"> Rs. {price}</p>
          </div>
          <p className="font-light">|</p>
          <div className="flex flex-col gap-5 items-center">
            <p className="text-xl font-semibold">Quantity</p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => decrementHandler(cartItem)}
                className="h-6 w-6 rounded-full text-white bg-primary cursor-pointer"
              >
                -
              </button>
              <p>{quantity}</p>
              <button
                onClick={() => incrementHandler(cartItem)}
                className="h-6 w-6 rounded-full text-white bg-primary cursor-pointer"
              >
                +
              </button>
            </div>
          </div>
          <p className="font-light">|</p>
          <div className="flex flex-col gap-5 items-center">
            <p className="text-xl font-semibold">Total</p>
            <p className="text-primary"> Rs. {price * quantity}</p>
          </div>
          <div>
            <button
              onClick={() => removeHandler(productId)}
              className="flex flex-col items-center justify-center gap-2 cursor-pointer"
            >
              <span className="bg-primary rounded-full p-2 text-white">
                <RxCross2 />
              </span>
              Remove Item
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CartItem;
