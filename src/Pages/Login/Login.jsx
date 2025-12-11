import React, { useState } from "react";
import { Link } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import useAuth from "./../../hooks/useAuth";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signInUser } = useAuth();

  const handleLogin = (data) => {
    console.log("Login data:", data);
    signInUser(data.email, data.password)
      .then((result) => {
        const loggedInUser = result.user;
        console.log("Logged in user:", loggedInUser);
        // You can redirect the user or show a success message here
      })
      .catch((error) => {
        console.error("Error during login:", error);
        // You can show an error message to the user here
      });
  };

  return (
    <div className="max-w-md mx-auto px-4 py-10 shadow-lg rounded-lg bg-white dark:bg-gray-800 mt-10">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
        Login to Tuitron
      </h2>

      <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
        <div className="relative">
          <label className="label">
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Email
            </span>
          </label>
          <input
            type="email"
            {...register("email", { required: true })}
            placeholder="Enter your email"
            className="input input-bordered w-full pr-12 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
            required
          />
          {errors.email?.type === "required" && (
            <span className="text-red-500 text-sm">Email is required</span>
          )}
        </div>
        <div>
          <label className="text-sm text-gray-700 dark:text-gray-300">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", { required: true })}
              placeholder="Enter your password"
              className="input input-bordered w-full pr-12 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
              required
            />
            {errors.password?.type === "required" && (
              <span className="text-red-500 text-sm">Password is required</span>
            )}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600 z-10"
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Login
        </button>
      </form>

      {/* <button
        onClick={handleGoogleLogin}
        className="btn bg-white text-black border-[#e5e5e5] w-full hover:bg-gray-100 flex items-center justify-center space-x-2"
      >
        Login with Google
      </button> */}

      <SocialLogin />

      <div className="mt-4">
        <p className="text-sm text-center text-gray-600 dark:text-gray-400">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 dark:text-blue-400">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
