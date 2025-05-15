import { ReactElement, useEffect, useState } from "react";
import TableHOC from "../../components/TableHOC";
import { TableColumn } from "react-data-table-component";
import { useAllProductsQuery } from "../../redux/api/productAPI";
import { Link, Links } from "react-router-dom";
import { server } from "../../redux/store";
import { CustomError } from "../../types/api-types";
import { useSelector } from "react-redux";
import { UserReducerInitialState } from "../../types/reducer-types";
import Loader from "../../components/Loader";
import { MdDriveFileMove } from "react-icons/md";
import { Button } from "@mui/material";

interface DataType {
  photo: ReactElement;
  name: string;
  category: string;
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
    name: "Category",
    selector: (row) => row.category,
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
        category: i.category,
        action: (
          <Link
            className="bg-primary rounded text-white font-bold px-3 py-1 tracking-wider hover:bg-secondary transition-all duration-200"
            to={`/admin/product/${i._id}`}
          >
            Manage
          </Link>
        ),
      }));
      setRows(mapped);
    }
  }, [data]);

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <div>
        Error: {(error as CustomError).data.message || "Something went wrong"}
      </div>
    );

  return (
    <div className="flex flex-col py-10">
      {" "}
      <Button sx={{ width: "150px" }} variant="outlined">
        <Link to="/admin/product/new-product" className="w-full">
          Create Product
        </Link>
      </Button>
      <TableHOC<DataType>
        columns={columns}
        data={rows}
        containerClassName="dashboard-product-box"
        heading="Products"
      />
    </div>
  );
};

export default Products;
