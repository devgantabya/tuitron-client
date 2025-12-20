import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAuth from "./../../hooks/useAuth";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";
// import Swal from "sweetalert2";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { registerUser, updateUserProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const handleRegistration = (data) => {
    const profileImg = data.photo[0];

    registerUser(data.email, data.password)
      .then(() => {
        const formData = new FormData();
        formData.append("image", profileImg);

        const image_API_URL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMAGE_HOST_KEY
        }`;

        axios.post(image_API_URL, formData).then((res) => {
          const photoURL = res.data.data.url;

          const userInfo = {
            email: data.email,
            displayName: data.name,
            photoURL: photoURL,
            phone: data.phone,
          };
          axiosSecure.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              console.log("user created in the database");
            }
          });

          const userProfile = {
            displayName: data.name,
            photoURL: photoURL,
          };

          updateUserProfile(userProfile)
            .then(() => {
              navigate(location.state || "/");
            })
            .catch((error) => console.log(error));
        });
      })
      .catch((error) => {
        console.log(error);
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
            {...register("name", { required: true })}
            placeholder="Enter your full name"
            className="input input-bordered w-full pr-12 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
          />
          {errors.name?.type === "required" && (
            <span className="text-red-600 text-sm">This field is required</span>
          )}
        </div>

        <div>
          <label className="text-sm text-gray-700 dark:text-gray-300">
            Photo
          </label>
          <input
            type="file"
            {...register("photo", { required: true })}
            className="file-input input-bordered w-full pr-12 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
          />
          {errors.photo?.type === "required" && (
            <span className="text-red-600 text-sm">Photo required</span>
          )}
        </div>

        <div>
          <label className="text-sm text-gray-700 dark:text-gray-300">
            Email
          </label>
          <input
            type="email"
            {...register("email", { required: true })}
            placeholder="Enter your email"
            className="input input-bordered w-full pr-12 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
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
          />
        </div>

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

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Register
        </button>
      </form>

      <SocialLogin />

      <p className="text-sm text-center text-gray-600 dark:text-gray-400 mt-4">
        Already have an account?{" "}
        <Link
          to="/login"
          state={location?.state}
          className="text-blue-600 dark:text-blue-400"
        >
          Login
        </Link>
      </p>
    </div>
  );
}
