import { Skeleton } from "primereact/skeleton";

const ProductSkeleton = () => {
  const skeletonItems = new Array(4).fill(null);

  return (
    <div className="card w-full flex justify-center ">
      <div className="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-4 gap-10 w-[95%]">
        {skeletonItems.map((_, index) => (
          <div
            key={index}
            className="border-[1px] w-[95%] border-[rgba(0,0,0,0.1)] p-3 flex flex-col items-center min-w-[270px]"
          >
            {/* Top bar: category and stock status */}
            <main className="flex items-center justify-between w-full pb-5 pt-2">
              <div className="flex items-center gap-2 w-1/2">
                <Skeleton width="2rem" height="1rem" />
                <Skeleton width="5rem" height="1rem" />
              </div>
              <Skeleton width="5rem" height="1.5rem" borderRadius="1rem" />
            </main>

            {/* Image placeholder */}
            <Skeleton width="100%" height="18rem" className="mb-4" />

            {/* Product name */}
            <Skeleton width="80%" height="1.5rem" className="my-2" />

            {/* Price and button */}
            <div className="flex justify-between w-full items-center mt-4">
              <div>
                <Skeleton width="4rem" height="1rem" className="mb-1" />
                <Skeleton width="6rem" height="1.5rem" />
              </div>
              <Skeleton
                shape="circle"
                size="3rem"
                className="bg-primary opacity-70"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSkeleton;
