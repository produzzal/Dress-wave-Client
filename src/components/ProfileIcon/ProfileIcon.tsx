"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import { TLogin } from "../utils/types/user.interface";
import Image from "next/image";

const ProfileIcon = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState<TLogin | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const loadUser = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
    };

    loadUser();

    const handleUserUpdate = () => {
      loadUser();
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    // 🔔 Listen for both storage event (other tabs) and userUpdated (same tab)
    window.addEventListener("storage", handleUserUpdate);
    window.addEventListener("userUpdated", handleUserUpdate);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("storage", handleUserUpdate);
      window.removeEventListener("userUpdated", handleUserUpdate);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    const logout = await fetch(
      "https://dress-wave-server.vercel.app/api/auth/logout",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
      }
    );

    const data = await logout.json();
    if (data.success === true) {
      toast.success(data?.message);
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      window.dispatchEvent(new Event("userUpdated"));
      setIsDropdownOpen(false);
      setTimeout(() => {
        router.push("/");
      }, 1000); // 👈 Better to use setTimeout instead of setInterval
    } else {
      toast.error(data?.message);
    }
  };

  return (
    <div className="md:ml-20 relative" ref={dropdownRef}>
      <div onClick={toggleDropdown} className="cursor-pointer">
        {user?.profilePicture ? (
          <Image
            src={user.profilePicture}
            height={10}
            width={10}
            unoptimized
            alt="Profile"
            className="size-8 md:size-10 rounded-full border border-gray-300 object-cover"
          />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 md:size-8 text-gray-700"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        )}
      </div>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-lg z-10">
          <ul>
            {!user && (
              <>
                <li>
                  <Link
                    href="/signup"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Signup
                  </Link>
                </li>
                <li>
                  <Link
                    href="/login"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Login
                  </Link>
                </li>
              </>
            )}
            {user?.role === "admin" ? (
              <li>
                <Link
                  href="/admin/add-product"
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Add Product
                </Link>
              </li>
            ) : (
              <li>
                <Link
                  href={""}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </Link>
              </li>
            )}
            {user && (
              <li>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileIcon;
