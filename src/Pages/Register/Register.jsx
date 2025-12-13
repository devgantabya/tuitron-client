import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAuth from "./../../hooks/useAuth";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";
import axios from "axios";
import Swal from "sweetalert2";

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

  // const handleRegistration = (data) => {
  //   const profileImg = data.photo[0];
  //   registerUser(data.email, data.password)
  //     .then((result) => {
  //       console.log(result);
  //       const formData = new FormData();
  //       formData.append("image", profileImg);

  //       const imgUploadUrl = `https://api.imgbb.com/1/upload?key=${
  //         import.meta.env.VITE_IMAGE_HOST_KEY
  //       }`;

  //       axios.post(imgUploadUrl, formData).then((res) => {
  //         const userProfile = {
  //           displayName: data.name,
  //           photoURL: res.data.data.url,
  //         };

  //         updateUserProfile(userProfile)
  //           .then(() => {
  //             navigate(location?.state || "/");
  //           })
  //           .catch((error) => {
  //             console.error("Profile Update Error:", error);
  //           });
  //       });
  //       // Navigate or show success message
  //       Swal.fire({
  //         position: "top-end",
  //         icon: "success",
  //         title: "Your work has been saved",
  //         showConfirmButton: false,
  //         timer: 1500,
  //       });
  //     })
  //     .catch((error) => {
  //       console.error("Registration Error:", error);
  //     });
  // };

  const handleRegistration = (data) => {
    const profileImg = data.photo[0];

    registerUser(data.email, data.password)
      .then(() => {
        const formData = new FormData();
        formData.append("image", profileImg);

        const imgUploadUrl = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMAGE_HOST_KEY
        }`;

        return axios.post(imgUploadUrl, formData);
      })
      .then((res) => {
        const imageUrl = res.data.data.url;

        const userProfile = {
          displayName: data.name,
          photoURL: imageUrl,
        };

        return updateUserProfile(userProfile).then(() => imageUrl);
      })
      .then((imageUrl) => {
        // 🔥 SEND DATA TO MONGODB
        const userInfo = {
          name: data.name,
          email: data.email,
          phone: data.phone,
          role: "Student",
          image: imageUrl,
        };

        return axios.post("http://localhost:5000/users/register", userInfo);
      })
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Registration Successful",
          showConfirmButton: false,
          timer: 1500,
        });

        navigate(location?.state || "/");
      })
      .catch((error) => {
        console.error("Registration Error:", error);
        Swal.fire("Error", error.message, "error");
      });
  };

  return (
    <div className="max-w-md mx-auto px-4 py-10 shadow-lg rounded-lg bg-white dark:bg-gray-800 mt-10">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
        Create Your Tuitron Account
      </h2>

      <form onSubmit={handleSubmit(handleRegistration)} className="space-y-5">
        <div className="flex items-center justify-center gap-8 mt-8">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              {...register("role")}
              value={"Student"}
              className="radio"
              defaultChecked
            />
            <span>Student</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              {...register("role")}
              value={"Tutor"}
              className="radio"
            />
            <span>Tutor</span>
          </label>
        </div>
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
