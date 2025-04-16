import Link from "next/link";
import { TProduct } from "../utils/types/product.interface";
const fetchProducts = async () => {
  const res = await fetch("https://dress-wave-server.vercel.app/api/products", {
    next: { revalidate: 300 },
  });
  return res.json();
};

const NewArrival = async () => {
  const products = await fetchProducts();

  return (
    <div>
      <h2 className="uppercase text-center p-4 bg-[#FCF4E9] text-[#f0920e] font-bold text-2xl md:text-4xl mt-3">
        New Arrival
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mt-3">
        {products?.data
          .slice(-30)
          .reverse()
          .map((product: TProduct) => (
            <Link
              href={`/products/${product._id}`}
              key={product._id}
              className="relative"
            >
              <img
                src={product.thumbnail}
                alt="T-Shirt"
                className="object-cover pt-6 rounded w-full h-full"
              />
              <h2 className="absolute top-0 left-0 right-0 mx-auto text-black text-[12px] bg-white p-2 text-center rounded-b-2xl inline-block shadow-[0_-4px_8px_rgba(0,0,0,0.2)]">
                {product.productName}
              </h2>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default NewArrival;
