"use client";
import CartIcon from "@/components/CartIcon/CartIcon";
import ProfileIcon from "@/components/ProfileIcon/ProfileIcon";
import SearchIcon from "@/components/SearchIcon/SearchIcon";
import Shop from "@/components/ShopIcon/Shop";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  // const [user, setUser] = useState(null);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const user = {
    role: "admin",
  };

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const storedUser = localStorage.getItem("user");
  //     if (storedUser) {
  //       setUser(JSON.parse(storedUser));
  //     }
  //   }
  // }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <>
      {/* Navbar */}
      <div className="navbar items-center bg-white shadow-sm fixed top-0 left-0 w-full z-50 md:h-20 px-4">
        {/* Sidebar toggle (Mobile only) */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 "
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 "
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>

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
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0  bg-opacity-40 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
      {/* Sidebar */}
      <div
        className={`fixed left-0 top-16 w-[75%] h-[calc(100vh-4rem)] border-t-1 border-gray-200 bg-white shadow-lg z-50 transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <ul className="menu p-4 text-black">
          {user?.role === "admin" ? (
            <details className="relative">
              <summary className="text-xl mb-5 cursor-pointer list-none">
                Dashboard
              </summary>

              <ul className="rounded-t-none p-2 mb-5 font-serif">
                {user?.role === "admin" && (
                  <li className="border-b-1" onClick={() => setIsOpen(false)}>
                    <Link href="/admin/add-user">Add User</Link>
                  </li>
                )}
                <li className="border-b-1" onClick={() => setIsOpen(false)}>
                  <Link href="/admin/add-anime">Add Anime</Link>
                </li>
                <li className="border-b-1" onClick={() => setIsOpen(false)}>
                  <Link href="/admin/add-schedule">Add Schedule</Link>
                </li>
                <li className="border-b-1" onClick={() => setIsOpen(false)}>
                  <Link href="/admin/view-anime">View Anime</Link>
                </li>
                <li className="border-b-1" onClick={() => setIsOpen(false)}>
                  <Link href="/admin/view-visitor">View Visitor</Link>
                </li>
                <li className="border-b-1" onClick={() => setIsOpen(false)}>
                  <button onClick={handleLogout}>LogOut</button>
                </li>
              </ul>
            </details>
          ) : null}

          <h1 className="text-gray-500 text-2xl font-bold mb-3">Categories</h1>

          <li
            onClick={() => setIsOpen(false)}
            className="hover:text-red-500 font-serif border-b-1"
          >
            <a href="/animes">Anime</a>
          </li>
          <li
            onClick={() => setIsOpen(false)}
            className="hover:text-red-500 font-serif border-b-1"
          >
            <a href="/movies">Movies</a>
          </li>
          <li
            onClick={() => setIsOpen(false)}
            className="hover:text-red-500 font-serif border-b-1"
          >
            <a href="/animation">Animation & Cartoon</a>
          </li>
          <li
            onClick={() => setIsOpen(false)}
            className="hover:text-red-500 font-serif border-b-1"
          >
            <a href="/series">Series</a>
          </li>
          <li
            onClick={() => setIsOpen(false)}
            className="hover:text-red-500 font-serif border-b-1"
          >
            <a href="/tv-show">Tv Shows</a>
          </li>
        </ul>
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
