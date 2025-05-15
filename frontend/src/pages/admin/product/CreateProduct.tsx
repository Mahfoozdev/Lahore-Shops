import { ChangeEvent, FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { useNewProductMutation } from "../../../redux/api/productAPI";
import { UserReducerInitialState } from "../../../types/reducer-types";
import { responseToast } from "../../../utils/features";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { FaCloudDownloadAlt } from "react-icons/fa";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const CreateProduct = () => {
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );

  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [price, setPrice] = useState<number>();
  const [stock, setStock] = useState<number>();
  const [photoPrev, setPhotoPrev] = useState<string>("");
  const [photo, setPhoto] = useState<File>();

  const [newProduct] = useNewProductMutation();
  const navigate = useNavigate();
  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPhotoPrev(reader.result);
          setPhoto(file);
        }
      };
    }
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !price || !stock || !category || !photo) return;
    const formData = new FormData();
    formData.set("name", name);
    formData.set("price", price.toString());
    formData.set("stock", stock.toString());
    formData.set("category", category);
    formData.set("photo", photo);

    const res = await newProduct({ id: user?._id!, formData });
    responseToast(res, navigate, "/admin/product/admin-products");
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div className="pt-10 flex flex-col items-center gap-10">
          <div className="flex flex-col items-center gap-10">
            <div className="flex items-center gap-5">
              <label htmlFor="name" className="font-primary">
                Name:
              </label>
              <input
                id="name"
                className="border-2 border-black p-3"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-5">
              <label htmlFor="price" className="font-primary">
                Price:
              </label>
              <input
                id="price"
                className="border-2 border-black p-3"
                type="number"
                value={price ?? ""}
                onChange={(e) => setPrice(parseFloat(e.target.value))}
              />
            </div>

            <div className="flex items-center gap-5">
              <label htmlFor="stock" className="font-primary">
                Stock:
              </label>
              <input
                id="stock"
                className="border-2 border-black p-3"
                type="number"
                value={stock ?? ""}
                onChange={(e) => setStock(parseInt(e.target.value))}
              />
            </div>

            <div className="flex items-center gap-5">
              <label htmlFor="category" className="font-primary">
                Category:
              </label>
              <input
                id="category"
                required
                className="border-2 border-black p-3"
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-5">
              <label htmlFor="photo" className="font-primary">
                Photo:
              </label>
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<FaCloudDownloadAlt />}
              >
                Upload files
                <VisuallyHiddenInput
                  type="file"
                  id="photo"
                  accept="image/*"
                  onChange={changeImageHandler}
                />
              </Button>
              {/* <input
                id="photo"
                className="border-2 border-black p-3"
                type="file"
                accept="image/*"
                onChange={changeImageHandler}
              /> */}
            </div>

            {photoPrev && (
              <img
                src={photoPrev}
                alt="Preview"
                className="w-40 h-40 object-contain"
              />
            )}
          </div>

          <button
            type="submit"
            className="bg-black hover:bg-white hover:text-black transition-all duration-300 border-2 border-black text-white text-xl p-5 cursor-pointer"
          >
            Create Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
