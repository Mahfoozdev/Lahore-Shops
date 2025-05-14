import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNewOrderMutation } from "../redux/api/orderApi";
import {
  CartReducerInitialState,
  UserReducerInitialState,
} from "../types/reducer-types";
import { ShippingInfo } from "../types/types";
import { NewOrderRequest } from "../types/api-types";
import jazzCashLogo from "../assets/jazzcash.webp";
import "../styles/search.css";

const Shipping = () => {
  const navigate = useNavigate();

  const { cartItems, subtotal, discount, tax, total, shippingCharges } =
    useSelector(
      (state: { cartReducer: CartReducerInitialState }) => state.cartReducer
    );
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );

  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState<
    "cashOnDelivery" | "online"
  >("cashOnDelivery");

  const [newOrder, { isLoading }] = useNewOrderMutation();

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/cart");
    }
  }, [cartItems, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const placeOrder = async (paymentStatus: "cashOnDelivery" | "onlinePaid") => {
    const orderPayload: NewOrderRequest = {
      shippingInfo,
      orderItems: cartItems.map(({ stock, ...item }) => item),
      subtotal,
      tax,
      shippingCharges,
      discount,
      total,
      user: user?._id!,
      paymentStatus,
      status: "Processing",
    };

    try {
      console.log("Placing order with payload:", orderPayload);
      const orderRes = await newOrder(orderPayload).unwrap();
      alert(orderRes.message);
      navigate("/orders");
    } catch (error) {
      console.error("Order placement failed:", error);
      alert("Order failed. Please try again.");
    }
  };

  const handleOrder = async () => {
    const areAllFieldsFilled = Object.values(shippingInfo).every(
      (val) => val.toString().trim() !== ""
    );

    if (!areAllFieldsFilled) {
      alert("Please fill all shipping fields before placing the order.");
      return;
    }

    if (!user?._id) {
      alert("User not logged in or ID missing.");
      return;
    }

    if (cartItems.length === 0) {
      alert("Cart is empty.");
      return;
    }

    if (paymentMethod === "cashOnDelivery") {
      await placeOrder("cashOnDelivery");
    } else {
      try {
        const res = await fetch(
          "http://localhost:4000/api/v1/payment/checkout",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              amount: total,
              orderData: {
                shippingInfo,
                orderItems: cartItems.map(({ stock, ...item }) => item),
                subtotal,
                tax,
                shippingCharges,
                discount,
                total,
                user: user?._id,
                paymentStatus: "onlinePaid",
              },
            }),
          }
        );

        if (!res.ok) throw new Error("Failed to initiate payment");

        const { postUrl, payload } = await res.json();

        const form = document.createElement("form");
        form.method = "POST";
        form.action = postUrl;
        form.style.display = "none";
        form.target = "_self";

        Object.entries(payload).forEach(([key, value]) => {
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = key;
          input.value = String(value);
          form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();
      } catch (error) {
        console.error("Payment initiation failed:", error);
        alert("Payment initiation failed. Please try again.");
      }
    }
  };
  const fields: { label: string; name: keyof ShippingInfo }[] = [
    { label: "Address", name: "address" },
    { label: "City", name: "city" },
    { label: "State", name: "state" },
    { label: "Country", name: "country" },
    { label: "Phone Number", name: "pinCode" }, // was incorrectly labeled "Phone Number"
  ];

  return (
    <div className=" w-full flex justify-center">
      <div className="flex flex-col shadow-xl p-10 w-[30%] justify-center items-center">
        <h2 className="text-xl text-primary font-bold">Shipping Information</h2>
        <form className="pt-5 flex flex-col gap-5 w-full">
          {fields.map(({ label, name }) => (
            <div key={name} className="flex flex-col w-full">
              <label className="font-semibold">{label}</label>
              <input
                type={name === "pinCode" ? "number" : "text"}
                name={name}
                value={shippingInfo[name]}
                onChange={handleInputChange}
                className="outline-0 w-full rounded border border-[rgba(0,0,0,0.5)] input-field px-3 py-2"
                required
              />
            </div>
          ))}
          <div className="flex flex-col gap-5 pb-5">
            <label className="font-semibold text-xl">Payment Method</label>
            <select
              value={paymentMethod}
              onChange={(e) =>
                setPaymentMethod(e.target.value as "cashOnDelivery" | "online")
              }
              className="bg-primary/90 text-white p-5 font-semibold tracking-wider"
            >
              <option value="cashOnDelivery">Cash on Delivery</option>
              <option value="online">
                JazzCash Payment{" "}
                <img
                  src={jazzCashLogo}
                  alt=""
                  className="h-32 w-32 object-contain"
                />{" "}
              </option>
            </select>
          </div>

          <button
            type="button"
            onClick={handleOrder}
            className="bg-primary text-white font-semibold text-xl p-5 rounded-xl hover:bg-primary/80"
          >
            {paymentMethod === "online" ? "Pay & Place Order" : "Place Order"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Shipping;
