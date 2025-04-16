"use client";

import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Link from "next/link";
import { FiMail, FiLock } from "react-icons/fi";
import { TLogin } from "@/components/utils/types/user.interface";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLogin>();
  const router = useRouter();

  const onSubmit = async (userData: TLogin) => {
    try {
      const res = await fetch(
        "https://dress-wave-server.vercel.app/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
          credentials: "include",
        }
      );

      const data = await res.json();
      console.log(data);

      if (data?.success === true) {
        toast.success(data?.message);
        localStorage.setItem("user", JSON.stringify(data.data));
        localStorage.setItem("accessToken", JSON.stringify(data.token));
        window.dispatchEvent(new Event("userUpdated"));
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        toast.error(data?.message || "login failed");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error("Login error:", error);
    }
  };
  // const handleGoogleLogin = async () => {
  //   signIn("google", {
  //     // callbackUrl: "http://localhost:3000",
  //   });
  // };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl space-y-6"
      >
        <h2 className="text-3xl font-extrabold text-center text-gray-800">
          Login
        </h2>

        <div>
          <label className="block mb-1 font-medium text-gray-700">
            <FiMail className="inline mr-2" /> Email
          </label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-500 mt-1 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">
            <FiLock className="inline mr-2" /> Password
          </label>
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-red-500 mt-1 text-sm">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 rounded-xl hover:opacity-90 transition duration-300"
        >
          Login
        </button>

        {/* Google Login Button */}
        {/* <button
          type="button"
          onClick={handleGoogleLogin} // Define this function in your component
          className="w-full flex items-center justify-center gap-2 border border-gray-300 py-3 rounded-xl hover:bg-gray-100 transition duration-300"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            className="w-5 h-5"
          />
          <span className="text-sm font-medium text-gray-700">
            Continue with Google
          </span>
        </button> */}

        <p className="text-center text-sm">
          New here?{" "}
          <Link href="/signup" className="text-blue-600 hover:underline">
            Go for Signup
          </Link>
        </p>
      </form>
    </div>
  );
}
