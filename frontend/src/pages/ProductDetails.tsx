import { useNavigate, useParams } from "react-router-dom";
import {
  useProductDetailsQuery,
  useSearchProductsQuery,
} from "../redux/api/productAPI";
import { server } from "../redux/store";
import { Backdrop, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { CartItems } from "../types/types";
import { addToCart } from "../redux/reducer/cartReducer";
import { toast } from "react-toastify";
import ProductCarousel from "../components/ProductCarosel";

const ProductDetails = () => {
  const [open, setOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [maxPrice, setMaxPrice] = useState(0);
  const [category, setCategory] = useState<string>("");
  const [page, setPage] = useState(1);
  const { id } = useParams<{ id: string }>();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useProductDetailsQuery(id ?? "");

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

  const product = data?.product;
  useEffect(() => {
    if (product?.category) {
      setCategory(product.category);
    }
  }, [product]);

  const addToCartHandler = (cartItem: CartItems) => {
    if (cartItem.stock < 1) return toast.error("Out Of Stock");
    dispatch(addToCart(cartItem));

    toast.success("Item Added to Cart");
  };
  const buyNowHandler = (cartItem: CartItems) => {
    if (cartItem.stock < 1) return toast.error("Out Of Stock");
    dispatch(addToCart(cartItem));
    navigate("/cart");
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError || !data?.success) return <div>Error loading product.</div>;

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center py-20">
      <div className="md:w-[90%] w-[95%] gap-14 flex flex-col lg:flex-row">
        <div className="lg:w-[50%] w-full">
          <div className="mb-3">
            <Button onClick={handleOpen} variant="outlined">
              View Image
            </Button>
            <Backdrop
              sx={{
                color: "#fff",
                zIndex: (theme) => theme.zIndex.drawer + 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              open={open}
              onClick={handleClose}
            >
              <img
                src={`${server}/${product?.photo}`}
                alt="Full View"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                }}
              />
            </Backdrop>
          </div>

          <img
            src={`${server}/${product?.photo}`}
            className="w-full h-[500px] object-contain border-[1px] border-primary/10"
            alt={product?.name}
          />
        </div>
        <div className="flex flex-col gap-5 lg:w-[40%] xl:w-[30%] w-full  p-5 ">
          {" "}
          <div
            className={`${
              product?.stock! > 0 ? "bg-primary" : "bg-red-500"
            } w-fit p-1 rounded text-secondary font-semibold text-sm tracking-wider`}
          >
            {product?.stock! > 0 ? "INSTOCK" : "OUTOFSTOCK"}
          </div>
          <h1 className="lg:text-5xl text-2xl font-semibold text-primary">
            {product?.name!}
          </h1>
          <p>
            Category:{" "}
            <span className="italic uppercase text-primary font-semibold">
              {product?.category!}
            </span>
          </p>
          <div className="flex flex-col ">
            <p className="line-through text-red-500">
              {Math.round(product?.price! * 1.1)}
            </p>
            <p>
              {" "}
              Rs.{" "}
              <span className="md:text-2xl text-xl font-semibold text-primary italic">
                {" "}
                {product?.price}
              </span>
            </p>
          </div>
          <div className="flex flex-col gap-5">
            <Button
              variant="outlined"
              onClick={() =>
                buyNowHandler({
                  productId: product?._id!,
                  photo: product?.photo!,
                  name: product?.name!,
                  price: product?.price!,
                  quantity: 1,
                  stock: product?.stock!,
                })
              }
            >
              Buy Now
            </Button>
            <Button
              variant="contained"
              onClick={() =>
                addToCartHandler({
                  productId: product?._id!,
                  photo: product?.photo!,
                  name: product?.name!,
                  price: product?.price!,
                  quantity: 1,
                  stock: product?.stock!,
                })
              }
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>

      <div className="w-[90%] pt-32">
        <h2 className="pb-10 font-semibold text-2xl">Related Products: </h2>
        <ProductCarousel
          products={
            searchedData?.products?.filter((p) => p._id !== product?._id) || []
          }
          isLoading={productLoading}
          isError={productIsError}
        />
      </div>
    </div>
  );
};

export default ProductDetails;
