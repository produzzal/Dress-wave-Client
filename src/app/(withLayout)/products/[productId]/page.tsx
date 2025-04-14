/* eslint-disable @typescript-eslint/no-explicit-any */
import ImageGallery from "@/components/ImageGallery/ImageGallery";
import { Metadata } from "next";
import React from "react";

interface Product {
  _id: string;
  productName: string;
  description: string;
  price: number;
  discountPrice: number;
  material: string;
  brand: string;
  category: string;
  subcategory: string;
  stockAvailability: number;
  images: string[];
  thumbnail: string;
  sizeOptions?: string[]; // ✅ Added size support
  createdAt: string;
  updatedAt: string;
}

export const metadata: Metadata = {
  title: "Product Details",
};

const getProduct = async (productId: string): Promise<Product | null> => {
  try {
    const res = await fetch(
      `https://dress-wave-server.vercel.app/api/products/${productId}`
    );
    const json = await res.json();
    return json?.data ?? null;
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return null;
  }
};

const ProductDetailPage = async ({ params }: { params: any }) => {
  const product = await getProduct(params.productId);

  if (!product) {
    return <div className="text-center py-10">Product not found.</div>;
  }

  const sizeOptions = ["M", "L", "XL", "XXL"];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <ImageGallery
          images={product.images}
          productName={product.productName}
        />

        {/* Product Details */}
        <div>
          <h1 className="text-2xl font-sans mb-4">{product.productName}</h1>

          <div className="text-md md:text-xl font-bold text-black">
            {product.discountPrice > 0 ? (
              <div>
                <span className="line-through text-gray-500 text-md">
                  ৳{product.price}
                </span>{" "}
                ৳{product.discountPrice}
              </div>
            ) : (
              <div> ৳{product.price}</div>
            )}
          </div>

          {/* Read-only info */}
          <div className="mt-4 text-md space-y-2 text-gray-500">
            <p>
              <span className="font-bold">Material:</span> {product.material}
            </p>
            <p>
              <span className="font-bold">Brand:</span> {product.brand}
            </p>
            <p>
              <span className="font-bold"> Category:</span> {product.category}
            </p>
            <p>
              <span className="font-bold">Type:</span> {product.subcategory}
            </p>
            <p>
              <span className="font-bold">Available:</span>{" "}
              {product.stockAvailability} Piece
            </p>
          </div>

          {/* Size and Quantity Selector */}
          <div className=" space-y-4 flex items-center space-x-4">
            {/* Size Selector */}
            {sizeOptions?.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mt-3">
                  Size
                </label>
                <select className="border rounded px-3 py-2 w-full mb-3">
                  {sizeOptions.map((size, index) => (
                    <option key={index} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Quantity Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Quantity
              </label>
              <input
                type="number"
                min={1}
                max={product.stockAvailability}
                defaultValue={1}
                className="border rounded px-3 py-2 w-24"
              />
            </div>
            <div>
              <button className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-[9px] rounded">
                Add to Cart
              </button>
            </div>
          </div>
          <p className="text-gray-600 pt-3 border-t pb-3">
            {product.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
