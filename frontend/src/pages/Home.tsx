import banner from "../assets/banner.webp";
import "../styles/hom.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCarousel from "../components/ProductCarosel";
import {
  useCategoriesQuery,
  useLatestProductsQuery,
  useSearchProductsQuery,
} from "../redux/api/productAPI";

const words = ["Journey", "Adventure", "Voyage"];

const Home = () => {
  const [index, setIndex] = useState(0);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [maxPrice, setMaxPrice] = useState(0);
  const [category, setCategory] = useState<string>("");
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useLatestProductsQuery("");

  const { data: categoryData } = useCategoriesQuery("");
  const {
    data: searchedData,
    isLoading: productLoading,
    isError: productIsError,
  } = useSearchProductsQuery({
    search,
    sort,
    category,
    price: maxPrice,
    page,
  });
  useEffect(() => {
    if (searchedData?.products?.length! > 0) {
      const firstCategory = categoryData?.categories[0];
      setCategory(firstCategory || "");
    }
  }, [searchedData]);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2000); // change word every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="w-full flex justify-center bg-primary ">
        <div className="flex items-center flex-col  justify-center  w-[90%]  ">
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
                <Link
                  to="/search"
                  className="px-7 py-3 cursor-pointer text-center text-hover hover:text-white hover:bg-hover text-xl transition-all duration-300 rounded-full bg-white"
                >
                  Shop Now
                </Link>
                <Link
                  to="/contact"
                  className="px-7 py-3 cursor-pointer text-hover hover:text-white hover:bg-hover text-xl transition-all duration-300 rounded-full text-center bg-secondary"
                >
                  Contact Us
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
      <section className="w-[90%] pt-28 flex justify-center flex-col items-center gap-5">
        <div className="w-full text-start">
          {" "}
          <h1 className="font-bold text-2xl">Our Latest Products</h1>
        </div>
        <div className="w-[99%]">
          <ProductCarousel
            products={data?.products || []}
            isLoading={isLoading}
            isError={isError}
          />
        </div>
      </section>

      {/* Category[01] Products */}
      <section className="w-[90%] pt-28 flex justify-center flex-col items-center gap-5">
        <div className="w-full text-start">
          {" "}
          <h1 className="font-bold text-2xl">
            Products {searchedData?.products.map((i) => i.category).slice(0, 1)}
          </h1>
        </div>
        <div className="w-[99%]">
          <ProductCarousel
            products={searchedData?.products || []}
            isLoading={productLoading}
            isError={productIsError}
          />
        </div>
      </section>
    </div>
  );
};

export default Home;
