import { useSelector } from "react-redux";
import {
  useDeleteOrderMutation,
  useOrderDetailsQuery,
  useUpdateOrderMutation,
} from "../../redux/api/orderApi";
import { UserReducerInitialState } from "../../types/reducer-types";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import { server } from "../../redux/store";

// const defaultData = {
//   shippingInfo: {
//     address: "",
//     city: "",
//     state: "",
//     country: "",
//     pinCode: "",
//   },
//   status: "Processing",
//   subtotal: 0,
//   discount: 0,
//   shippingCharges: 0,
//   tax: 0,
//   total: 0,
//   orderItems: [] as any[],
//   user: { name: "", _id: "" },
//   _id: "",
// };

const OrderManagement = () => {
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );

  const params = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useOrderDetailsQuery(params.id!);
  const {
    shippingInfo: { address, city, state, country, pinCode },
    orderItems,
    user: { name },
    status,
    tax,
    total,
    subtotal,
    discount,
  } = data?.order!;

  const [updateOrder] = useUpdateOrderMutation();
  const [deleteOrder] = useDeleteOrderMutation();

  const updateHandler = async () => {
    await updateOrder({
      userId: user?._id!,
      orderId: data?.order._id!,
    });
    navigate("/admin/orders");
  };

  const deleteHandler = async () => {
    await deleteOrder({
      userId: user?._id!,
      orderId: data?.order._id!,
    });
    navigate("/admin/orders");
  };

  if (isLoading) return <Loader />;
  if (isError) return <Navigate to="/404" />;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Order Management</h1>

      <div className="mb-4">
        <h2 className="text-lg font-semibold">Customer: {name}</h2>
        <p>
          Status: <span className="font-medium">{status}</span>
        </p>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-semibold">Shipping Info</h2>
        <p>
          {address}, {city}, {state}, {country} - {pinCode}
        </p>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-semibold">Order Summary</h2>
        <p>Subtotal: ${subtotal}</p>
        <p>Discount: ${discount}</p>
        <p>Tax: ${tax}</p>
        <p>Total: ${total}</p>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-semibold">Items</h2>
        <ul className="list-disc ml-6">
          {orderItems.map((item, index) => (
            <li key={index}>
              {item.name} - Quantity: {item.quantity}
              <br />
              <strong>Photo</strong>
              <img src={`${server}/${item.photo}`} alt="" />
            </li>
          ))}
        </ul>
      </div>

      <div className="flex gap-4 mt-6">
        <button
          onClick={updateHandler}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/80 transition-all duration-300"
        >
          pProcess Status
        </button>
        <button
          onClick={deleteHandler}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Delete Order
        </button>
      </div>
    </div>
  );
};

export default OrderManagement;
