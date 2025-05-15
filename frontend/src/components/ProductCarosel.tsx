import { Carousel } from "primereact/carousel";
import { BsCart2 } from "react-icons/bs";
import { CiShoppingTag } from "react-icons/ci";
import { server } from "../redux/store";
import { useDispatch } from "react-redux";
import { CartItems, Product } from "../types/types";
import { addToCart } from "../redux/reducer/cartReducer";
import { toast } from "react-toastify";
import "../styles/productCarosel.css";
import ProductSkeleton from "./ProductSkeleton";

interface props {
  products: Product[];
  isLoading: boolean;
  isError: boolean;
}

const ProductCarousel = ({ products, isLoading, isError }: props) => {
  if (isError) {
    toast.error("Cannot fetch Products");
  }

  const responsiveOptions = [
    { breakpoint: "1399px", numVisible: 4, numScroll: 1 },
    { breakpoint: "1199px", numVisible: 3, numScroll: 1 },
    { breakpoint: "1001px", numVisible: 2, numScroll: 1 },
    { breakpoint: "999px", numVisible: 2, numScroll: 1 },
    { breakpoint: "767px", numVisible: 1, numScroll: 1 },
  ];
  const dispatch = useDispatch();
  const addToCartHandler = (cartItem: CartItems) => {
    if (cartItem.stock < 1) return toast.error("Out Of Stock");
    dispatch(addToCart(cartItem));

    toast.success("Item Added to Cart");
  };

  const productTemplate = (product: any) => {
    return (
      <div
        key={product._id}
        className="border-[1px] w-[95%] border-[rgba(0,0,0,0.1)]  p-3 flex flex-col items-center"
      >
        <main className="flex items-center justify-between w-full pb-5 pt-2">
          <div className="flex items-center gap-2">
            <CiShoppingTag className="text-lg" />
            <p className="uppercase text-sm tracking-wide">
              {product.category}
            </p>
          </div>
          <div
            className={`${
              product.stock > 0 ? "bg-green-500" : "bg-red-500"
            } w-fit px-2 py-1 rounded text-white font-semibold text-xs tracking-wider`}
          >
            {product.stock > 0 ? "INSTOCK" : "OUTOFSTOCK"}
          </div>
        </main>

        <img
          src={`${server}/${product.photo}`}
          alt={product.name}
          className="h-72 w-96 object-cover"
        />

        <h3 className="text-xl font-semibold pt-5  py-2 text-center">
          {product.name}
        </h3>

        <div className="flex justify-between w-full items-center mt-2">
          <div>
            <p className="line-through text-red-500">
              {Math.round(product.price * 1.1)}
            </p>
            <p className="">
              Rs.{" "}
              <span className="italic font-semibold text-xl ">
                {product.price}
              </span>
            </p>
          </div>
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
    );
  };

  return isLoading ? (
    <ProductSkeleton />
  ) : (
    <div className="card">
      <Carousel
        value={products}
        numVisible={4}
        numScroll={3}
        responsiveOptions={responsiveOptions}
        className="custom-carousel"
        circular
        autoplayInterval={1500}
        itemTemplate={productTemplate}
      />
    </div>
  );
};

export default ProductCarousel;
