import { useLatestProductsQuery } from "../redux/api/productAPI";
import { server } from "../redux/store";
import Loader from "../components/Loader";
import { useDispatch } from "react-redux";
import { CartItems } from "../types/types";
import { addToCart, calculatePrice } from "../redux/reducer/cartReducer";
import { BsCart2 } from "react-icons/bs";
import { CiShoppingTag } from "react-icons/ci";
import banner from "../assets/banner.webp";
import { toast } from "react-toastify";
import "../styles/hom.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCarousel from "../components/ProductCarosel";

const words = ["Journey", "Adventure", "Voyage"];

const Home = () => {
  const [index, setIndex] = useState(0);
  const { data, isLoading, isError } = useLatestProductsQuery("");
  if (isError) {
    toast.error("Cannot fetch Products");
  }

  const dispatch = useDispatch();
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2000); // change word every 2 seconds

    return () => clearInterval(interval);
  }, []);
  const addToCartHandler = (cartItem: CartItems) => {
    if (cartItem.stock < 1) {
    }
    dispatch(addToCart(cartItem));
    dispatch(calculatePrice());
    toast.success("Item Added to Cart");
  };
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="w-full flex justify-center bg-primary py-28">
        <div className="flex items-center flex-col  justify-center  w-[90%]  banner h-[500px]">
          <main className="flex flex-col lg:flex-row text-white">
            <div className="lg:w-[50%] mt-20 hero1">
              <h1 className=" text-6xl  font-bold   leading-20 ">
                Start your <br />
                <div className="flex flex-wrap gap-4">
                  <div> Online Shopping</div>{" "}
                  <div className="rotating-text-container">
                    <span
                      id="text"
                      key={index}
                      className="px-3 py-1 rounded-full rotating-text border-[1px] border-white "
                    >
                      {" "}
                      {words[index]}
                    </span>
                  </div>
                </div>
              </h1>
              <p className="py-5 text-xl xl:w-[80%]">
                Instant, secure, and hassle-free—shop your everyday essentials
                at Lahore Shops, your trusted online store where desires meets
                convenience
              </p>

              <div className="flex xl:flex-row flex-col  xl:items-center gap-5">
                <button className="px-7 py-3 cursor-pointer text-hover hover:text-white hover:bg-hover text-xl transition-all duration-300 rounded-full bg-white">
                  Shop Now
                </button>
                <Link to="/contact">
                  <button className="px-7 py-3 cursor-pointer text-hover hover:text-white hover:bg-hover text-xl transition-all duration-300 rounded-full bg-secondary">
                    Contact Us
                  </button>
                </Link>
              </div>
            </div>
            <img
              src={banner}
              alt=""
              className="md:w-[60%] h-[552px] ml-24 md:h-[100vh-2vh] xl:h-[723px] bannerImg z-[1] object-cover object-top heroImg"
            />
          </main>
        </div>
      </div>

      {/* Latest Products */}
      <section className="w-[90%] pt-28 flex justify-center flex-col items-center gap-16">
        <div className="text-center">
          {" "}
          <h1 className="font-bold text-4xl">Our Latest Products</h1>
        </div>

        {isLoading ? (
          <Loader />
        ) : (
          <main className="grid grid-cols-3 gap-5 w-[80%]">
            {data?.products.map((i) => (
              <div
                key={i._id}
                className=" border-[rgba(0,0,0,0.1)] border-[1px] rounded-2xl p-3 flex flex-col   items-center"
              >
                <main className="flex items-center justify-between w-full pb-5 pt-2">
                  <div className="flex items-center gap-2">
                    <span>
                      <CiShoppingTag />
                    </span>
                    <p className="uppercase"> {i.category}</p>
                  </div>
                  <div
                    className={`${
                      i.stock > 0 ? "bg-green-500" : "bg-red-500"
                    } w-fit p-1 rounded text-white font-semibold text-sm tracking-wider`}
                  >
                    {i.stock > 0 ? "INSTOCK" : "OUTOFSTOCK"}
                  </div>
                </main>
                <img
                  src={`${server}/${i.photo}`}
                  alt=""
                  className="h-72 w-96 object-cover rounded-3xl"
                />
                <h3 className="text-2xl font-semibold py-2">{i.name}</h3>

                <div className="flex justify-between w-full items-center">
                  <p className="text-xl ">Rs. {i.price}</p>
                  <button
                    className="bg-primary p-3 cursor-pointer transition-all duration-200 hover:bg-primary/80 text-white font-semibold rounded-full"
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
                    <BsCart2 className="text-xl" />
                  </button>
                </div>
              </div>
            ))}
          </main>
        )}

        <ProductCarousel />
      </section>
    </div>
  );
};

export default Home;
