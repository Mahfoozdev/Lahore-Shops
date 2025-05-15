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
import {
  FaHome,
  FaCity,
  FaMapMarkedAlt,
  FaGlobe,
  FaPhoneAlt,
} from "react-icons/fa";
import pakistan from "../assets/pakistan.png";
import "../styles/search.css";
import { MdDeliveryDining } from "react-icons/md";
import { FaAngleDown } from "react-icons/fa6";

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

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  const fields: {
    label: string;
    name: keyof ShippingInfo;
    icon: JSX.Element;
  }[] = [
    {
      label: "Address",
      name: "address",
      icon: <FaHome className="text-primary" />,
    },
    { label: "City", name: "city", icon: <FaCity className="text-primary" /> },
    {
      label: "State",
      name: "state",
      icon: <FaMapMarkedAlt className="text-primary" />,
    },
    {
      label: "Country",
      name: "country",
      icon: <FaGlobe className="text-primary" />,
    },
    {
      label: "Phone Number",
      name: "pinCode",
      icon: <img src={pakistan} alt="" className="h-4 w-5 object-contain" />,
    },
  ];

  return (
    <div className=" w-full flex justify-center pt-10">
      <div className="flex flex-col shadow-xl p-10 w-[30%] justify-center items-center">
        <h2 className="text-xl text-primary font-bold">Shipping Information</h2>
        <form className="pt-5 flex flex-col gap-5 w-full">
          {fields.map(({ label, name, icon }) => (
            <div key={name} className="flex flex-col w-full">
              <label className="font-semibold mb-1">{label}</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  {icon}
                </span>
                <input
                  type={name === "pinCode" ? "number" : "text"}
                  name={name}
                  value={shippingInfo[name]}
                  onChange={handleInputChange}
                  className="outline-0 w-full pl-10  border border-[rgba(0,0,0,0.1)] input-field px-3 py-2"
                  required
                />
              </div>
            </div>
          ))}

          <div className="flex flex-col gap-3 pb-5">
            <label className="font-semibold text-xl">Payment Method</label>
            <div className="relative">
              <div
                className="bg-[whitesmoke] border border-[rgba(0,0,0,0.2)] px-5 py-3 cursor-pointer font-semibold"
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
                  <div className="px-4  hover:bg-gray-100 flex items-center gap-2 cursor-pointer">
                    <MdDeliveryDining /> Cash on Delivery{" "}
                    <FaAngleDown className="text-primary" />
                  </div>
                )}
              </div>
              {dropdownOpen && (
                <div className="absolute z-10 bg-white border border-[rgba(0,0,0,0.2)] mt-1 w-full">
                  <div
                    onClick={() => {
                      setPaymentMethod("cashOnDelivery");
                      setDropdownOpen(false);
                    }}
                    className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
                  >
                    <MdDeliveryDining /> Cash on Delivery
                  </div>
                  <div
                    onClick={() => {
                      setPaymentMethod("online");
                      setDropdownOpen(false);
                    }}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
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
            className="bg-primary text-white font-semibold text-xl p-5 cursor-pointer hover:bg-primary/80"
          >
            {paymentMethod === "online" ? "Pay & Place Order" : "Place Order"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Shipping;
