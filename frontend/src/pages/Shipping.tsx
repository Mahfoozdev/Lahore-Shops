import { useNavigate } from "react-router-dom";
import { JSX, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNewOrderMutation } from "../redux/api/orderApi";
import {
  CartReducerInitialState,
  UserReducerInitialState,
} from "../types/reducer-types";
import { ShippingInfo } from "../types/types";
import { NewOrderRequest } from "../types/api-types";
import jazzCashLogo from "../assets/jazzcash.webp";
import { FaHome, FaCity, FaMapMarkedAlt, FaGlobe } from "react-icons/fa";
import pakistan from "../assets/pakistan.png";
import "../styles/search.css";
import { MdDeliveryDining } from "react-icons/md";
import { FaAngleDown } from "react-icons/fa6";
import { server } from "../redux/store";
import { toast } from "react-toastify";

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

  const [newOrder] = useNewOrderMutation();
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
      toast.success(orderRes.message);
      navigate("/orders");
      window.location.reload();
    } catch (error) {
      console.error("Order placement failed:", error);
      toast.error("Order failed. Please try again.");
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
        const res = await fetch(`${server}/api/v1/payment/checkout`, {
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
        });

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

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  const fields: {
    label: string;
    name: keyof ShippingInfo;
    icon: JSX.Element;
  }[] = [
    {
      label: "Address",
      name: "address",
      icon: <FaHome className="text-secondary" />,
    },
    {
      label: "City",
      name: "city",
      icon: <FaCity className="text-secondary" />,
    },
    {
      label: "State",
      name: "state",
      icon: <FaMapMarkedAlt className="text-secondary" />,
    },
    {
      label: "Country",
      name: "country",
      icon: <FaGlobe className="text-secondary" />,
    },
    {
      label: "Phone Number",
      name: "pinCode",
      icon: <img src={pakistan} alt="" className="h-4 w-5 object-contain" />,
    },
  ];

  return (
    <div className=" w-full flex justify-center pt-10">
      <div className="flex flex-col  p-10 bg-primary w-[90%] md:w-[50%] justify-center items-center">
        <h2 className="text-xl text-secondary font-bold">
          Shipping Information
        </h2>
        <form className="pt-5 flex flex-col gap-5 w-full">
          {fields.map(({ label, name, icon }) => (
            <div key={name} className="flex flex-col w-full text-secondary">
              <label className="font-semibold mb-1">{label}</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 ">
                  {icon}
                </span>
                <input
                  type={name === "pinCode" ? "number" : "text"}
                  name={name}
                  value={shippingInfo[name]}
                  onChange={handleInputChange}
                  className="outline-0 w-full pl-10  border border-secondary/20 input-field px-3 py-2"
                  required
                />
              </div>
            </div>
          ))}

          <div className="flex flex-col gap-3 pb-5">
            <label className="font-semibold text-xl">Payment Method</label>
            <div className="relative">
              <div
                className="bg-secondary border border-[rgba(0,0,0,0.2)] px-5 py-3 cursor-pointer font-semibold"
                onClick={toggleDropdown}
              >
                {paymentMethod === "online" ? (
                  <div className="flex items-center gap-2">
                    <img
                      src={jazzCashLogo}
                      alt="JazzCash"
                      className="h-6 w-6 object-contain"
                    />
                    Pay With JazzCash
                    <FaAngleDown className="text-primary" />
                  </div>
                ) : (
                  <div className="px-4   flex items-center gap-2 cursor-pointer">
                    <MdDeliveryDining /> Cash on Delivery{" "}
                    <FaAngleDown className="text-primary" />
                  </div>
                )}
              </div>
              {dropdownOpen && (
                <div className="absolute z-10 bg-secondary border border-[rgba(0,0,0,0.2)] mt-1 w-full">
                  <div
                    onClick={() => {
                      setPaymentMethod("cashOnDelivery");
                      setDropdownOpen(false);
                    }}
                    className="px-4 py-2 hover:bg-primary/10 flex items-center gap-2 cursor-pointer"
                  >
                    <MdDeliveryDining /> Cash on Delivery
                  </div>
                  <div
                    onClick={() => {
                      setPaymentMethod("online");
                      setDropdownOpen(false);
                    }}
                    className="px-4 py-2 hover:bg-primary/10 cursor-pointer flex items-center gap-2"
                  >
                    <img
                      src={jazzCashLogo}
                      alt="JazzCash"
                      className="h-5 w-5 object-contain"
                    />
                    Pay With JazzCash
                  </div>
                </div>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={handleOrder}
            className="bg-secondary text-primary font-semibold text-xl p-5 cursor-pointer hover:bg-secondary/80"
          >
            {paymentMethod === "online" ? "Pay & Place Order" : "Place Order"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Shipping;
