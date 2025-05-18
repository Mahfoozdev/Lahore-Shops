import { useState } from "react";
import {
  useCategoriesQuery,
  useSearchProductsQuery,
} from "../redux/api/productAPI";
import { CustomError } from "../types/api-types";
import "../styles/categories.css";
import { server } from "../redux/store";
import { useDispatch } from "react-redux";
import { CartItems } from "../types/types";
import { addToCart } from "../redux/reducer/cartReducer";
import { CiShoppingTag } from "react-icons/ci";
import { AiOutlineMenuFold } from "react-icons/ai";
import { BsCart2 } from "react-icons/bs";
import { toast } from "react-toastify";
import "../styles/search.css";
import { FaCircleArrowRight } from "react-icons/fa6";
import PaginationControlled from "../components/Pagination";
import SearchProducts from "../components/SearchProducts";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
const Search = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [maxPrice, setMaxPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const { data: categoryData } = useCategoriesQuery("");

  const {
    data: searchedData,
    isLoading: productLoading,
    isError: productIsError,
    error: productError,
  } = useSearchProductsQuery({
    search,
    sort,
    category,
    price: maxPrice,
    page,
  });
  const allProducts = searchedData?.products;
  const dispatch = useDispatch();
  const addToCartHandler = (cartItem: CartItems) => {
    if (cartItem.stock < 1) return toast.error("Out Of Stock");
    dispatch(addToCart(cartItem));

    toast.success("Item Added to Cart");
  };
  const mobileCategory = (categoryName: string) => {
    setCategory(categoryName);
    toggleDrawer(false)();
  };
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  const allCategories = "";
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation">
      <List className="bg-secondary">
        <ListItem key={`All Categories`} disablePadding>
          <ListItemButton onClick={() => mobileCategory(allCategories)}>
            <ListItemText
              primary={`All Categories`}
              primaryTypographyProps={{
                color: "primary",
                fontWeight: "bold",
              }}
              className="bg-primary/10  p-2"
            />
          </ListItemButton>
        </ListItem>
        {categoryData?.categories.map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => mobileCategory(text)}>
              <ListItemText
                primary={text.toUpperCase()}
                primaryTypographyProps={{
                  color: "primary",
                  fontWeight: "bold",
                }}
                className="bg-primary/10 hover: p-2"
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );
  return (
    <div className="w-full flex justify-center mt-10 mb-20">
      <main className="md:w-[95%] w-[96%] flex gap-5 justify-center">
        <div className="w-[250px] hidden lg:block">
          <div className="bg-primary flex justify-between items-center p-5 text-secondary font-bold w-[250px]">
            <h2 className=""> Browse Categories</h2>
            <span className="text-xl">
              <AiOutlineMenuFold />
            </span>
          </div>
          <button
            onClick={() => setCategory("")}
            className="bg-primary/10  w-full text-primary text-start font-medium py-2 px-4 rounded transition-all duration-300 cursor-pointer"
          >
            All Categories
          </button>
          {categoryData?.categories.map((c: string) => (
            <button
              key={c}
              value={c}
              onClick={(e) => setCategory(e.currentTarget.value)}
              className="bg-primary/10 w-full flex items-center gap-2 text-primary text-start font-medium py-2 px-4 rounded transition-all duration-300 cursor-pointer myCategories"
            >
              <span className="transition-all duration-300">
                <FaCircleArrowRight />
              </span>{" "}
              {c.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="">
          <div className="flex flex-col gap-5">
            <div className="lg:hidden ">
              <Button variant="outlined" onClick={toggleDrawer(true)}>
                Browse Category
              </Button>
              <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
              </Drawer>
            </div>

            <p className="font-semibold bg-primary text-secondary p-5">
              Max Price: Rs.{maxPrice}
            </p>
            <input
              type="range"
              min={0}
              max={10000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full cursor-pointer accent-primary"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-7">
            <div>
              <SearchProducts
                allProducts={allProducts!}
                search={search}
                mySearch={setSearch}
              />
            </div>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border-[1px] border-[rgba(0,0,0,0.3)] rounded px-3 py-2 input-field outline-0 text-primary"
            >
              <option value="" className="text-primary">
                Sort By
              </option>
              <option value="asc">Price: Low → High</option>
              <option value="desc">Price: High → Low</option>
            </select>
          </div>

          {productLoading ? (
            <p>Loading products...</p>
          ) : productIsError ? (
            <p>Error: {(productError as CustomError)?.data.message}</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-5 mb-14">
              {searchedData?.products?.map((product: any) => (
                <Link
                  to={`/product/${product._id}`}
                  key={product._id}
                  className=" border-[rgba(0,0,0,0.1)] border-[1px] shadow-2xl  p-3 flex flex-col   items-center"
                >
                  <main className="flex items-center justify-between w-full pb-5 pt-2">
                    <div className="flex items-center gap-2">
                      <span>
                        <CiShoppingTag />
                      </span>
                      <p className="uppercase text-[10px] lg:text-[13px]">
                        {" "}
                        {product.category}
                      </p>
                    </div>
                    <div
                      className={`${
                        product.stock > 0 ? "bg-primary" : "bg-red-500"
                      } w-fit p-1 rounded text-secondary font-semibold text-[9px] lg:text-sm tracking-wider`}
                    >
                      {product.stock > 0 ? "INSTOCK" : "OUTOFSTOCK"}
                    </div>
                  </main>

                  <img
                    src={`${server}/${product.photo}`}
                    alt={product.name}
                    className="lg:h-92 h-64 w-96 object-cover "
                  />
                  <h3 className="lg:text-2xl text-xl font-semibold py-2">
                    {product.name}
                  </h3>
                  <div className="flex justify-between w-full items-center">
                    <div>
                      <p className="line-through text-red-500 lg:text-[16px] text-[13px]">
                        {Math.round(product.price * 1.1)}
                      </p>
                      <p className="">
                        Rs.{" "}
                        <span className="italic font-semibold lg:text-xl ">
                          {product.price}
                        </span>
                      </p>
                    </div>
                    <button
                      className="bg-primary p-3 cursor-pointer transition-all duration-200 hover:bg-primary/80 text-secondary font-semibold rounded-full"
                      onClick={() =>
                        addToCartHandler({
                          productId: product._id,
                          photo: product.photo,
                          name: product.name,
                          price: product.price,
                          quantity: 1,
                          stock: product.stock,
                        })
                      }
                    >
                      <BsCart2 className="text-xl" />
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="w-full flex justify-end">
            <PaginationControlled
              totalPage={searchedData?.totalPage!}
              page={page}
              setPage={setPage}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Search;
