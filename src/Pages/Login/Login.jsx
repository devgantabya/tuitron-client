import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { signInUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const redirect = location.state?.from || "/dashboard";

  const onSubmit = (data) => {
    signInUser(data.email, data.password).then(() =>
      navigate(redirect, { replace: true })
    );
  };

  const demoLogin = () => {
    signInUser("demo@tuitron.com", "Demo@1234").then(() =>
      navigate("/dashboard")
    );
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
        Login to Tuitron
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <div>
          <label className="text-sm text-gray-700 dark:text-gray-300">
            Email
          </label>
          <input
            {...register("email", { required: true })}
            type="email"
            className="w-full px-4 py-2 mt-1 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">Email required</span>
          )}
        </div>

        <div>
          <label className="text-sm text-gray-700 dark:text-gray-300">
            Password
          </label>
          <div className="relative">
            <input
              {...register("password", { required: true })}
              type={showPassword ? "text" : "password"}
              className="w-full px-4 py-2 mt-1 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.password && (
            <span className="text-red-500 text-sm">Password required</span>
          )}
        </div>

        <button className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Login
        </button>

        <button
          type="button"
          onClick={demoLogin}
          className="w-full py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 dark:hover:bg-gray-700"
        >
          Login as Demo User
        </button>
      </form>

      <SocialLogin />

      <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
        Don't have an account?{" "}
        <Link to="/register" className="text-blue-600 dark:text-blue-400">
          Register
        </Link>
      </p>
    </div>
  );
}
