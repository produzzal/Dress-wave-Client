"use client";
import CartIcon from "@/components/CartIcon/CartIcon";
import ProfileIcon from "@/components/ProfileIcon/ProfileIcon";
import SearchIcon from "@/components/SearchIcon/SearchIcon";
import Shop from "@/components/ShopIcon/Shop";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  return (
    <>
      {/* Navbar */}
      <div className="navbar items-center bg-white shadow-sm fixed top-0 left-0 w-full z-50 md:h-20 px-4">
        {/* Logo */}
        <Link href="/" className="ml-5 md:ml-10 ">
          <img src="/dress-wave-logo.png" alt="Logo" className="h-full w-52" />
        </Link>
        <div className="hidden md:block md:ml-15 md:mr-5">
          <Shop />
        </div>

        <div className="flex justify-end gap-5 sm:justify-normal w-full">
          {/* Mobile Search Icon (Hidden on md and up) */}
          <div className="md:mx-20">
            <SearchIcon onClick={() => setShowMobileSearch((prev) => !prev)} />
          </div>

          {/* Cart Icon  */}
          <CartIcon />

          {/* Profile icon */}
          <ProfileIcon />
        </div>
      </div>
      {/* Push content below navbar */}
      <div className="h-16" /> {/* This keeps spacing under fixed navbar */}
      {/* Mobile Search Field */}
      {showMobileSearch && (
        <div className="block md:hidden px-4 py-2 bg-white shadow-md  top-16 w-full z-40">
          <input
            type="text"
            placeholder="Search Product By Title or Tag..."
            className="border rounded px-4 text-sm py-2 w-full"
          />
        </div>
      )}
    </>
  );
}
