/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";

const AddToCart = ({ product }: { product: any }) => {
  const [selectedSize, setSelectedSize] = useState(product.size?.[0]);
  const [selectedColor, setSelectedColor] = useState(product.color?.[0]);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    const cartItem = {
      productId: product._id,
      productName: product.productName,
      price: product.price,
      discountPrice: product.discountPrice,
      quantity,
      color: selectedColor,
      size: selectedSize,
      thumbnail: product.thumbnail,
    };

    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");

    // Check if same productId and size exists
    const existingIndex = existingCart.findIndex(
      (item: any) =>
        item.productId === cartItem.productId &&
        item.color === cartItem.color &&
        item.size === cartItem.size &&
        item.thumbnail === cartItem.thumbnail
    );

    if (existingIndex !== -1) {
      // If match found, increase quantity
      existingCart[existingIndex].quantity += cartItem.quantity;
      toast.success("Added to cart!");
    } else {
      // Otherwise add as new item
      existingCart.push(cartItem);
      toast.success("Added to cart!");
    }

    // Save updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(existingCart));

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <div>
      {/* Size - Line 1 */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Size
        </label>
        <div className="flex gap-2 flex-wrap">
          {product.size.map((size: any, idx: any) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedSize(size)}
              className={`px-4 py-2 rounded border transition-all duration-200 ${
                selectedSize === size
                  ? "bg-black text-white border-black"
                  : "bg-white text-black border-gray-400"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Color - Line 2 */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Color
        </label>
        <div className="flex gap-2 flex-wrap">
          {product.color.map((color: any, idx: any) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedColor(color)}
              className={`px-4 py-2 rounded border transition-all duration-200 ${
                selectedColor === color
                  ? "bg-black text-white border-black"
                  : "bg-white text-black border-gray-400"
              }`}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity + Add to Cart - Line 3 */}
      <div className="flex items-end gap-6 mb-10">
        {/* Quantity with + - buttons */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quantity
          </label>
          <div className="flex items-center border rounded overflow-hidden w-fit">
            <button
              type="button"
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              className="px-3 py-2 text-lg font-bold hover:bg-gray-200"
            >
              -
            </button>
            <input
              type="number"
              min={1}
              max={product.stockAvailability}
              value={quantity}
              readOnly
              className="w-12 text-center border-l border-r"
            />
            <button
              type="button"
              onClick={() =>
                setQuantity((prev) =>
                  prev < product.stockAvailability ? prev + 1 : prev
                )
              }
              className="px-3 py-2 text-lg font-bold hover:bg-gray-200"
            >
              +
            </button>
          </div>
        </div>

        {/* Add to Cart */}
        <div>
          <button
            onClick={handleAddToCart}
            className="bg-gray-700 hover:bg-gray-800 text-white px-5 py-2.5 rounded mt-[26px]"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddToCart;
