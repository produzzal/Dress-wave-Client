"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const CartIcon = () => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // Get the cart items from localStorage
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");

    // Count the number of distinct products in the cart
    const distinctProductCount = existingCart.length;

    setCartCount(distinctProductCount);
  }, []); // Empty dependency array to run only on mount

  return (
    <Link href="/cart" className="relative">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6 md:size-8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
        />
      </svg>

      {/* Display Cart Item Count as Superscript */}
      {cartCount > 0 && (
        <div
          className="absolute top-[-8px] right-[-8px] bg-red-500 text-white rounded-full text-xs px-2 py-1 transform scale-75"
          style={{ transformOrigin: "top right" }}
        >
          {cartCount}
        </div>
      )}
    </Link>
  );
};

export default CartIcon;
