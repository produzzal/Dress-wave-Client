"use client";

import { TUser } from "@/components/utils/types/user.interface";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaHome,
  FaImage,
} from "react-icons/fa";
import { toast } from "react-toastify";

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TUser>();
  const router = useRouter();

  const onSubmit = async (userData: TUser) => {
    const res = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const data = await res.json();
    if (data?.success === true) {
      toast.success(data?.message);
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } else {
      toast.error(data?.message || "Signup failed");
    }
    // send data to backend
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl space-y-6"
      >
        <h2 className="text-3xl font-extrabold text-center text-gray-800">
          Create Account
        </h2>

        {/* Name */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            <FaUser className="inline mr-2" /> Name
          </label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && (
            <p className="text-red-500 mt-1 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            <FaEnvelope className="inline mr-2" /> Email
          </label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <p className="text-red-500 mt-1 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            <FaLock className="inline mr-2" /> Password
          </label>
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && (
            <p className="text-red-500 mt-1 text-sm">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            <FaPhone className="inline mr-2" /> Phone
          </label>
          <input
            type="tel"
            {...register("phone", { required: "Phone number is required" })}
            className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.phone && (
            <p className="text-red-500 mt-1 text-sm">{errors.phone.message}</p>
          )}
        </div>

        {/* Address */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            <FaHome className="inline mr-2" /> Address (Optional)
          </label>
          <input
            type="text"
            {...register("address")}
            className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>

        {/* Profile Picture */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            <FaImage className="inline mr-2" /> Profile Picture URL (Optional)
          </label>
          <input
            type="url"
            {...register("profilePicture")}
            className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 rounded-xl hover:opacity-90 transition duration-300"
        >
          Sign Up
        </button>
        <p className="text-center text-sm">
          Have an Account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Go for Login
          </Link>
        </p>
      </form>
    </div>
  );
}
