import { ReactElement, useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { useAllOrdersQuery } from "../../redux/api/orderApi";
import { UserReducerInitialState } from "../../types/reducer-types";
import { Link } from "react-router-dom";
import { TableColumn } from "react-data-table-component";
import TableHOC from "../../components/TableHOC";
import Loader from "../../components/Loader";

interface DataType {
  user: string;
  amount: number;
  discount: number;
  quantity: number;
  status: ReactElement;
  action: ReactElement;
}

const columns: TableColumn<DataType>[] = [
  {
    name: "User",
    selector: (row) => row.user,
  },
  {
    name: "Amount",
    selector: (row) => row.amount,
  },
  {
    name: "Discount",
    selector: (row) => row.discount,
  },
  {
    name: "Quantity",
    selector: (row) => row.quantity,
  },
  {
    name: "Status",
    cell: (row) => row.status,
  },
  {
    name: "Action",
    cell: (row) => row.action,
  },
];

const Transaction = () => {
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );

  const { data, isLoading, isError, error } = useAllOrdersQuery(user?._id!);
  const [rows, setRows] = useState<DataType[]>([]);

  useEffect(() => {
    if (data) {
      const mapped: DataType[] = data.orders.map((i: any) => ({
        user: i.user.name,
        amount: i.total,
        discount: i.discount,
        quantity: i.orderItems.length,
        status: (
          <p
            className={`font-semibold ${
              i.status === "Processing"
                ? "text-yellow-500"
                : i.status === "Delivered"
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            {i.status}
          </p>
        ),
        action: (
          <Link
            className="bg-primary rounded text-white font-bold px-3 py-1 tracking-wider hover:bg-secondary transition-all duration-200"
            to={`/admin/order/${i._id}`}
          >
            Manage
          </Link>
        ),
      }));
      setRows(mapped);
    }
  }, [data]);

  const Table = useCallback(
    () => (
      <TableHOC<DataType>
        columns={columns}
        data={rows}
        containerClassName="dashboard-order-box"
        heading="Orders"
      />
    ),
    [rows]
  );

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <div className="text-red-500 text-center mt-4">
        Error: {(error as any)?.data?.message || "Failed to load orders"}
      </div>
    );

  return <div>{Table()}</div>;
};

export default Transaction;
