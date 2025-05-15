import { CartItems } from "../types/types";
import { server } from "../redux/store";
import { Button, Chip } from "@mui/material";
import { MdDeleteForever } from "react-icons/md";
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
      <main className="flex gap-10  items-center bg-primary/6 p-5">
        <img
          src={`${server}/${photo}`}
          alt=""
          height={100}
          width={100}
          className="rounded-3xl"
        />
        <div className="flex gap-20 flex-wrap">
          <h3 className="text-xl font-semibold">{name}</h3>
          <div className="flex flex-col gap-5 items-center">
            <p className="text-xl font-semibold">Price</p>
            <p className="text-primary"> Rs. {price}</p>
          </div>
          <div className="flex flex-col gap-5 items-center">
            <p className="text-xl font-semibold">Quantity</p>
            <div className="flex items-center gap-3">
              <Button
                onClick={() => decrementHandler(cartItem)}
                variant="contained"
                color="primary"
              >
                -
              </Button>
              <p className="bg-[whitesmoke] w-9 h-9 flex justify-center items-center shadow-xl rounded-full text-primary font-bold">
                {quantity}
              </p>
              <Button
                variant="contained"
                color="primary"
                onClick={() => incrementHandler(cartItem)}
              >
                +
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-5 items-center">
            <p className="text-xl font-semibold">Total</p>
            <p className="text-primary"> Rs. {price * quantity}</p>
          </div>
          <div>
            <Chip
              label="Remove"
              color="primary"
              deleteIcon={<MdDeleteForever />}
              onDelete={() => removeHandler(productId)}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default CartItem;
