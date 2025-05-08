import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  useDeleteProductMutation,
  useProductDetailsQuery,
  useUpdateProductMutation,
} from "../../../redux/api/productAPI";
import { UserReducerInitialState } from "../../../types/reducer-types";
import { server } from "../../../redux/store";

const UpdateProduct = () => {
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );

  const params = useParams();
  const navigate = useNavigate();
  const { data } = useProductDetailsQuery(params.id!);
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const [priceUpdate, setPriceUpdate] = useState<number>(0);
  const [stockUpdate, setStockUpdate] = useState<number>(0);
  const [nameUpdate, setNameUpdate] = useState<string>("");
  const [categoryUpdate, setCategoryUpdate] = useState<string>("");
  const [photoUpdate, setPhotoUpdate] = useState<string>("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setPhotoUpdate(reader.result);
          setPhotoFile(file);
        }
      };
    }
  };

  const submitHandler = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    const formData = new FormData();
    const changes: Record<string, any> = {};

    if (nameUpdate !== data?.product.name) {
      formData.set("name", nameUpdate);
      changes["name"] = { from: data?.product.name, to: nameUpdate };
    }
    if (categoryUpdate !== data?.product.category) {
      formData.set("category", categoryUpdate);
      changes["category"] = {
        from: data?.product.category,
        to: categoryUpdate,
      };
    }
    if (priceUpdate !== data?.product.price) {
      formData.set("price", priceUpdate.toString());
      changes["price"] = { from: data?.product.price, to: priceUpdate };
    }
    if (stockUpdate !== data?.product.stock) {
      formData.set("stock", stockUpdate.toString());
      changes["stock"] = { from: data?.product.stock, to: stockUpdate };
    }
    if (photoFile) {
      formData.set("photo", photoFile);
      changes["photo"] = { updated: true, fileName: photoFile.name };
    }

    if (Object.keys(changes).length === 0) {
      alert("No changes detected.");
      return;
    }

    try {
      await updateProduct({
        userId: user?._id!,
        productId: params.id!,
        formData,
      });

      console.log("Updated Fields:", changes);
      alert(
        `Product updated successfully!\n\nUpdated fields: ${Object.keys(
          changes
        ).join(", ")}`
      );
    } catch (error) {
      console.error("Update failed:", error);
      alert("Product update failed. Check console for details.");
    }
  };

  useEffect(() => {
    if (data) {
      setNameUpdate(data.product.name);
      setPriceUpdate(data.product.price);
      setStockUpdate(data.product.stock);
      setCategoryUpdate(data.product.category);
      setPhotoUpdate(data.product.photo);
    }
  }, [data]);

  const deleteHandler = async () => {
    await deleteProduct({
      userId: user?._id!,
      productId: data?.product._id!,
    });
    alert("product Deleted");
    navigate("/admin/product/admin-products");
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Update Product</h2>
      <button
        onClick={deleteHandler}
        className="bg-hover text-white rounded px-2 py-1 tracking-wider font-semibold cursor-pointer hover:bg-secondary transition-all duration-200 mb-5"
      >
        Delete
      </button>

      {/* Display previously fetched product details */}
      {data && (
        <div className="mb-6 border p-4 rounded bg-gray-50">
          <h3 className="text-xl font-semibold mb-2">
            Previous Product Details
          </h3>
          <p>
            <strong>Name:</strong> {data.product.name}
          </p>
          <p>
            <strong>Price:</strong> ${data.product.price}
          </p>
          <p>
            <strong>Stock:</strong> {data.product.stock}
          </p>
          <p>
            <strong>Category:</strong> {data.product.category}
          </p>
          {data.product.photo && (
            <img
              src={`${server}/${data.product.photo}`}
              alt="Previous"
              className="h-32 mt-2 object-cover rounded"
            />
          )}
        </div>
      )}

      {/* Update Form */}
      <form onSubmit={submitHandler} className="space-y-4">
        <input
          type="text"
          value={nameUpdate}
          onChange={(e) => setNameUpdate(e.target.value)}
          placeholder="Product Name"
          className="border p-2 w-full"
        />
        <input
          type="number"
          value={priceUpdate}
          onChange={(e) => setPriceUpdate(Number(e.target.value))}
          placeholder="Price"
          className="border p-2 w-full"
        />
        <input
          type="number"
          value={stockUpdate}
          onChange={(e) => setStockUpdate(Number(e.target.value))}
          placeholder="Stock"
          className="border p-2 w-full"
        />
        <input
          type="text"
          value={categoryUpdate}
          onChange={(e) => setCategoryUpdate(e.target.value)}
          placeholder="Category"
          className="border p-2 w-full"
        />
        <input
          type="file"
          onChange={changeImageHandler}
          className="border p-2 w-full"
        />
        {photoUpdate && (
          <img
            src={photoUpdate}
            alt="Updated Preview"
            className="h-32 object-cover"
          />
        )}
        <button
          type="submit"
          className="bg-primary hover:bg-secondary cursor-pointer text-white px-4 py-2 rounded"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
