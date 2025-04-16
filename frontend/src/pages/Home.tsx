import { useState } from "react";
import { useLatestProductsQuery } from "../redux/api/productAPI";
import { server } from "../redux/store";
import Loader from "../components/Loader";

const Home = () => {
  const [say, setsay] = useState("");
  const { data, isLoading, isError } = useLatestProductsQuery("");
  if (isError) {
    setsay("Cannot Fetch Products");
  }

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
              <img src={`${server}/${i.photo}`} alt="" />
              {i.name}
            </div>
          ))}
          {say}
        </main>
      )}
    </div>
  );
};

export default Home;
