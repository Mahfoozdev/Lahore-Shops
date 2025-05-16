import "../styles/slider.css";

const Slider = () => {
  return (
    <div className="slider">
      <div className="slider-track">
        <div className="item flex gap-10  text-3xl md:text-5xl font-medium">
          {" "}
          <span>|</span> <span className="text-v3"> Providing Service</span>{" "}
        </div>
        <div className="item flex gap-10 text-3xl md:text-5xl  font-medium">
          {" "}
          <span>|</span> Fast Delivery
        </div>
        <div className="item flex gap-10 text-3xl md:text-5xl  font-medium">
          {" "}
          <span>|</span> <span className="text-v4">Secure Payment</span>{" "}
        </div>

        <div className="item flex gap-10 text-3xl md:text-5xl  font-medium">
          {" "}
          <span>|</span> <span className="text-v4">Best Price</span>
        </div>
        {/* <div className="item flex gap-10 text-3xl md:text-5xl  font-medium"> <span>|</span> OTC Desk</div> */}
        {/* Duplicate items for seamless looping */}
        <div className="item flex gap-10 text-3xl md:text-5xl  font-medium">
          <span>|</span> <span className="text-v3"> Providing Service</span>{" "}
        </div>
        <div className="item flex gap-10 text-3xl md:text-5xl  font-medium">
          {" "}
          <span>|</span> Fast Delivery
        </div>
        <div className="item flex gap-10 text-3xl md:text-5xl  font-medium">
          {" "}
          <span>|</span> <span className="text-v4">Secure Payment</span>
        </div>
        <div className="item flex gap-10 text-3xl md:text-5xl  font-medium">
          {" "}
          <span>|</span> <span className="text-v4">Best Price</span>
        </div>
        {/* <div className="item flex gap-10 text-3xl md:text-5xl  font-medium"> <span>|</span> OTC Desk</div> */}
      </div>
    </div>
  );
};

export default Slider;
