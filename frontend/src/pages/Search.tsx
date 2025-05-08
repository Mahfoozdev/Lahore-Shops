import { useState } from "react";
import {
  useCategoriesQuery,
  useSearchProductsQuery,
} from "../redux/api/productAPI";
import { CustomError } from "../types/api-types";
import { server } from "../redux/store";
import { useDispatch } from "react-redux";
import { CartItems } from "../types/types";
import { addToCart } from "../redux/reducer/cartReducer";

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
    if (cartItem.stock < 1) return <p>Out of Stock</p>;
    dispatch(addToCart(cartItem));
  };

  const isPrevPage = page > 1;
  const isNextPage = page < searchedData?.totalPage!; // You might want to use `searchedData.totalPages` dynamically

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Search Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded"
        />

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">Sort By</option>
          <option value="asc">Price: Low → High</option>
          <option value="desc">Price: High → Low</option>
        </select>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">All Categories</option>
          {categoryData?.categories?.map((c: string) => (
            <option key={c} value={c} className="tracking-widest font-semibold">
              {c.toUpperCase()}
            </option>
          ))}
        </select>

        <input
          type="range"
          min={0}
          max={10000}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-primary"
        />
        <p>Max Price: ${maxPrice}</p>
      </div>

      {productLoading ? (
        <p>Loading products...</p>
      ) : productIsError ? (
        <p>Error: {(productError as CustomError)?.data.message}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {searchedData?.products?.map((product: any) => (
            <div key={product._id} className="border rounded p-4">
              <img
                src={`${server}/${product.photo}`}
                alt={product.name}
                className="h-40 w-full object-contain mb-2"
              />
              <h3 className="text-lg font-medium">{product.name}</h3>
              <p>Rs. {product.price}</p>
              <button
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
                className="mt-2 px-4 py-1 bg-primary text-white rounded"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-between items-center mt-6">
        <button
          disabled={!isPrevPage}
          onClick={() => setPage((prev) => prev - 1)}
          className="px-4 py-2 bg-primary text-white cursor-pointer rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>Page {page}</span>
        <button
          disabled={!isNextPage}
          onClick={() => setPage((prev) => prev + 1)}
          className="px-4 py-2 bg-primary rounded text-white cursor-pointer disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Search;
