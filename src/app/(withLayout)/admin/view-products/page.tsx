/* eslint-disable @typescript-eslint/no-unused-vars */
import DeleteProduct from "@/components/ProductDelete/DeleteMethod";
import { TProduct } from "@/components/utils/types/product.interface";
import Link from "next/link";
import React from "react";

const fetchProducts = async () => {
  const res = await fetch("https://dress-wave-server.vercel.app/api/products", {
    cache: "no-store",
  });
  const productData = await res.json();
  return productData;
};

const AdminProductTable: React.FC = async () => {
  const products = await fetchProducts();
  return (
    <div className="mt-5">
      <h1 className="text-2xl text-center my-5 font-semibold text-gray-500">
        All Products (Admin View)
      </h1>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                Image
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                Name
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                Price
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                Category
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                Brand
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {products?.data?.map((product: TProduct) => (
              <tr key={product._id}>
                <td className="px-4 py-3">
                  <img
                    src={product.thumbnail}
                    alt={product.productName}
                    className="h-12 w-12 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-3 text-sm text-gray-800">
                  {product.productName}
                </td>
                <td className="px-4 py-3 text-sm text-gray-800">
                  {product.discountPrice ? (
                    <p>
                      <span className="line-through">৳{product.price}</span> ৳
                      {product.discountPrice}
                    </p>
                  ) : (
                    <p>৳{product.price}</p>
                  )}
                </td>
                <td className="px-4 py-3 text-sm text-gray-800">
                  {product.category}
                </td>
                <td className="px-4 py-3 text-sm text-gray-800">
                  {product.brand}
                </td>
                <td className="px-4 flex py-3 space-x-2">
                  <Link
                    href={`/admin/update-product/${product._id}`}
                    className="bg-green-500 hover:bg-green-600 text-white text-center text-sm px-3 py-[6px] rounded"
                  >
                    ✏️ Update
                  </Link>
                  <DeleteProduct productId={product._id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {products?.data?.map((product: TProduct) => (
          <div key={product._id} className="bg-white shadow rounded-lg p-4">
            <div className="flex items-center space-x-4">
              <img
                src={product.thumbnail}
                alt={product.productName}
                className="h-16 w-16 object-cover rounded"
              />
              <div>
                <h2 className="text-sm font-semibold">{product.productName}</h2>
                <p className="text-sm text-gray-500">
                  {product.discountPrice ? (
                    <p>
                      <span className="line-through"> ৳{product.price}</span> ৳
                      {product.discountPrice}
                    </p>
                  ) : (
                    <p>৳{product.price}</p>
                  )}
                </p>
                <p className="text-xs text-gray-400">
                  Category: {product.category}
                </p>
                <p className="text-xs text-gray-400">Brand: {product.brand}</p>
              </div>
            </div>
            <div className="mt-3 flex space-x-2">
              <Link
                href={`/admin/update-product/${product._id}`}
                className="bg-green-500 text-center hover:bg-green-600 text-white text-sm px-3 py-1 rounded w-1/2"
              >
                ✏️ Update
              </Link>
              <DeleteProduct productId={product._id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProductTable;
