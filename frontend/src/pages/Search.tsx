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
import { CiSearch, CiShoppingTag } from "react-icons/ci";
import { AiOutlineMenuFold } from "react-icons/ai";
import { BsCart2 } from "react-icons/bs";
import { toast } from "react-toastify";
import "../styles/search.css";
import { FaCircleArrowRight } from "react-icons/fa6";
const Search = () => {
  const { data: categoryData } = useCategoriesQuery("");

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [maxPrice, setMaxPrice] = useState(10000);
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);

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

  const dispatch = useDispatch();
  const addToCartHandler = (cartItem: CartItems) => {
    if (cartItem.stock < 1) return toast.error("Out Of Stock");
    dispatch(addToCart(cartItem));

    toast.success("Item Added to Cart");
  };

  const isPrevPage = page > 1;
  const isNextPage = page < searchedData?.totalPage!; // You might want to use `searchedData.totalPages` dynamically

  return (
    <div className="w-full flex justify-center mt-10">
      <main className="w-[90%] flex ">
        <div className="w-[250px]">
          <div className="bg-primary flex justify-between items-center p-5 text-white w-[250px]">
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

        <div className="p-4 max-w-4xl  mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="w-full relative">
              <input
                type="text"
                placeholder="Search for Products here ..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border-[1px] w-full border-[rgba(0,0,0,0.3)] input-field outline-0 px-3 py-2 "
              />
              <div className="absolute top-4 right-3">
                {" "}
                <CiSearch />
              </div>
            </div>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border-[1px] border-[rgba(0,0,0,0.3)] px-3 py-2 input-field outline-0 text-[rgba(0,0,0,0.7)]"
            >
              <option value="">Sort By</option>
              <option value="asc">Price: Low → High</option>
              <option value="desc">Price: High → Low</option>
            </select>
          </div>

          {productLoading ? (
            <p>Loading products...</p>
          ) : productIsError ? (
            <p>Error: {(productError as CustomError)?.data.message}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-24">
              {searchedData?.products?.map((product: any) => (
                <div
                  key={product._id}
                  className=" border-[rgba(0,0,0,0.1)] border-[1px] rounded-2xl p-3 flex flex-col   items-center"
                >
                  <main className="flex items-center justify-between w-full pb-5 pt-2">
                    <div className="flex items-center gap-2">
                      <span>
                        <CiShoppingTag />
                      </span>
                      <p className="uppercase"> {product.category}</p>
                    </div>
                    <div
                      className={`${
                        product.stock > 0 ? "bg-green-500" : "bg-red-500"
                      } w-fit p-1 rounded text-white font-semibold text-sm tracking-wider`}
                    >
                      {product.stock > 0 ? "INSTOCK" : "OUTOFSTOCK"}
                    </div>
                  </main>

                  <img
                    src={`${server}/${product.photo}`}
                    alt={product.name}
                    className="h-72 w-96 object-cover rounded-3xl"
                  />
                  <h3 className="text-2xl font-semibold py-2">
                    {product.name}
                  </h3>
                  <div className="flex justify-between w-full items-center">
                    <p className="text-xl ">Rs. {product.price}</p>
                    <button
                      className="bg-primary p-3 cursor-pointer transition-all duration-200 hover:bg-primary/80 text-white font-semibold rounded-full"
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
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-end items-center gap-10 mt-6">
            <button
              disabled={!isPrevPage}
              onClick={() => setPage((prev) => prev - 1)}
              className="px-4 py-2 bg-primary text-white cursor-pointer rounded rounded-l-full disabled:opacity-50"
            >
              Prev
            </button>
            <div className="flex items-center gap-3">
              <span className="bg-primary text-white rounded-full w-[32px] h-[32px] flex justify-center items-center">
                {page}
              </span>
              <p className="text-[rgba(0,0,0,0.5)]">/</p>
              <span className="text-[rgba(0,0,0,0.5)]">
                {searchedData?.totalPage}
              </span>
            </div>
            <button
              disabled={!isNextPage}
              onClick={() => setPage((prev) => prev + 1)}
              className="px-4 py-2 bg-primary rounded text-white cursor-pointer rounded-r-full disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>

        <div className="flex flex-col ">
          <p className="font-semibold bg-primary text-white p-5 mb-5">
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
      </main>
    </div>
  );
};

export default Search;
