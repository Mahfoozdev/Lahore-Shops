import { useState } from "react";
import { useLatestProductsQuery } from "../redux/api/productAPI";
import { server } from "../redux/store";
import Loader from "../components/Loader";
import { useDispatch } from "react-redux";
import { CartItems } from "../types/types";
import { addToCart } from "../redux/reducer/cartReducer";
import { Link } from "react-router-dom";

const Home = () => {
  const [say, setsay] = useState("");
  const { data, isLoading, isError } = useLatestProductsQuery("");
  if (isError) {
    setsay("Cannot Fetch Products");
  }

  const dispatch = useDispatch();
  const addToCartHandler = (cartItem: CartItems) => {
    if (cartItem.stock < 1) return <p>Out of Stock</p>;
    dispatch(addToCart(cartItem));
  };
  return (
    <div>
      <h1>Latest Products</h1>

      {isLoading ? (
        <Loader />
      ) : (
        <main>
          {data?.products.map((i) => (
            <div>
              {i._id}
              <img
                src={`${server}/${i.photo}`}
                alt=""
                className="h-80 w-96 object-contain"
              />
              {i.name}

              <div>
                <button
                  className="bg-primary px-2 py-1 cursor-pointer transition-all duration-200 hover:bg-secondary text-white font-semibold rounded"
                  onClick={() =>
                    addToCartHandler({
                      productId: i._id,
                      photo: i.photo,
                      name: i.name,
                      price: i.price,
                      quantity: 1,
                      stock: i.stock,
                    })
                  }
                >
                  Add To Cart
                </button>
              </div>
            </div>
          ))}
          {say}

          <Link to="/cart">go to cart</Link>
        </main>
      )}
    </div>
  );
};

export default Home;
