import { FaTelegramPlane } from "react-icons/fa";
import { FaFacebookF, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <section>
      <div
        className="w-full flex bg-primary text-secondary justify-center relative top-0 mt-20 bg-card"
        style={{ borderRadius: "70px 70px 0 0" }}
      >
        <footer className="xl:w-[85%] width md:w-[90%]  w-[95%] pt-24">
          {/* 1st section starts */}
          <div className="flex md:flex-row flex-col gap-5 md:gap-0 justify-center md:justify-between items-center bg-secondary border-[1px] border-[#29354D] w-full rounded-2xl p-5">
            <div className="flex md:flex-row flex-col gap-5 items-center md:items-start ">
              <div className="bg-card p-5 text-primary text-4xl rounded-2xl border-[1px] border-border">
                <FaTelegramPlane />
              </div>
              <div className="flex flex-col gap-3 justify-center items-center md:justify-start md:items-start">
                <h3 className="text-xl font-bold text-primary">
                  Join our awesome community
                </h3>
                <p className="font-light text-center md:text-start text-primary md:text-[13px] lg:text-[16px] md:w-[80%] lg:w-[90%] xl:w-full">
                  Stay updated with the latest news, events, and product
                  features of Lahore Shops!
                </p>
              </div>
            </div>
            <div>
              <button className="lg:w-[180px] w-[140px] py-3 rounded-full text-[14px] lg:text-[16px] bg-primary hover:bg-primary/80 font-semibold hover:bg-hoverBg cursor-pointer">
                Join now
              </button>
            </div>
          </div>
          {/* 2nd section starts here */}
          <section className="flex lg:flex-row flex-col lg:gap-14 xl:gap-0 gap-10 py-24">
            {/* 1st mainDiv */}
            <div className="lg:w-[40%] w-full flex justify-center flex-col items-center md:items-start">
              <Link to="/" className="flex font-extrabold text-3xl gap-3">
                <h1>LS</h1> <h2 className="underline">lahoreShops</h2>
              </Link>
              <h3 className="text-xl font-bold py-5 text-center md:text-start">
                The Future of Shopping
              </h3>
              <p className="  pb-10 text-center md:text-start">
                Blending Innovation and Trust ,<br />
                Making Shop Simple
              </p>
              {/* <img src={glo} alt="" className="w-52 object-contain" /> */}
            </div>

            {/* 2nd mainDiv */}

            <div className="lg:w-[50%] w-full md:flex-row flex-col items-center md:items-start flex gap-10 md:gap-0 md:justify-between">
              {/* 2nd div */}
              <div className="flex flex-col gap-7">
                <h6 className="font-medium text-[15px] text-center md:text-start underline ">
                  Pages
                </h6>

                <ul className=" gap-4 flex flex-col items-center md:items-start text-sm md:text-[16px]">
                  <li className="cursor-pointer hover:text-[grey]">
                    <Link to="/">Homepage</Link>
                  </li>
                  <li className="cursor-pointer hover:text-[grey]">
                    <Link to="/search">Shop</Link>
                  </li>
                  <li className="cursor-pointer hover:text-[grey]">
                    <Link to="/orders">My Orders</Link>
                  </li>
                  <li className="cursor-pointer hover:text-[grey]">
                    <Link to="/cart">Cart</Link>
                  </li>
                  <li className="cursor-pointer hover:text-[grey]">
                    <Link to="/contact">Contact Us</Link>
                  </li>
                </ul>
              </div>
              {/* 3rd div */}
              <div className="flex flex-col gap-7">
                <h6 className="font-medium text-center md:text-start text-[15px] underline">
                  Logged In
                </h6>

                <ul className=" gap-4 flex flex-col items-center md:items-start text-sm md:text-[16px]">
                  <li className="cursor-pointer hover:text-[grey]">
                    <Link to="/orders">My Orders</Link>
                  </li>
                  <li className="cursor-pointer hover:text-[grey]">
                    <Link to="/cart">Cart</Link>
                  </li>
                </ul>
              </div>
              {/* 4rth div */}
              <div className="flex flex-col gap-7">
                <h6 className="font-medium text-[15px] underline">
                  Legal Information
                </h6>

                <ul className=" gap-4 flex flex-col items-center md:items-start text-sm md:text-[16px]">
                  <li className="cursor-pointer hover:text-[grey]">
                    <Link to="/privacy-policy">Privacy Policy</Link>
                  </li>
                  <li className="cursor-pointer hover:text-[grey]">
                    <Link to="/terms-and-conditions">Terms of Use</Link>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* 3rd section starts here */}

          <section className="border-t-[1px] border-b-[1px] border-l-0 border-r-0 border-border w-full">
            <div className="w-full flex justify-between items-center py-10 flex-col gap-5 md:flex-row">
              <h3 className=" text-[13px] font-bold md:text-[16px]">
                Copyright © Lahore Shops
              </h3>
              <div className="flex gap-5">
                <div className="bg-[#131B2C] text-primary p-1 text-xl rounded-md border-[1px] border-border">
                  <a
                    href="https://www.facebook.com/MetaXPayments"
                    target="_blank"
                  >
                    <FaFacebookF />
                  </a>
                </div>
                <div className="bg-[#131B2C] p-1 text-primary text-xl rounded-md border-[1px] border-border">
                  <a
                    href="https://www.instagram.com/metaxpayments/"
                    target="_blank"
                  >
                    <RiInstagramFill />
                  </a>
                </div>
                <div className="bg-[#131B2C] p-1 text-primary text-xl rounded-md border-[1px] border-border">
                  <a href="https://x.com/@MetaXPayments?mx=2" target="_blank">
                    <FaXTwitter />
                  </a>
                </div>
                <div className="bg-[#131B2C] p-1 text-primary text-xl rounded-md border-[1px] border-border">
                  <a
                    href="https://www.linkedin.com/company/metaxpayments"
                    target="_blank"
                  >
                    <FaLinkedinIn />
                  </a>
                </div>
              </div>
            </div>
          </section>
          {/* 4rth section starts here */}
          <section className="py-10">
            <span className="text-[12px]">
              Lahore Shops is a Pakistan-based online shopping store, with a
              strong commitment to trust and reliability.
            </span>{" "}
            <br />
            <span className="text-[12px]">
              Lahore Shops is a trustworthy online shopping store in Pakistan,
              dedicated to offering a{" "}
              <span className="text-btnBg">trusted</span> and seamless shopping{" "}
              <span className="text-btnBg">experience.</span>.
            </span>
          </section>
        </footer>
      </div>
    </section>
  );
};

export default Footer;
