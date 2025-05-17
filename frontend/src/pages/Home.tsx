import banner from "../assets/banner.webp";
import "../styles/hom.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import first from "../assets/upHome.svg";
import second from "../assets/downHome.svg";
import { GiRotaryPhone } from "react-icons/gi";

import { HiNewspaper } from "react-icons/hi";
import { RiTruckFill } from "react-icons/ri";
import ProductCarousel from "../components/ProductCarosel";
import {
  useCategoriesQuery,
  useLatestProductsQuery,
  useSearchProductsQuery,
} from "../redux/api/productAPI";
import Slider from "../components/Slider";
import { RiGlobalFill } from "react-icons/ri";
import { FaAward, FaLeaf } from "react-icons/fa6";

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
          <main className="flex flex-col xl:flex-row text-secondary">
            <div className="xl:w-[50%] mt-20 hero1">
              <h1 className=" text-5xl md:text-6xl  font-bold leading-13  md:leading-20 ">
                Start your <br />
                <div className="flex flex-wrap gap-4">
                  <div> Online Shopping</div>{" "}
                  <div className="rotating-text-container">
                    <span
                      id="text"
                      key={index}
                      className="px-3 py-1 rounded-full rotating-text border-[1px] border-secondary "
                    >
                      {" "}
                      {words[index]}
                    </span>
                  </div>
                </div>
              </h1>
              <p className="md:py-5 pb-7 md:text-xl xl:w-[80%]">
                Instant, secure, and hassle-free—shop your everyday essentials
                at Lahore Shops, your trusted online store where desires meets
                convenience
              </p>

              <div className="flex xl:flex-row flex-col  xl:items-center gap-5">
                <Link
                  to="/search"
                  className="px-7 py-3 cursor-pointer text-center text-secondary hover:text-primary hover:bg-secondary text-xl transition-all duration-300 rounded-full border border-secondary"
                >
                  Shop Now
                </Link>
                <Link
                  to="/contact"
                  className="px-7 py-3 cursor-pointer text-primary  hover:text-secondary hover:bg-primary border border-secondary text-xl transition-all duration-300 rounded-full text-center bg-secondary"
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
      {/*  */}

      {/* Latest Products */}
      <section className="w-[90%] pt-28 flex justify-center flex-col items-center gap-5">
        <div className="w-full text-center lg:text-start">
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
      <Link to="/search" className="w-[90%] text-end underline">
        See All
      </Link>
      {/*  */}

      <div className="w-full pt-20">
        <Slider />
      </div>
      {/*  */}
      <div className="w-full flex justify-center">
        <main className="pt-20 w-[95%] md:w-[90%] ">
          <section className="flex flex-col lg:flex-row px-5 py-20 gap-10 md:p-10  bg-primary text-secondary w-full rounded-t-4xl lg:p-10 xl:p-0 xl:py-2 border-border border-[1px] justify-between xl:relative mb-5">
            <div className="flex flex-col gap-1 md:gap-5 md:pl-10 pl-5 lg:w-full justify-center text-center lg:text-start">
              <h2 className="xl:text-5xl font-bold md:text-[45px] text-[37px] ">
                Check latest news
              </h2>
              <p className="font-semibold pt-5 md:pt-0 leading-7">
                Stay informed with the newest updates and news.
              </p>
            </div>
            <img
              src={first}
              alt=""
              className="lg:w-full md:w-[50%] w-[38%] object-contain hidden xl:block"
            />
            <div className="flex justify-center items-center">
              <Link
                to="/search"
                className="bg-secondary text-primary border border-secondary hover:text-secondary font-bold flex justify-center items-center hover:bg-primary md:py-3 lg:w-[220px] h-fit md:w-[180px] md:px-0 px-2 py-4 rounded-full text-sm md:text-lg  xl:absolute xl:top-32 xl:right-14 w-[330px] "
              >
                Shop on our Store
              </Link>
            </div>
          </section>
          <section className=" flex flex-col lg:flex-row justify-center xl:p-0 xl:px-0 text-secondary  md:gap-10 md:p-10 py-20 items-center w-full rounded-b-4xl border bg-primary/60 border-primary/10 lg:p-10 lg:pr-10 lg:px-5  xl:relative">
            <div className="flex flex-col gap-1 md:gap-5 md:pl-10 pl-5 justify-center items-center lg:items-start md:w-full lg:pl-16 xl:pl-10 lg:pb-0  pb-10">
              <h2 className="xl:text-5xl md:text-[45px] text-[43px] text-center lg:text-start font-bold">
                Have any questions?
              </h2>
              <p className="font-semibold text-center lg:text-start pt-5 md:pt-0 leading-7">
                Feel free to reach out to us anytime. We are here to help you!
              </p>
            </div>
            <img
              src={second}
              alt=""
              className="lg:w-full w-[50%] hidden xl:block"
            />
            <div className="flex justify-between items-center">
              <Link
                to="/contact"
                className="bg-secondary text-primary border border-secondary hover:text-secondary font-bold flex justify-center items-center hover:bg-primary md:py-3 lg:w-[220px] h-fit md:w-[180px] md:px-0 px-2 py-4 rounded-full text-sm md:text-lg  xl:absolute xl:top-32 xl:right-14 w-[330px] "
              >
                Contact us
              </Link>
            </div>
          </section>
        </main>
      </div>

      {/*  */}

      {/* Category[01] Products */}
      <section className="w-[90%] pt-28 flex justify-center flex-col items-center gap-5">
        <div className="w-full text-start">
          {" "}
          <h1 className="font-bold text-2xl text-center lg:text-start">
            May Be You Want To Buy{" "}
            <span className="uppercase text-primary">
              {searchedData?.products.map((i) => i.category).slice(0, 1)}
            </span>
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
      <Link to="/search" className="w-[90%] text-end underline">
        See All
      </Link>

      <section className="w-full flex justify-center py-24">
        <main className="md:w-[80%] w-[90%] flex flex-col items-center justify-center gap-5">
          <span className="text-[#636363]" id="services">
            SERVICES
          </span>
          <h1 className="md:text-[45px] text-[30px] font-medium">
            Quality Services
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 text-secondary lg:grid-cols-3 gap-5 pt-10">
            <div className="px-10 py-14 bg-primary flex flex-col gap-5 items-start rounded-xl border-[0.1px] hover:border-black transition-all delay-200 ease-linear">
              <RiGlobalFill className="text-4xl" />
              <h1 className="text-[20px]">Brand Identity Design</h1>
              <p className="text-secondary/80">
                {" "}
                Our meticulous approach combines creativity with strategic
                thinking to develop cohesive visual identities that leave a
                lasting impression.
              </p>
            </div>
            <div className="px-10 py-14 bg-primary flex flex-col gap-5 items-start rounded-xl border-[0.01px] hover:border-black transition-all delay-200 ease-linear">
              <FaLeaf className="text-4xl" />
              <h1 className="text-[20px]">Website Design</h1>
              <p className="text-secondary/80">
                Consistently provide tailored solutions for your business and
                projects.
              </p>
            </div>
            <div className="px-10 py-14 bg-primary flex flex-col gap-5 items-start rounded-xl border-[0.01px] hover:border-black transition-all delay-200 ease-linear">
              <HiNewspaper className="text-4xl" />
              <h1 className="text-[20px]">Different Layouts</h1>
              <p className="text-secondary/80">
                Deliver bespoke solutions and designs for your business and
                projects.
              </p>
            </div>
            <div className="px-10 py-14 bg-primary flex flex-col gap-5 items-start rounded-xl border-[0.01px] hover:border-black transition-all delay-200 ease-linear">
              <RiTruckFill className="text-4xl" />
              <h1 className="text-[20px]">Responsiveness</h1>
              <p className="text-secondary/80">
                Improving your website or web application's compatibility across
                various devices.
              </p>
            </div>
            <div className="px-10 py-14 bg-primary flex flex-col gap-5 items-start rounded-xl border-[0.01px] hover:border-black transition-all delay-200 ease-linear">
              <FaAward className="text-4xl" />
              <h1 className="text-[20px]">Quality Assurance</h1>
              <p className="text-secondary/80">
                Thoroughly testing and ensuring the flawless operation of your
                application.
              </p>
            </div>
            <div className="px-10 py-14 bg-primary flex flex-col gap-5 items-start rounded-xl border-[0.01px] hover:border-black transition-all delay-200 ease-linear">
              <GiRotaryPhone className="text-4xl" />

              <h1 className="text-[20px]">24/7 Response</h1>
              <p className="text-secondary/80">
                Providing prompt responses for efficient communication and
                expedited task completion.
              </p>
            </div>
          </div>
        </main>
      </section>
    </div>
  );
};

export default Home;
