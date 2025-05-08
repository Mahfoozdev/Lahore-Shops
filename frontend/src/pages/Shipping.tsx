import { useSelector } from "react-redux";
import { CartReducerInitialState } from "../types/reducer-types";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Shipping = () => {
  const navigate = useNavigate();
  const { cartItems } = useSelector(
    (state: { cartReducer: CartReducerInitialState }) => state.cartReducer
  );
  useEffect(() => {
    if (cartItems.length <= 0) {
      navigate("/cart");
    }
  }, [cartItems]);

  return <div>Shipping</div>;
};

export default Shipping;
