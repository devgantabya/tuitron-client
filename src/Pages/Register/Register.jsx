import React, { useState } from "react";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAuth from "./../../hooks/useAuth";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { registerUser } = useAuth();

  const handleRegistration = (data) => {
    console.log(data);
    registerUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log("Registered User:", user);
      })
      .catch((error) => {
        console.error("Registration Error:", error);
      });
  };

  return (
    <div className="max-w-md mx-auto px-4 py-10 shadow-lg rounded-lg bg-white dark:bg-gray-800 mt-10">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
        Create Your Tuitron Account
      </h2>

      <form onSubmit={handleSubmit(handleRegistration)} className="space-y-5">
        <div>
          <label className="text-sm text-gray-700 dark:text-gray-300">
            Full Name
          </label>
          <input
            type="text"
            {...register("name")}
            placeholder="Enter your full name"
            className="input input-bordered w-full pr-12 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
            required
          />
        </div>

        {/* <div>
          <label className="text-sm text-gray-700 dark:text-gray-300">
            Photo
          </label>
          <input
            type="file"
            name="photo"
            onChange={handleFileChange}
            className="file-input input-bordered w-full pr-12 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
            required
          />
        </div> */}

        <div>
          <label className="text-sm text-gray-700 dark:text-gray-300">
            Email
          </label>
          <input
            type="email"
            {...register("email", { required: true })}
            placeholder="Enter your email"
            className="input input-bordered w-full pr-12 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
            required
          />
          {errors.email?.type === "required" && (
            <span className="text-red-600 text-sm">This field is required</span>
          )}
        </div>

        <div>
          <label className="text-sm text-gray-700 dark:text-gray-300">
            Phone Number
          </label>
          <input
            type="text"
            {...register("phone")}
            placeholder="Phone number"
            className="input input-bordered w-full pr-12 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
            required
          />
        </div>

        {/* <div>
          <label className="text-sm text-gray-700 dark:text-gray-300">
            Select Role
          </label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="select select-bordered w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
          >
            <option value="Student">Student</option>
            <option value="Tutor">Tutor</option>
          </select>
        </div> */}

        <div>
          <label className="text-sm text-gray-700 dark:text-gray-300">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: true,
                minLength: 6,
                pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
              })}
              placeholder="Enter password"
              className="input input-bordered w-full pr-12 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
              required
            />

            {errors.password?.type === "required" && (
              <span className="text-red-600 text-sm">Password is Required</span>
            )}
            {errors.password?.type === "minLength" && (
              <span className="text-red-600 text-sm">
                Password must be at least 6 characters
              </span>
            )}
            {errors.password?.type === "pattern" && (
              <span className="text-red-600 text-sm">
                Password must include uppercase, lowercase, number, and special
                character
              </span>
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

        {/* <div>
          <label className="text-sm text-gray-700 dark:text-gray-300">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              name="confirm"
              value={form.confirm}
              onChange={handleChange}
              placeholder="Re-enter password"
              className="input input-bordered w-full pr-12 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600 z-10"
            >
              {showConfirm ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
          </div>
        </div> */}

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Register
        </button>
      </form>

      <div className="divider my-4">OR</div>

      {/* <button
        onClick={handleGoogleLogin}
        className="btn bg-white text-black border-[#e5e5e5] w-full hover:bg-gray-100 flex items-center justify-center space-x-2"
      >
        Signup with Google
      </button> */}

      <p className="text-sm text-center text-gray-600 dark:text-gray-400 mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 dark:text-blue-400">
          Login
        </Link>
      </p>
    </div>
  );
}
