import { ReactElement, useCallback, useEffect, useState } from "react";
import TableHOC from "../../components/TableHOC";
import { TableColumn } from "react-data-table-component";
import { useAllProductsQuery } from "../../redux/api/productAPI";
import { Link } from "react-router-dom";
import { server } from "../../redux/store";
import { CustomError } from "../../types/api-types";
import { useSelector } from "react-redux";
import { UserReducerInitialState } from "../../types/reducer-types";
import Loader from "../../components/Loader";

interface DataType {
  photo: ReactElement;
  name: string;
  price: number;
  stock: number;
  action: ReactElement;
}

const columns: TableColumn<DataType>[] = [
  {
    name: "Photo",
    cell: (row) => row.photo,
  },
  {
    name: "Name",
    selector: (row) => row.name,
  },
  {
    name: "Stock",
    selector: (row) => row.stock,
  },
  {
    name: "Price",
    selector: (row) => row.price,
  },
  {
    name: "Action",
    cell: (row) => row.action,
  },
];

const Products = () => {
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );
  const { data, isLoading, isError, error } = useAllProductsQuery(user?._id!);
  const [rows, setRows] = useState<DataType[]>([]);

  useEffect(() => {
    if (data) {
      const mapped: DataType[] = data.products.map((i: any) => ({
        photo: (
          <img
            className="object-contain h-1/2"
            src={`${server}/${i.photo}`}
            alt={i.name}
            height="50"
          />
        ),
        name: i.name,
        stock: i.stock,
        price: i.price,
        action: (
          <Link
            className="bg-primary rounded text-white font-bold px-3 py-1 tracking-wider"
            to={`/admin/product/${i._id}`}
          >
            Manage
          </Link>
        ),
      }));
      setRows(mapped);
    }
  }, [data]);

  const Table = useCallback(
    () =>
      TableHOC<DataType>(columns, rows, "dashboard-product-box", "Products"),
    [rows]
  );

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <p>
        Error: {(error as CustomError).data.message || "Something went wrong"}
      </p>
    );

  return <div>{Table()}</div>;
};

export default Products;
